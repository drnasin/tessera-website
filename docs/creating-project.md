---
title: "Creating a Project"
description: "See how Tessera's AI project generator builds a complete web app from a conversation. Models, theme, admin panel, tests, and deployment — all automated."
---

# Creating a Project with AI

Tessera generates complete web projects through a short conversation. You describe the business, AI picks the best technology stack, and builds everything — models, theme, admin panel, content, tests, and deployment docs.

## The Conversation

When you run `tessera new`, the AI code generator leads a natural conversation to understand your project:

```
$ tessera new my-restaurant

✓ AI: claude, gemini, codex
✓ OS: windows (scoop)
✓ DB: mysql, sqlite

What AI plans do you have?
  Claude plan: Max (unlimited)
  Codex plan: Free
  Gemini plan: Free

AI: Tell me about the project — what does the client do?
> A restaurant in Split, they need a website with a menu and reservations

AI: Which languages should the site support?
> Croatian and English

AI: Will customers be paying online?
> No, just presentation with a reservation form

AI: What style do you prefer?
> Modern and warm. Earth tones.
```

AI asks about 5 mandatory topics:
1. **Business** — what the client does
2. **Languages** — which languages the site needs
3. **Payments** — if e-commerce, which provider
4. **Frontend design** — style, colors, mood
5. **Scale** — expected users/products

## The Build

After the conversation, AI picks the best technology stack and builds everything automatically:

```
AI recommends: Laravel + Filament (Tessera CMS)
Continue? [Y/n]: Y

[1/8] Create Laravel project           ✓
[2/8] Install packages                  ✓
[3/8] Setting up admin panel            ✓
[4/8] Publishing configs                ✓
[5/8] Creating project structure        ✓
[6/8] AI is building your project...
  ✓ Creating database models            (claude opus)
  ✓ Designing frontend theme            (claude opus)
  ✓ Peer review: frontend theme         (gemini flash)
  ✓ Building admin panel                (claude sonnet)
  ✓ Writing content and seeding data    (claude sonnet)
  ✓ Generating tests                    (claude sonnet)
  ✓ All tests passing
  ✓ Setup instructions                  (claude haiku)
[7/8] Running migrations                ✓
[8/8] Seeding database                  ✓

╔══════════════════════════════════════╗
║         PROJECT IS READY!            ║
╚══════════════════════════════════════╝

  AI usage: claude: 5 calls (2 opus, 2 sonnet, 1 haiku) | gemini: 1 call (flash)

  cd my-restaurant
  php artisan serve

  Site:   http://localhost:8000
  Admin:  http://localhost:8000/admin
  Login:  admin@tessera.test / password
```

## What Gets Generated

For a [Laravel project](/docs/stacks/laravel), AI creates:

- **Models & migrations** — Page, Block, Navigation + project-specific models
- **Theme** — Responsive Tailwind CSS frontend with block views
- **Admin panel** — Filament resources for every model with dashboard widgets
- **Content** — Realistic seeded content (no lorem ipsum)
- **Tests** — PHPUnit feature tests that pass
- **SETUP.md** — Developer handoff document with everything needed for deployment

Other stacks generate equivalent output — see [Node.js](/docs/stacks/nodejs), [Go](/docs/stacks/go), [Flutter](/docs/stacks/flutter), and [Static](/docs/stacks/static) for details.

## Country-Aware Payments

The AI code generator knows which payment providers are popular in each country:

| Country | Suggested providers |
|---|---|
| Croatia, Slovenia, Serbia | CorvusPay, WSPay, Stripe |
| Austria, Germany, Switzerland | Klarna, Mollie, Stripe |
| UK | Stripe, GoCardless, PayPal |
| USA | Stripe, Square, PayPal |

## Database Setup

During preflight, Tessera detects which databases are available on your system (MySQL, MariaDB, PostgreSQL, SQLite). If you pick MySQL or PostgreSQL, Tessera asks for your credentials and tests the connection.

If something goes wrong:
- **Wrong credentials** — retry with different credentials
- **Can't create database** — Tessera waits for you to create it manually, then verifies
- **Can't connect at all** — falls back to SQLite so the build can continue

You won't lose progress — the database choice is saved and can be changed later in the `.env` file.

## Built-in Safeguards

After generating code, Tessera runs automatic checks before handing the project to you:

- **PHP Lint** — runs `php -l` on every generated file to catch syntax errors instantly (zero AI tokens)
- **Namespace Auto-Fix** — scans generated files against `vendor/` to fix incorrect class imports (common across framework versions)
- **Self-Healing Tests** — generates tests, runs them, and if any fail, AI fixes the issue automatically (up to 3 attempts)
- **Version-Agnostic Prompts** — AI verifies package versions from your actual `vendor/` directory, so prompts stay correct across Laravel, Filament, and Livewire upgrades

## Your Requests Are Respected

If you tell AI to use a specific package, approach, or style — it will. For example:

- "Use Laravel Breeze for authentication"
- "I want a dark theme"
- "Use PostgreSQL, not MySQL"

These are passed to all AI build steps as mandatory instructions.

## What Happens If Something Goes Wrong?

Tessera saves progress after every step. If a build fails or you interrupt it, [resume from where it stopped](/docs/resume) — no wasted AI tokens, no lost work.

## Next Steps

- [After Building](/docs/after-building) — what to do once the build finishes
- [AI Routing](/docs/ai-routing) — how Tessera picks the best AI for each task
