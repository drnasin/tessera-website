---
title: Laravel
parent: Stacks
nav_order: 1
---

# Laravel + Filament

The most complete stack. Websites, CMS, e-commerce, admin panels — AI builds everything.

## What Gets Generated

- **Core models**: Page, Block, Navigation with translations
- **Theme**: Responsive Tailwind CSS frontend with block-based pages
- **Admin panel**: Filament resources for every model with dashboard widgets
- **E-commerce** (if needed): Products, cart, checkout, payments, shipping
- **Content**: Realistic seeded content in all configured languages
- **Tests**: PHPUnit feature tests that pass
- **SETUP.md**: Complete deployment guide

## Tech Stack

| Component | Version |
|---|---|
| PHP | 8.2+ |
| Laravel | 12 |
| Filament | 5 |
| Livewire | 4 |
| Tailwind CSS | 4 |
| Alpine.js | 3 |

## After Generation

```bash
cd my-project
php artisan serve

# AI-powered changes
php artisan tessera "add a gallery to the homepage"
php artisan tessera --fix    # AI reads error log and fixes
php artisan tessera --audit  # AI reviews the project
```

The admin panel is at `/admin` with a floating AI chat widget in the bottom-right corner.
