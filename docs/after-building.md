---
title: "After Building"
description: "What to do after Tessera generates your project. Read SETUP.md, start the server, make changes with AI commands, and manage content through the admin panel."
---

# After Building Your Project

Your project is ready. Here's what to do next.

## Step 1: Read SETUP.md

Every generated project includes a `SETUP.md` file written specifically for your project. It contains:

- **Environment variables** — what to set, where to get the values
- **Payment setup** — step-by-step if your project has e-commerce
- **Production checklist** — security, database, email, caching
- **Common tasks** — how to add pages, blocks, or features

```bash
cd my-project
cat SETUP.md
```

::: tip
SETUP.md is written for junior developers. It explains technical concepts when needed and includes links to where you can get API keys.
:::

## Step 2: Start the Server

```bash
php artisan serve
```

- **Site:** `http://localhost:8000`
- **Admin:** `http://localhost:8000/admin`
- **Login:** `admin@tessera.test` / `password`

## Making Changes

How you make changes depends on the stack AI chose for your project.

### Laravel Projects

Laravel projects have a built-in AI Engine that knows your entire project — models, blocks, theme, admin, everything.

**For content changes** (text, images, pages) — use the admin panel at `/admin`. There's an AI chat widget in the bottom-right corner that tracks what you're doing and offers help.

**For structural changes** (new features, modules, integrations) — use the `tessera` command:

```bash
# AI chat — describe what you need
php artisan tessera

# Direct request
php artisan tessera "add a gallery to the homepage"

# Fix an error automatically
php artisan tessera --fix

# AI reviews your project for issues
php artisan tessera --audit
```

### Node.js / Go / Flutter / Static Projects

These stacks don't have a built-in AI Engine. Use your AI CLI tool directly — it reads the project structure automatically:

```bash
# Use whichever AI tool you have
claude "add user authentication with JWT"
codex "create REST API for products"
gemini "add dark mode toggle"
```

No need to explain the architecture — the AI reads the codebase and understands it.

## Related

- [Creating a Project](/docs/creating-project) — the full build process
- [Resume & Recovery](/docs/resume) — resuming interrupted builds
