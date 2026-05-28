---
title: "Tessera vs. Manual Scaffolding"
description: "Compare AI-generated project scaffolding with manual setup. Tessera generates a production-ready Laravel, Node.js, or Go project in under 10 minutes — including tests, admin panel, and deployment docs."
---

# Tessera vs. Manual Scaffolding

Every new client project starts the same way: create a repo, install the framework, set up the database, wire up authentication, scaffold the admin panel, add demo content, write the first tests, document the deploy process. On a typical Laravel project that is 18–36 hours before you have written a single line of business logic.

Tessera does all of it in one command.

## Time Comparison: Manual Setup vs. AI Project Generation

The table below covers a typical client project — a business website with authentication, an admin panel, a product catalog, and a contact form. A real example: [a Croatian bakery went from a JSON fixture to a deployable static site in 9 minutes 39 seconds](/docs/case/bakery).

| Task | Manual (estimated hours) | With Tessera |
|---|---|---|
| Project setup, directory structure | 1–2 h | included |
| Database schema design | 2–4 h | included |
| Eloquent models, migrations, factories | 2–4 h | included |
| Authentication scaffold | 2–3 h | included |
| Filament admin panel | 4–8 h | included |
| Tailwind frontend theme | 3–6 h | included |
| Realistic seeded content | 1–3 h | included |
| PHPUnit test suite | 2–4 h | included |
| SETUP.md & deployment docs | 1–2 h | included |
| **Total** | **18–36 hours** | **< 10 minutes** |

## What You Skip Every Time You Start a New Project

Manual scaffolding is repeatable in the worst way — you solve the same problems on every project:

- Remembering which Filament version pairs with which Laravel version
- Wiring `HasTranslations` to every translatable model
- Writing the same `UserFactory`, `ProductFactory`, `PageFactory` stubs
- Resetting a test database with stale migrations
- Writing a deploy guide that the developer on handoff actually understands

With Tessera none of that is your problem. The AI picks the correct package versions, generates realistic content in your project's configured languages, and writes a SETUP.md specific to the project — not a copy-paste from the last one.

## What AI Project Generation Delivers That Manual Scaffolding Skips

Most manual scaffolds stop at "runnable". Tessera delivers "production-ready":

| Deliverable | Manual scaffolding | Tessera |
|---|---|---|
| Test suite | Skeleton at best, usually skipped | PHPUnit / Vitest / Go tests that pass |
| Seed data | lorem ipsum or hardcoded fixtures | Realistic, language-aware content |
| Admin panel | Separate package, hours to configure | Filament resources for every model |
| Deployment docs | Copy-pasted template or skipped | Project-specific SETUP.md |
| Audit trail | Git log | `.tessera/events.jsonl` — every AI call, every gate result |
| Quality gates | Manual code review | Deterministic gates that fail the build if output is wrong |

## AI Routing: The Right Model for Each Task

Tessera does not call one AI model for everything. The build plan assigns complexity levels to each step and routes accordingly:

- **Complex steps** (scaffold, core models) → Claude Opus
- **Medium steps** (admin panel, theme) → Claude Sonnet
- **Simple steps** (SETUP.md, boilerplate) → Claude Haiku

You do not pay Opus-level tokens on steps that Haiku handles just as well. [See AI routing →](/docs/ai-routing)

## When Manual Scaffolding Is Still the Right Choice

Tessera generates complete, opinionated projects. That is a strength for most work and a constraint in some cases:

- **Highly unusual architecture** — if your project cannot map to any of Tessera's five stacks, start manually
- **Learning a framework** — if you are studying Laravel internals, generating the project hides the fundamentals; use Tessera once you understand what it is building
- **Extending an existing project** — Tessera generates new projects; it does not refactor or add features to an existing codebase
- **Ultra-minimal tools** — a 20-line API with no frontend, no admin panel, and no tests does not need a project generator

## Summary: Manual Scaffolding vs. Tessera AI Generator

| | Manual scaffolding | Tessera |
|---|---|---|
| Setup time | 18–36 hours | < 10 minutes |
| Test suite | Optional | Included, passing |
| Admin panel | Hours to configure | Included |
| Seed data | lorem ipsum or skipped | Realistic, language-aware |
| Deployment docs | Template or skipped | Project-specific |
| Audit trail | None | Full `.tessera/` directory |
| Reproducibility | Varies per developer | Hash-anchored build plan |
| Cost | Your time | Free for personal use — [commercial licence from €249/year](/docs/pricing) for client work |

## Start Generating Projects Instead of Scaffolding Them

- [Install Tessera CLI](/docs/getting-started) — Composer global install, works in under a minute
- [See what a real build looks like](/docs/case/bakery) — a Croatian bakery, 9 minutes 39 seconds
- [Pricing](/docs/pricing) — free for personal and noncommercial use
