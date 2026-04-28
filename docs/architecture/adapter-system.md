---
title: Adapter system — Adding a new AI tool
description: Tessera ships with Claude, Codex, and Gemini adapters. Here's how to plug in Groq, Ollama, or anything else that speaks subprocess.
---

# Adapter system — Adding a new AI tool

Tessera doesn't talk to an AI directly. It launches an AI **CLI** as a subprocess: `claude`, `codex`, `gemini`. Each is wrapped in an **adapter** that hides the differences (flag names, stdin vs argv, env scrubbing) behind a uniform interface.

If you want to use a different AI — Groq, Ollama, a self-hosted model, your own proxy — you write an adapter. This page shows you how, with a runnable Groq example.

## The contract — `AdapterInterface`

Six methods. That's the entire contract.

```php
interface AdapterInterface
{
    public function name(): string;                                    // 'claude', 'codex', 'groq'
    public function version(): ?string;                                // detected CLI version
    public function isAvailable(): bool;                               // can we even call it?
    public function supportsModel(?string $model): bool;               // can route to this model id?
    public function execute(string $prompt, AdapterContext $context): AiResponse;
    public function estimateCost(int $inputTokens, ?int $outputTokens = null): ?float;
}
```

Most of that is plumbing you don't want to write. **`AbstractAdapter`** handles it for you and asks you to fill in three abstract hooks.

## What you actually implement — three methods

Extend `AbstractAdapter` and provide:

### `name(): string`

The stable identifier. Lower-case, ASCII, no spaces. Used as the adapter's key in `AdapterRegistry` and as the value of `adapter` in events.jsonl.

### `detectCommand(): array`

The argv that probes whether the CLI is installed. Should print something on stdout and exit 0 when present, exit non-zero when not. Capped at 5 seconds.

```php
protected function detectCommand(): array
{
    return ['groq', '--version'];
}
```

### `buildExecuteCommand($prompt, $context): array`

The argv for the real call. Build it from `$context` (model, working dir, timeout). The prompt itself goes either through stdin or as the last argv arg, depending on `usesStdin()`.

```php
protected function buildExecuteCommand(string $prompt, AdapterContext $context): array
{
    $command = ['groq', 'chat', '--quiet'];
    if ($context->model !== null) {
        array_push($command, '--model', $context->model);
    }
    return $command;
}
```

### `usesStdin(): bool`

`true` if the prompt is piped into stdin (recommended — no argv length limits, no shell escaping). `false` if the prompt goes as the last argv element.

```php
protected function usesStdin(): bool
{
    return true;
}
```

That's it. `AbstractAdapter` already handles:

- Non-blocking `proc_open` with hard timeout
- Process-tree kill on timeout (so a hung Node grandchild doesn't pin PHP for 10 minutes)
- Environment scrubbing (removes `CLAUDECODE`, `CLAUDE_CODE`, etc. so a child process doesn't think it's running inside a Claude session)
- Cached availability + version probing
- Event emission (`ai.call.start`, `ai.call.complete`, `ai.call.rate_limited`, `ai.call.tool_down`)

## A complete example — `GroqAdapter`

```php
<?php

declare(strict_types=1);

namespace Tessera\Installer\Adapters;

/**
 * Adapter for Groq's CLI (`groq`).
 *
 * Groq pricing as of 2026 — adjust the constants when prices change.
 * Pricing source: https://groq.com/pricing (per 1M tokens).
 */
final class GroqAdapter extends AbstractAdapter
{
    private const COST_PER_INPUT_TOKEN = 0.59 / 1_000_000;   // EUR
    private const COST_PER_OUTPUT_TOKEN = 0.79 / 1_000_000;  // EUR

    public function name(): string
    {
        return 'groq';
    }

    protected function detectCommand(): array
    {
        return ['groq', '--version'];
    }

    protected function buildExecuteCommand(string $prompt, AdapterContext $context): array
    {
        $command = ['groq', 'chat', '--quiet'];

        if ($context->model !== null) {
            array_push($command, '--model', $context->model);
        }

        return $command;
    }

    protected function usesStdin(): bool
    {
        return true;
    }

    public function supportsModel(?string $model): bool
    {
        if ($model === null) {
            return true;
        }

        return str_starts_with($model, 'llama-')
            || str_starts_with($model, 'mixtral-')
            || str_starts_with($model, 'gemma-');
    }

    public function estimateCost(int $estimatedInputTokens, ?int $estimatedOutputTokens = null): ?float
    {
        $inputCost = $estimatedInputTokens * self::COST_PER_INPUT_TOKEN;
        $outputCost = ($estimatedOutputTokens ?? 0) * self::COST_PER_OUTPUT_TOKEN;
        return round($inputCost + $outputCost, 4);
    }

    /**
     * Drop credentials of OTHER providers so a misconfigured environment can
     * never leak (say) ANTHROPIC_API_KEY into the Groq subprocess.
     */
    protected function buildChildEnv(): array
    {
        $env = parent::buildChildEnv();

        foreach (['ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'GOOGLE_API_KEY', 'GEMINI_API_KEY'] as $other) {
            unset($env[$other]);
        }

        return $env;
    }
}
```

## Registering your adapter

Adapters live in `AdapterRegistry`. Register yours wherever you bootstrap the installer:

```php
use Tessera\Installer\Adapters\AdapterRegistry;
use Tessera\Installer\Adapters\GroqAdapter;

$registry = new AdapterRegistry;
$registry->register(new GroqAdapter);
```

Sprint 2 will introduce `tessera adapters add groq` as a discovery mechanism. Until then, drop the file in `src/Adapters/` and add the registration line.

## Environment isolation — important

Tessera runs every AI subprocess with a **scrubbed environment**. `AbstractAdapter::buildChildEnv()` already drops:

- `CLAUDECODE`, `CLAUDE_CODE`, `CLAUDE_CODE_SSE_PORT`, `CLAUDE_CODE_ENTRYPOINT` — so a child Claude process doesn't refuse to run thinking it's nested
- `VIPSHOME` — so an inherited Tessera-internal hint doesn't poison child runs

If your adapter has additional vars to drop — typically API keys for *other* providers, so they can't leak — override `buildChildEnv()` and remove them, like the example above.

This is defence-in-depth. Even if a user's shell has every provider's API key exported, your Groq subprocess only sees Groq-relevant env. Misrouted tokens cost real money; this is cheap insurance.

## Cost estimation

Return EUR per the given input/output token sizes, or `null` if you can't price it (e.g., Codex via a flat-fee ChatGPT subscription where calls don't bill per-token).

Sprint 2 will use these numbers to forecast build cost **before** the AI is invoked, so the user can decide whether a 30-minute Opus run is worth €4.

If you don't know the prices yet, return `null`. A `null` is honest; a guess is misleading.

## What's coming in Sprint 2

- `tessera adapters list` — see what's registered, what's available, version of each
- `tessera adapters detect` — auto-discover adapters dropped into a known directory (plugin pattern)
- Pre-build cost forecast that aggregates `estimateCost()` across all steps

## See also

- [`tessera plan`](/docs/cli/plan) — see which adapter the plan picks for each step
- [Build trace & events](/docs/architecture/build-trace) — how `adapter_resolved` lands in events.jsonl
- [Troubleshooting](/docs/troubleshooting) — when an adapter says it's unavailable
