---
title: Adapter sustav — Dodavanje novog AI alata
description: Tessera dolazi s Claude, Codex i Gemini adapterima. Evo kako priključiti Groq, Ollama ili bilo što što govori subproces.
---

# Adapter sustav — Dodavanje novog AI alata

Tessera ne razgovara s AI-jem direktno. Pokreće AI **CLI** kao subproces: `claude`, `codex`, `gemini`. Svaki je omotan u **adapter** koji skriva razlike (nazivi zastavica, stdin vs argv, čišćenje okoline) iza uniformnog sučelja.

Ako hoćeš koristiti drugi AI — Groq, Ollama, self-hosted model, vlastiti proxy — pišeš adapter. Ova stranica pokazuje kako, s pokretljivim Groq primjerom.

## Ugovor — `AdapterInterface`

Šest metoda. To je cijeli ugovor.

```php
interface AdapterInterface
{
    public function name(): string;                                    // 'claude', 'codex', 'groq'
    public function version(): ?string;                                // detektirana CLI verzija
    public function isAvailable(): bool;                               // možemo li ga uopće pozvati?
    public function supportsModel(?string $model): bool;               // može li usmjeriti na ovaj model id?
    public function execute(string $prompt, AdapterContext $context): AiResponse;
    public function estimateCost(int $inputTokens, ?int $outputTokens = null): ?float;
}
```

Većina toga je instalaterski kod koji ne želiš pisati. **`AbstractAdapter`** ga obrađuje umjesto tebe i traži od tebe da popuniš tri apstraktne metode.

## Što zapravo implementiraš — tri metode

Naslijedi `AbstractAdapter` i pruži:

### `name(): string`

Stabilni identifikator. Mala slova, ASCII, bez razmaka. Koristi se kao ključ adaptera u `AdapterRegistry` i kao vrijednost `adapter` u events.jsonl.

### `detectCommand(): array`

Argv koji provjerava je li CLI instaliran. Treba ispisati nešto na stdout i izaći s 0 kad je prisutan, izaći s ne-nulom kad nije. Ograničeno na 5 sekundi.

```php
protected function detectCommand(): array
{
    return ['groq', '--version'];
}
```

### `buildExecuteCommand($prompt, $context): array`

Argv za pravi poziv. Gradi ga iz `$context` (model, radni direktorij, timeout). Sam prompt ide ili kroz stdin ili kao zadnji argv argument, ovisno o `usesStdin()`.

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

`true` ako se prompt pipa u stdin (preporučeno — nema ograničenja duljine argv, nema shell escaping-a). `false` ako prompt ide kao zadnji argv element.

```php
protected function usesStdin(): bool
{
    return true;
}
```

To je sve. `AbstractAdapter` već obrađuje:

- Non-blocking `proc_open` s hard timeoutom
- Ubijanje stabla procesa pri timeoutu (tako da zaglavljeni Node unuk ne drži PHP 10 minuta)
- Čišćenje okoline (uklanja `CLAUDECODE`, `CLAUDE_CODE` itd. da dijete ne misli da radi unutar Claude sesije)
- Keširano ispitivanje dostupnosti i verzije
- Emitiranje eventa (`ai.call.start`, `ai.call.complete`, `ai.call.rate_limited`, `ai.call.tool_down`)

## Potpuni primjer — `GroqAdapter`

```php
<?php

declare(strict_types=1);

namespace Tessera\Installer\Adapters;

/**
 * Adapter za Groq CLI (`groq`).
 *
 * Groq cijene od 2026 — prilagodi konstante kad se cijene promijene.
 * Izvor cijena: https://groq.com/pricing (po 1M tokena).
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
     * Ukloni vjerodajnice DRUGIH pružatelja tako da pogrešno konfigurirana okolina
     * nikad ne može procuriti (recimo) ANTHROPIC_API_KEY u Groq subprocess.
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

## Registriranje adaptera

Adapteri žive u `AdapterRegistry`. Registriraj svoj gdje god bootstrapiraš installer:

```php
use Tessera\Installer\Adapters\AdapterRegistry;
use Tessera\Installer\Adapters\GroqAdapter;

$registry = new AdapterRegistry;
$registry->register(new GroqAdapter);
```

Sprint 2 će uvesti `tessera adapters add groq` kao mehanizam otkrivanja. Do tada, spusti datoteku u `src/Adapters/` i dodaj redak registracije.

## Izolacija okoline — važno

Tessera pokreće svaki AI subprocess s **očišćenom okolinom**. `AbstractAdapter::buildChildEnv()` već uklanja:

- `CLAUDECODE`, `CLAUDE_CODE`, `CLAUDE_CODE_SSE_PORT`, `CLAUDE_CODE_ENTRYPOINT` — da dijete Claude ne odbije pokrenuti misleći da je ugniježđeno
- `VIPSHOME` — da nasljeđeni Tessera-interni hint ne zatruje djecu

Ako tvoj adapter ima dodatne varijable za uklanjanje — obično API ključeve za *druge* pružatelje, da ne mogu procuriti — nadjači `buildChildEnv()` i ukloni ih, kao u primjeru gore.

Ovo je obrana u dubini. Čak i ako korisnikov shell ima exportirane API ključeve svakog pružatelja, tvoj Groq subprocess vidi samo Groq-relevantnu okolinu. Krivo usmjereni tokeni koštaju pravi novac; ovo je jeftino osiguranje.

## Procjena troška

Vrati EUR za dane veličine ulaznih/izlaznih tokena, ili `null` ako ne možeš to odrediti (npr. Codex putem flat-fee ChatGPT pretplate gdje pozivi ne naplaćuju po tokenu).

Sprint 2 će koristiti ove brojeve za predviđanje troška builda **prije** pozivanja AI-ja, da korisnik može odlučiti je li 30-minutni Opus run vrijedan €4.

Ako još ne znaš cijene, vrati `null`. `null` je pošten; nagađanje je obmanjujuće.

## Što dolazi u Sprintu 2

- `tessera adapters list` — vidi što je registrirano, što je dostupno, verzija svakog
- `tessera adapters detect` — auto-otkrij adaptere spuštene u poznati direktorij (plugin obrazac)
- Pre-build prognoza troška koja agregira `estimateCost()` kroz sve korake

## Vidi također

- [`tessera plan`](/hr/docs/cli/plan) — vidi koji adapter plan bira za svaki korak
- [Trag builda i eventi](/hr/docs/architecture/build-trace) — kako `adapter_resolved` završava u events.jsonl
- [Rješavanje problema](/hr/docs/troubleshooting) — kad adapter kaže da nije dostupan
