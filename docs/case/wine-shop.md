---
title: "Case study — Vinarija Split"
description: "How Tessera built a full Laravel + Filament + e-commerce wine shop across 5 resume cycles, complete with the failure modes that drove the late Sprint 1 fixes."
---

# Vinarija Split — Laravel + Filament e-commerce, built across 5 resumes

The [Pekarnica Ognjište case study](/docs/case/bakery) shows the happy path: a static site, three steps, 9 minutes, no drama. This page is the opposite — a Laravel + Filament e-commerce build that hit every kind of real-world failure (timeouts, rate limits, mid-stream Claude errors) and still landed `status: complete`.

The wine-shop run **drove the gate-pass override pattern** that's now part of the engine. If you want to understand why Tessera makes the decisions it does about failure handling, this is the page.

## What the user typed

```bash
tessera new wine-shop \
  --stack=laravel \
  --requirements-fixture=laravel-req.json
```

```json
{
  "description": "Small Croatian wine importer in Split. Sells Dalmatian, Istrian, and natural wines online. Three product categories, up to 200 SKUs. Needs cart, checkout, order tracking, customer accounts. Croatian + English. Owner is family-run, third generation, wants the site to feel editorial and refined — wine merchant aesthetic, not mass retailer.",
  "languages": ["hr", "en"],
  "design_style": "elegant, refined, slightly editorial — wine merchant aesthetic",
  "design_colors": "deep burgundy, cream, antique gold accent, soft charcoal",
  "needs_shop": true,
  "country": "HR",
  "payment_providers": ["corvuspay", "bank_transfer"]
}
```

## What came out

A working Laravel 13 + Filament 5 e-commerce site:

```text
wine-shop/
├── app/
│   ├── Core/                         # Tessera CMS foundation
│   │   ├── Models/                   #   Page, Block, Navigation
│   │   ├── Services/                 #   PageRenderer, BlockRegistry, ThemeManager
│   │   └── Http/PageController.php
│   ├── Modules/Shop/                 # 13 models, 4 enums, 6 Livewire components
│   │   ├── Models/                   #   Product, Order, Cart, ShippingZone, ...
│   │   ├── Enums/                    #   OrderStatus, PaymentStatus, ProductStatus
│   │   ├── Livewire/                 #   WineCatalog, MiniCart, Checkout, ...
│   │   └── Payments/                 #   PaymentGatewayInterface + CorvusPay/bank
│   └── Filament/Resources/           # Filament admin (PageResource w/ block builder,
│                                     #   CategoryResource, OrderResource, ShopSettings)
├── database/
│   ├── migrations/                   # 19 migrations (3 Laravel default + 16 custom)
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── AdminUserSeeder.php       # admin@vinarija-split.test (AI brand-aware)
│       ├── WineCatalogSeeder.php     # AI-named after the industry
│       ├── ShippingSeeder.php
│       ├── TaxRateSeeder.php
│       ├── ShopSettingsSeeder.php
│       ├── RolesSeeder.php
│       └── CmsSeeder.php
├── resources/views/themes/default/   # Tailwind theme, burgundy palette
├── run-tests.sh                      # AI wrote this to work around PHPUnit 12 quirk
├── CLAUDE.md                         # 13 KB AI-assisted dev guide
└── SETUP.md                          # 27 KB junior-friendly deploy guide
```

The admin user is **`admin@vinarija-split.test` / `password`** — AI rebranded the email to match the project, kept the password as instructed.

## The five resume cycles

This is what happened, in order. Each row is one `tessera new` invocation.

| # | Step that failed | Why | Outcome | Drove |
|---|---|---|---|---|
| 1 | `core_models` | Timeout 2400s — Opus + Laravel + e-commerce needs more head-room | Build halted | Timeout bumped to 3600s |
| 2 | `core_models` | Subprocess kept `proc_close` alive past 60-min budget on Windows; AI had finished, gate had passed | Build halted | **Gate-pass-override pattern (timeout edition)** |
| 3 | `admin` | Sonnet returned exit 1 mid-stream after writing every file the gate required (likely free-tier rate cap firing late in the run) | Build halted | **Gate-pass-override generalised to any non-zero exit** |
| 4 | `content` | Sonnet hit free-tier rate limit at 3.7s, no gate, not skippable | Build halted | `content` marked `skippable: true` to match other stacks |
| 5 | (none) | Self-healing test loop hit a PHPUnit 12 / Laravel `--no-interaction` flag incompatibility — AI wrote `run-tests.sh` wrapper to filter the offending flag | Build complete | Confirmed self-healing actually heals |

The fifth run finished with `status: complete`. State.json final shape:

```json
{
  "status": "complete",
  "completed_steps": [
    "packages", "filament", "configs", "structure",
    "core_models", "theme", "admin", "setup_md", "tests_fixed"
  ],
  "skipped_steps": ["content", "tests"]
}
```

Two enrichment steps skipped (rate-limited each time), nine completed, build green.

## The build trace by step

| Step | Adapter / model | Wall time | Outcome |
|---|---|---|---|
| `packages` (pre-AI shell) | composer | ~10 min | ✓ 12 packages installed |
| `filament` (pre-AI shell) | composer + artisan | ~30 s | ✓ AdminPanelProvider created |
| `configs`, `structure` (pre-AI shell) | shell | ~10 s | ✓ |
| `core_models` (attempt 3) | claude-opus-4-20250514 | (resume short-circuit — already complete from attempt 2 with gate-pass override) | ✓ via override |
| `theme` | claude-opus-4-20250514 | 7 min 24 s | ✓ |
| `admin` | claude-opus-4-20250514 | 15 min 30 s | ✓ clean (resume #4) |
| `content` | claude-sonnet-4-20250514 | 3.7 s | ⏭ skipped (rate limit) |
| `tests` | claude-sonnet-4-20250514 | rate-limited | ⏭ skipped |
| `setup_md` | claude-haiku-4-5-20251001 | ~1 min | ✓ |
| `tests_fixed` (post-yaml) | claude-sonnet-4-20250514 × 3 attempts | ~10 min | ✓ AI wrote `run-tests.sh` wrapper |

Total events in `events.jsonl` across all 5 attempts: **67**.

## What the AI did that wasn't in the prompt

Three things stand out from reading the generated code, none of which were prompted directly:

- **Brand-aware admin email.** The fixture said the project is "Vinarija Split". The AI created `AdminUserSeeder` with `admin@vinarija-split.test`, not the generic `admin@tessera.test` from the prompt. It made the choice that matched the brand without being told to.
- **`WineCatalogSeeder`.** Asked for product seeding; created a class named after the actual industry. Same pattern across `Producer` model, `WineCatalog` Livewire component, and the editorial Tailwind classes (`text-bordeaux`, `editorial-h1`, `editorial-eyebrow`).
- **`run-tests.sh` workaround.** The `tests_fixed` post-yaml hook hit a PHPUnit 12.5.23 / Laravel runner incompatibility (`--no-interaction` is Symfony-console, not PHPUnit). On the third fix attempt, the AI didn't try to patch PHPUnit or downgrade — it wrote a bash wrapper that filters the offending flag before passing arguments through. Real engineering, not pattern-matching.

## What this proves

- **The override pattern is necessary, not optional.** Two of the five cycles failed because the adapter exit code disagreed with the gate result. Without the override, this build would have looped indefinitely.
- **Skippable enrichment is the difference between a 25-minute partial-success and a 25-minute halted build.** Free-tier rate caps are not edge cases; they're the modal failure mode for Sonnet during a long run.
- **Self-healing tests really self-heal.** Three attempts, AI fixes both the test setup and a runner-level incompatibility, lands the project in a state where it boots, the admin loads, and the homepage serves Croatian copy.
- **Resume is cheap.** Pre-AI shell sequence (composer + filament install) ran once across all five cycles. State.json `completed_steps` short-circuits everything below the failed step on every retry.

## See also

- [Pekarnica Ognjište case study](/docs/case/bakery) — the static-site happy path, 9m 39s, no drama
- [Build trace & events](/docs/architecture/build-trace) — what every event in the 67-line log means
- [`tessera plan`](/docs/cli/plan) — inspect the recipe before running it
- [Pricing](/docs/pricing) — when you're ready to use this for client work
