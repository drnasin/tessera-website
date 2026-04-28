---
title: tessera plan — What is the AI about to do?
description: Inspect, compare, and freeze the AI build recipe before any tokens are spent. A junior-friendly guide to the three plan subcommands.
---

# `tessera plan` — What is the AI about to do?

You're about to ask an AI to write hundreds of files for you. It will burn tokens, run for 5–30 minutes, and might do something you didn't expect.

`tessera plan` lets you **look at the recipe before cooking it**. No AI is invoked — these commands just compile, print, and compare the plan that `tessera new` would otherwise execute.

If this is your first day on Tessera, run these three commands at least once before you trust a real `tessera new` run.

## The three subcommands

### `tessera plan compile <yaml> [-o <out.json>]`

Reads a stack manifest (YAML) and writes a versioned, hash-anchored `plan.json`.

```bash
$ tessera plan compile stacks/static.yaml
✓ Compiled plan: /home/me/proj/.tessera/plan.json
  stack:      static
  steps:      3
  plan hash:  a53a0aa050046435...
  compiled:   2026-04-28T18:53:05Z
```

Want it written somewhere else? Pass `-o`:

```bash
$ tessera plan compile stacks/static.yaml -o /tmp/before.json
```

Compile is **pure** — it reads YAML, hashes prompts, validates dependencies, writes JSON. No network, no AI. Safe to run anytime.

### `tessera plan show [<plan.json>]`

Pretty-prints the plan. With no argument, shows `.tessera/plan.json` from the current directory.

```bash
$ tessera plan show

Plan: ./.tessera/plan.json
  Stack:    static
  Steps:    3
  Hash:     a53a0aa050046435a6a080477f981de3...
  Compiled: 2026-04-28T18:53:05Z  (compiler v1.0)

Steps (topological order):

  [1] scaffold — [1/3] Creating website
        complexity: complex
        adapter:    (router)    model: (default)
        deps:       -
        fingerprint: e468b96d03e9...
        gates:      exists_any

  [2] polish — [2/3] Validating and polishing
        complexity: medium
        adapter:    (router)    model: (default)
        deps:       scaffold
        fingerprint: ccf069e24b8a...

  [3] setup_md — [3/3] Generating setup instructions
        complexity: simple
        adapter:    (router)    model: (default)
        deps:       polish
        fingerprint: dbfa1ba8e029...
        gates:      exists_any
```

This is exactly what `tessera new` will dispatch — three steps, in this order, with these prompt fingerprints.

### `tessera plan diff <a.json> <b.json>`

Compares two plans **semantically** — not as raw JSON. It tells you what changed about the *work*, ignoring noise like the `compiled_at` timestamp.

```bash
$ tessera plan diff /tmp/before.json /tmp/after.json

Plan diff
  before: /tmp/before.json  hash a53a0aa05004…
  after:  /tmp/after.json   hash 7b91f3e2d840…

  Prompt body changed:
    - scaffold

  Complexity changed:
    - polish
```

**Exit codes** — these matter for CI:

| Code | Meaning |
|---|---|
| `0` | Plans semantically identical (you can ship the change) |
| `1` | Usage error (bad path, broken JSON) |
| `2` | Differences exist (not necessarily bad — review them) |

A non-zero diff is a **signal**, not an error. Use it like `git diff`: a CI job that runs `tessera plan diff origin/main HEAD` will trip on every prompt edit, prompting human review.

## What is `plan_hash`?

Every compiled plan carries a `plan_hash` — a SHA-256 over the deterministic serialisation of every step's fingerprint, complexity, and dependencies, in execution order.

Think of it as a fingerprint of the whole recipe:

- **Same hash → same plan.** Identical work will be dispatched.
- **Different hash → different plan.** Something changed: a prompt, a step order, a dependency, a complexity hint.

Cosmetic edits (renaming a step's human-readable `name` field) do **not** change the hash. Bumping a `prompt_version` field **does**, even if the prompt body is byte-identical — that's the whole point of `prompt_version`: a way to force a re-render without text edits.

### Why you should care

You commit `static.yaml`. CI compiles it. Six months later, an AI build behaves weirdly. You want to know: *is the recipe the same?*

```bash
$ tessera plan compile stacks/static.yaml -o /tmp/today.json
$ diff <(jq -r .plan_hash /tmp/yesterday.json) <(jq -r .plan_hash /tmp/today.json)
```

If those hashes match, the recipe didn't drift. The bug is somewhere else — adapter version, AI model behaviour, runtime environment. If they don't match, run `tessera plan diff` to see exactly what shifted.

## When you'll reach for these commands

| Situation | Command |
|---|---|
| "I tweaked a prompt in YAML — what does that actually change?" | `tessera plan diff before.json after.json` |
| "What is the AI going to do once I hit enter?" | `tessera plan show` |
| "Is tomorrow's build the same recipe as today's?" | Compare `plan_hash` values |
| "Is my new YAML even valid?" | `tessera plan compile path.yaml` (it'll error loudly if not) |
| "I added a step — is the dependency wired right?" | `tessera plan show` (look at `deps:` line) |

## Common mistakes

**Hand-editing `plan.json`.** Don't. The executor recomputes the hash on read; if your edits desync it, the next `tessera new --execute` will refuse the plan. Edit the YAML, recompile.

**Forgetting to bump `prompt_version`.** If you "fix a typo" in a prompt template but the AI's behaviour shouldn't change, you still want a new fingerprint so `plan diff` flags the edit for review. Always bump `prompt_version` when you touch a prompt body, even cosmetically.

**Reading the long hash.** Nobody compares 64 hex chars by eye. Use `tessera plan diff`, or `jq -r .plan_hash plan.json | head -c 12` for a 12-char prefix (collision-free in practice for any one project).

## See also

- [YAML stack manifests](/docs/architecture/yaml-manifests) — how stacks describe themselves
- [Build trace & events](/docs/architecture/build-trace) — what gets recorded once you actually run the plan
- [Troubleshooting](/docs/troubleshooting) — when `plan compile` errors out
