---
title: "Laravel Stack"
description: "Tessera's Laravel stack generates a full application with Filament admin, Tailwind theme, e-commerce, tests, and deployment docs. AI builds everything from a conversation."
---

# Laravel + Filament Stack

The most complete stack in Tessera's AI project generator. Websites, CMS, e-commerce, admin panels — AI builds a production-ready Laravel application from a conversation.

## What Gets Generated

- **Core models**: Page, Block, Navigation with translations
- **Theme**: Responsive Tailwind CSS frontend with block-based pages
- **Admin panel**: Filament resources for every model with dashboard widgets
- **E-commerce** (if needed): Products, cart, checkout, payments, shipping
- **Content**: Realistic seeded content in all configured languages
- **Tests**: PHPUnit feature tests that pass
- **SETUP.md**: Complete deployment guide for developer handoff

## Tech Stack

| Component | Version |
|---|---|
| PHP | 8.2+ |
| Laravel | 13 |
| Filament | 5 |
| Livewire | 4 |
| Tailwind CSS | 4 |
| Alpine.js | 3 |

## After Generation

```bash
cd my-project
php artisan serve

# AI-powered changes after initial generation
php artisan tessera "add a gallery to the homepage"
php artisan tessera --fix    # AI reads error log and fixes
php artisan tessera --audit  # AI reviews the project
```

The admin panel is at `/admin` with a floating AI chat widget in the bottom-right corner for ongoing AI-assisted development.

## When AI Picks This Stack

Tessera recommends Laravel + Filament when your project needs:
- A content-managed website (CMS)
- An admin panel for non-technical users
- E-commerce with payments and shipping
- Multi-language support
- A backend with authentication and authorization

## How the build is described

Every Tessera stack — Laravel included — describes its AI build steps in a YAML file at `stacks/laravel.yaml`. Inspect what the AI is about to do before the run:

```bash
tessera plan compile stacks/laravel.yaml
tessera plan show
```

The Laravel manifest currently declares six AI steps (`core_models`, `theme`, `admin`, `content`, `tests`, `setup_md`) plus a post-AI test-fix loop. The pre-AI shell sequence (composer create-project, package install, filament:install, configs, structure, db config) lives in `LaravelStack.php` because those steps are too tool-specific for the YAML engine.

To author your own stack, see [YAML stack manifests](/docs/architecture/yaml-manifests).

## Related Stacks

Not every project needs Laravel. Tessera also supports [Node.js](/docs/stacks/nodejs) for API-first apps, [Go](/docs/stacks/go) for high-performance backends, [Flutter](/docs/stacks/flutter) for mobile apps, and [Static](/docs/stacks/static) for simple landing pages.
