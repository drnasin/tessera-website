---
title: "Smart Model Routing"
description: "Tessera routes each code generation task to the best AI tool and model — Claude, Gemini, or Codex. Plan-aware routing, rate limit handling, and deterministic quality gates."
---

# Intelligent Cross-Tool AI Routing

Tessera doesn't just use one AI tool — it routes each code generation task to the **best tool and model** for the job. This multi-AI approach produces better results than any single tool alone.

## How It Works

| Complexity | Default | Fallback chain |
|---|---|---|
| **Simple** | Claude Haiku | Gemini Flash → Codex |
| **Medium** | Claude Sonnet | Gemini Pro → Claude Haiku → Gemini Flash |
| **Complex** | Claude Opus | Gemini Pro → Claude Sonnet → Gemini Flash |

A single project build might use Claude Opus for database architecture, Gemini Flash for SETUP.md, and Claude Sonnet for tests — each task routed to the best model automatically.

## Plan-Aware Routing

During setup, Tessera asks about your AI subscription plans to optimize routing and cost:

```
What AI plans do you have?
  Claude plan: [Max (unlimited) / Pro / Free]
  Codex plan:  [Plus (ChatGPT Plus) / Free]
  Gemini plan: [Pro (Google One AI Premium) / Free]
```

| Plan tier | Examples | Routing behavior |
|---|---|---|
| **Unlimited** | Claude Max | Preferred for everything |
| **Generous** | Claude Pro, Codex Plus | Preferred but balanced |
| **Limited** | Free tiers | Fallback only |

With Claude Max, even simple tasks use Claude (Haiku) — no reason to route elsewhere when it's free.

## Rate Limit Handling

If a tool hits rate limits mid-build, Tessera handles it automatically:
1. Detects the error (13 different patterns recognized)
2. Marks the tool with a 2-minute cooldown
3. Switches to the next tool in the fallback chain
4. Shows you what happened: `claude rate-limited (cooldown: 120s). Trying next tool...`

No manual intervention needed. The build keeps going.

## Quality gates — catching "done!" when nothing exists

After every AI step finishes, Tessera runs **quality gates** declared in the stack's YAML manifest. A gate is a deterministic post-check — no AI, no judgement — that asks: did the AI actually do what it said it did?

```
✓ Designing frontend theme            (claude opus, 4m 12s)
   gate: exists_any [resources/views/themes/default/layouts/master.blade.php] → pass
✓ Building admin panel                (claude opus, 6m 03s)
   gate: exists_any [app/Filament/Resources/PageResource.php] → pass
```

A `hard` gate failure halts the step. A `soft` gate failure is logged and the build continues. Sprint 1 supports `exists_any` and `exists_all`; Sprint 2 adds `not_empty`, `contains`, `min_size`, and `command_passes` (e.g., "step passes only if `php -l` succeeds on every changed file").

This replaces the older "peer review" approach (a second AI grading the first AI's output): gates are deterministic, cost no tokens, and produce machine-readable evidence in `events.jsonl` that you can audit later. See [build trace & events](/docs/architecture/build-trace) for the full event shape.

## Check Your Routing

Run `tessera tools` to see which AI tools are installed and how tasks will be routed:

```bash
tessera tools
```

```
Available AI tools:
✓ claude: 2.1.75
✓ gemini: 0.32.1
✓ codex: 0.98.0

AI routing:
  plans: claude=max (unlimited), codex=plus (generous), gemini=free (limited)
  simple: claude (claude-haiku-4-5-20251001)
  medium: claude (claude-sonnet-4-20250514)
  complex: claude (claude-opus-4-20250514)
```

This is useful after installing a new AI tool, or to verify your plan configuration is correct.

## Usage Summary

At the end of each build, Tessera shows how many calls each tool handled:

```
AI usage: claude: 5 calls (2 opus, 2 sonnet, 1 haiku) | gemini: 2 calls (2 flash)
```

## Environment Variables

Most users don't need these — the installer asks interactively. For CI/CD or automation:

```bash
TESSERA_CLAUDE_PLAN=max       # max | pro | free
TESSERA_CODEX_PLAN=plus       # plus | free
TESSERA_GEMINI_PLAN=free      # pro | free
TESSERA_TOOL_PREFERENCE=gemini,claude,codex  # custom order
TESSERA_TOOL_EXCLUDE=codex    # never use this tool
TESSERA_SAFE_AI=1             # Claude only — strip --dangerously-skip-permissions
TESSERA_AI_TIMEOUT=900        # seconds per AI step (default 900)
```

See [Security Model](/docs/disclaimer#security-model) for what `TESSERA_SAFE_AI` changes, why it currently affects Claude only, and how AI credentials are isolated between subprocesses.

## Related

- [Creating a Project](/docs/creating-project) — see AI routing in action during a full build
- [Resume & Recovery](/docs/resume) — what happens when a routed task fails
