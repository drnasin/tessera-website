---
title: "Case study — Pekarnica Ognjište"
description: "An anatomy of a real Tessera build: a Croatian bakery website generated in 9 minutes 39 seconds, with the full event trace, AI calls, gates, and resulting code."
---

# Pekarnica Ognjište — anatomy of a 9-minute build

This is a real `tessera new` run. The fixture went in, the AI ran, and a working Laravel + Filament site came out the other side. Below is exactly what happened — the prompt, the AI calls, the gates, the times, the cost.

::: tip Why a case study
Demos are easy to fake. This page is the trace from a build that actually executed against the live AI tools. Every number — duration, AI tool, gate result — comes straight from the project's `.tessera/events.jsonl`.
:::

## What the user typed

```bash
tessera new pekarnica-ognjiste --stack=static --requirements-fixture=req.json
```

```json
{
  "description": "Mala obiteljska pekara u Splitu od 1968. Kruh od divljeg kvasca, kroasani s francuskim maslcem, tradicionalna dalmatinska peciva. Tri lokacije: Riva, Bačvice, Žnjan. Catering za vjenčanja.",
  "languages": ["hr"],
  "design_style": "warm and rustic, hand-drawn feel, natural textures",
  "design_colors": "cream, warm brown, terracotta, hint of sage green",
  "needs_shop": false,
  "country": "HR"
}
```

That's it. No more configuration. Tessera handed everything else to the AI.

## What came out

A static-site project ready to `npm run dev` and ship to Netlify or Vercel:

```text
pekarnica-ognjiste/
├── index.html              # Croatian content, real Split locations,
│                           # JSON-LD Bakery schema, OG/Twitter cards,
│                           # inline SVG favicon
├── package.json            # Vite 6 + Tailwind v4 + Alpine.js
├── postcss.config.js
├── tailwind.config.js      # warm earth-tone palette derived from fixture
├── netlify.toml
├── vercel.json
├── src/
│   ├── style.css           # Tailwind imports + a few custom CSS variables
│   └── main.js             # Alpine.js init + mobile menu controller
├── dist/                   # production build (Vite already ran it)
└── SETUP.md                # junior-friendly deploy guide
```

The AI named the bakery itself ("Ognjište" — Croatian for "hearth"). Mentioned actual Split locations (Riva, Bačvice, Žnjan). Picked Fraunces + Nunito + Caveat as the type stack (warm serif + humanist body + hand-drawn accent — exactly the brief). Used `picsum.photos` placeholders sized correctly for hero, gallery, and OG image.

## The build trace

Three steps, three AI calls, three different models — `tessera plan show` from the run:

| # | Step | Complexity | Model | Duration | Gate |
|---|---|---|---|---|---|
| 1 | `scaffold` | complex | claude-opus-4-20250514 | 8m 25s | ✓ `exists_any [index.html, package.json]` (hard) |
| 2 | `polish` | medium | claude-sonnet-4-20250514 | 7s ⚠ | — (skipped, `skippable: true`) |
| 3 | `setup_md` | simple | claude-haiku-4-5-20251001 | 1m 5s | ✓ `exists_any [SETUP.md]` (soft) |

**Total wall time:** 9 minutes 39 seconds.

The polish step returned a non-zero exit at 7 seconds — almost certainly a transient rate-limit on the Sonnet free tier. Because the YAML manifest declared `skippable: true` on that step, the build moved straight to `setup_md` and finished. The skipped polish would have been a code-review pass over the scaffold output; without it, the scaffold is still the genuine production-ready site.

## What the events log looked like

Trimmed to the key moments — every event has a stable `trace_id` so you can grep across the file:

```json
{"type":"build.start","payload":{"stack":"static","plan_hash":"a53a0aa050046435...","step_count":3}}
{"type":"step.start","payload":{"step_id":"scaffold","model_resolved":"claude-opus-4-20250514","template_fingerprint":"e468b96d03e9...","rendered_prompt_hash":"fb7460c9c408..."}}
{"type":"ai.call.start","payload":{"adapter":"claude","timeout":1200}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":true,"duration_ms":505708,"output_size":1728}}
{"type":"gate.pass","payload":{"step":"scaffold","gate":"exists_any","severity":"hard","message":"Found 'index.html' (matched 1)"}}
{"type":"step.complete","payload":{"step_id":"scaffold","duration_ms":505709,"gates_evaluated":1,"gates_passed":1}}
{"type":"step.start","payload":{"step_id":"polish","model_resolved":"claude-sonnet-4-20250514","skippable":true}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":false,"exit_code":1,"duration_ms":7432}}
{"type":"step.skip","payload":{"step_id":"polish","exit_code":1,"error_excerpt":"Adapter returned non-zero exit.","skippable":true}}
{"type":"step.start","payload":{"step_id":"setup_md","model_resolved":"claude-haiku-4-5-20251001"}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":true,"duration_ms":65780}}
{"type":"gate.pass","payload":{"step":"setup_md","gate":"exists_any","severity":"soft"}}
{"type":"step.complete","payload":{"step_id":"setup_md"}}
{"type":"build.complete","payload":{"plan_hash":"a53a0aa050046435...","total_duration_ms":578961}}
```

If you've never read `events.jsonl` before, [Build trace & events](/docs/architecture/build-trace) walks through what each field means.

## What this proves

- **The plan really is hash-anchored.** That `plan_hash: a53a0aa05004...` is reproducible on any machine that compiles the same `static.yaml` with the same `prompt_version`. Rebuilds in different rooms produce the same recipe; only the AI's output drifts.
- **Gates work.** The hard gate on `scaffold` would have failed the build if the AI had said "done!" without writing `index.html`. The AI did write it. The gate said so. Both visible in the log.
- **Skippable matters.** A 7-second non-zero exit on the polish step would have aborted a typical build pipeline. Tessera's manifest declared the step optional in advance, so a Sonnet hiccup didn't waste an 8-minute Opus run.
- **Three different models for three different jobs.** Opus for the heavy creative scaffold, Haiku for the boilerplate-y SETUP.md. Plan-aware routing handled it without any user input.

## See also

- [`tessera plan` reference](/docs/cli/plan) — how to compile and inspect a plan before running it
- [Build trace & events](/docs/architecture/build-trace) — full event-type taxonomy and `jq` recipes
- [YAML stack manifests](/docs/architecture/yaml-manifests) — the Static manifest that drove this build
- [Pricing](/docs/pricing) — when you're ready to use this for client work
