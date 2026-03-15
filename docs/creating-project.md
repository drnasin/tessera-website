---
title: Creating a Project
---

# Creating a Project

## The Conversation

When you run `tessera new`, AI leads a natural conversation to understand your project:

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

After the conversation, AI picks the best technology stack and builds everything:

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

For a Laravel project, AI creates:

- **Models & migrations** — Page, Block, Navigation + project-specific models
- **Theme** — Responsive Tailwind CSS frontend with block views
- **Admin panel** — Filament resources for every model
- **Content** — Realistic seeded content (no lorem ipsum)
- **Tests** — PHPUnit feature tests that pass
- **SETUP.md** — Developer handoff document with everything needed for deployment

## Country-Aware Payments

AI knows which payment providers are popular in each country:

| Country | Suggested providers |
|---|---|
| Croatia, Slovenia, Serbia | CorvusPay, WSPay, Stripe |
| Austria, Germany, Switzerland | Klarna, Mollie, Stripe |
| UK | Stripe, GoCardless, PayPal |
| USA | Stripe, Square, PayPal |

## Your Requests Are Respected

If you tell AI to use a specific package, approach, or style — it will. For example:

- "Use Laravel Breeze for authentication"
- "I want a dark theme"
- "Use PostgreSQL, not MySQL"

These are passed to all AI steps as mandatory instructions.
