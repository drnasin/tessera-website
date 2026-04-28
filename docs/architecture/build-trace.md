---
title: Build trace — What happened during my build
description: Read state.json, events.jsonl, and plan.json to reconstruct exactly what Tessera did, when, and why.
---

# Build trace — What happened during my build

Tessera ran for 25 minutes. The AI burned through tokens. Something is wrong with the output. Where do you look?

Every Tessera build leaves three artefacts in `.tessera/` inside the project directory. Together they answer every question a junior developer might ask about a finished build, and most questions about an in-flight one.

## The three artefacts

### `state.json` — current state of the build

Memory's view of "where am I right now?". Used by `tessera new` itself to resume a half-finished install.

```json
{
  "schema": "tessera.state/v1",
  "project": "bakery-test",
  "stack": "static",
  "trace_id": "6661a625c1814d2e",
  "status": "complete",
  "started_at": "2026-04-28 18:53:05",
  "updated_at": "2026-04-28 19:02:44",
  "completed_steps": [
    {"name": "scaffold", "completed_at": "..."},
    {"name": "setup_md", "completed_at": "..."}
  ],
  "skipped_steps": [],
  "failed_steps": [{"name": "polish", "error": "Adapter returned non-zero exit."}],
  "current_step": null
}
```

### `events.jsonl` — append-only event log

Every meaningful thing that happened, one JSON event per line. Sorted by occurrence. Never edited, never truncated.

```json
{"schema":"tessera.event/v1","type":"build.start","trace_id":"6661a625c1814d2e","occurred_at":"2026-04-28T18:53:05Z","payload":{"stack":"static","plan_hash":"a53a0aa050046435...","step_count":3}}
```

### `plan.json` — the recipe

The compiled plan that `tessera new` was about to dispatch. See [`tessera plan`](/docs/cli/plan).

## The schema discriminator

Every artefact starts with a `"schema": "tessera.<artifact>/v<N>"` field:

- `tessera.state/v1`
- `tessera.event/v1`
- `tessera.plan/v1`
- `tessera.gate-result/v1` (embedded inside gate events)

When v2 lands, v1 readers must refuse v2 artefacts (loud failure beats quiet misinterpretation). v2 readers MAY accept v1 artefacts. This is enforced by `ArtifactValidator` on every read.

## The trace ID

When `tessera new` starts, it generates a `trace_id` (16 hex chars) and writes it once to `state.json`. Every event in `events.jsonl` carries the same `trace_id`. This is how you correlate everything when multiple builds touch the same machine, or when log lines get interleaved.

```bash
$ jq -r .trace_id .tessera/state.json
6661a625c1814d2e

$ grep '"trace_id":"6661a625c1814d2e"' .tessera/events.jsonl | wc -l
17
```

## An annotated event sequence

Here is a real (trimmed) `events.jsonl` from a successful Static build, in order:

```json
{"type":"build.start","payload":{"stack":"static","plan_hash":"a53a0aa05004...","context_hash":"62f54864...","step_count":3}}
{"type":"step.start","payload":{"step_id":"scaffold","complexity":"complex","adapter_resolved":"claude","model_resolved":"claude-opus-4-20250514","template_fingerprint":"e468b96d03e9...","rendered_prompt_hash":"fb7460c9c408...","skippable":false}}
{"type":"ai.call.start","payload":{"adapter":"claude","model":"claude-opus-4-20250514","timeout":1200,"step":"scaffold"}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":true,"exit_code":0,"duration_ms":505708,"output_size":1728}}
{"type":"gate.pass","payload":{"step":"scaffold","gate":"exists_any","severity":"hard","passed":true,"message":"Found 'index.html' (matched 1)"}}
{"type":"step.complete","payload":{"step_id":"scaffold","duration_ms":505709,"gates_evaluated":1,"gates_passed":1}}
{"type":"step.start","payload":{"step_id":"polish","complexity":"medium","model_resolved":"claude-sonnet-4-20250514","skippable":true}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":false,"exit_code":1,"duration_ms":7432}}
{"type":"step.skip","payload":{"step_id":"polish","exit_code":1,"error_excerpt":"Adapter returned non-zero exit.","skippable":true}}
```

What this tells you, in plain English:

1. **Build started** — recipe `a53a…`, three steps planned.
2. **Step `scaffold` began** — Claude Opus picked, prompt template `e468b96d…`, after rendering it became `fb7460c9…`.
3. **AI call ran for 8 minutes** (`duration_ms: 505708`) and succeeded.
4. **Gate passed** — `index.html` was actually written. The AI wasn't lying.
5. **Step `polish` ran**, AI returned exit 1 (rate limit, transient failure, who knows), and because `skippable: true`, the build moved on.

The three hashes on a `step.start` event let you reconstruct the exact prompt:

- `template_fingerprint` — the `{{var}}` template before substitution.
- `context_hash` — the `RenderContext` (description, design colours, etc.).
- `rendered_prompt_hash` — the actual bytes that hit the AI.

Same template + same context → same rendered prompt. If two builds disagree on `rendered_prompt_hash` for the same step, something in the context drifted.

## RenderContext

A `RenderContext` is the bag of values that get substituted into prompt templates at render time. Sprint 1 fields:

| Field | Source | Trusted? |
|---|---|---|
| `description` | from requirements (user) | no |
| `designStyle` | from requirements (user) | no |
| `designColors` | from requirements (user) | no |
| `languages`, `langs` | from requirements (user) | yes (langs) |
| `country` | from requirements (user) | no |
| `userRequirements` | from requirements (user) | no |
| `needsShop`, `shop` | from requirements (user) | no |
| `payments`, `paymentProviders` | from requirements (user) | no |
| `systemContext` | from `SystemInfo::buildAiContext()` | yes |
| `memoryContext` | from `Memory::buildAiContext()` | yes |
| `nodeVersion` | detected from `node --version` | yes |
| `goVersion` | detected from `go version` | yes |
| `flutterVersion` | detected from `flutter --version` | yes |
| `stackVersions` | composite (Laravel: PHP + Composer + framework) | yes |

Trusted fields are inlined raw into the rendered prompt; untrusted fields are wrapped in `<<<USER_DATA name="...">>>...<<<END_USER_DATA>>>` blocks. Sprint 2 will split `RenderContext` into user/environment/system layers — additive, no schema bump.

## Memory-first ordering

When a step completes, Tessera writes to `state.json` **before** it appends to `events.jsonl`. This matters when a build is killed mid-step (Ctrl+C, OOM, machine crash):

- If the kill happens between the two writes, the audit log is missing one event but `state.json` is correct. Resume picks up cleanly without duplicating work.
- The reverse — events written first — would mean a successful audit log entry for work that the resume engine doesn't think happened. Resume would re-run it. That's worse than a missing log line.

This is a deliberate tradeoff: **resume correctness > audit completeness**.

## Common debugging questions

```bash
# Which AI tool was used for the polish step?
$ jq 'select(.payload.step_id == "polish") | .payload.adapter_resolved' .tessera/events.jsonl

# How long did the scaffold step take?
$ jq 'select(.type == "step.complete" and .payload.step_id == "scaffold") | .payload.duration_ms' .tessera/events.jsonl

# Why was the polish step skipped?
$ jq 'select(.type == "step.skip") | .payload' .tessera/events.jsonl

# Which gates failed (across all steps)?
$ jq 'select(.type == "gate.fail") | .payload' .tessera/events.jsonl

# Total AI time vs wall time
$ jq 'select(.type == "ai.call.complete") | .payload.duration_ms' .tessera/events.jsonl | paste -sd+ | bc
```

If you don't have `jq`, the file is one JSON event per line — `grep` and your eyes work fine for small builds.

## What's coming in Sprint 2

`tessera analyze <project>` will turn all of the above into a one-shot human report:

```text
Build a53a0aa050... — bakery-test
  3 steps planned, 2 completed, 1 skipped (polish, transient error)
  AI time:  8m 33s     Wall time:  9m 39s
  Adapters: claude (3 calls, all)
  Cost:     ~€0.42 estimated
  Gates:    2 passed (hard), 0 failed
  ⚠ polish step skipped — re-run with `tessera replay polish` if needed
```

Until then: read the JSON. It's all there.

## See also

- [`tessera plan`](/docs/cli/plan) — inspect the plan before it runs
- [YAML stack manifests](/docs/architecture/yaml-manifests) — how steps get defined
- [Adapter system](/docs/architecture/adapter-system) — what `adapter_resolved` means
