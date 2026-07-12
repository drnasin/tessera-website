---
title: "After Building"
description: "What to do after Tessera generates your project. Set up the environment, configure the database, start the server, and make changes with AI."
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

## Step 2: Configure Environment

Your project has a `.env` file with configuration values. Most are set automatically, but you may need to update:

### Database credentials

If you used MySQL or PostgreSQL during the build, these are already set. If you need to change them:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_project
DB_USERNAME=root
DB_PASSWORD=
```

::: info What is .env?
The `.env` file stores configuration that changes between environments (your laptop vs production server). Things like database passwords, API keys, and app URLs. Never commit this file to git — it's already in `.gitignore`.
:::

### API keys (if applicable)

If your project has payments or third-party integrations, SETUP.md lists exactly which keys you need and where to get them.

## Step 3: Set Up the Database

### Laravel projects

```bash
# Run migrations — this creates the database tables
php artisan migrate

# Seed the database — this fills tables with sample content
php artisan db:seed
```

::: info What are migrations?
Migrations are PHP files that define your database structure (tables, columns, relationships). Running `php artisan migrate` creates all the tables your project needs. This was already done during the build, but you may need to re-run it if you changed your database.
:::

### Node.js projects

```bash
# Generate Prisma client and run migrations
npx prisma migrate dev
npx prisma db seed
```

### Go projects

```bash
make migrate
```

## Step 4: Start the Server

### Laravel

```bash
php artisan serve
```

- **Site:** `http://localhost:8000`
- **Admin panel:** `http://localhost:8000/admin`
- **Login:** `admin@tessera.test` / the one-time password shown at the end of the build (it is never stored — if you lost it, use "Forgot password" on the login screen)

### Node.js

```bash
npm run dev
```

### Go

```bash
make run
```

### Flutter

```bash
flutter run
```

### Static

```bash
npm run dev
```

Open `http://localhost:5173` (or whatever port Vite shows).

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

## Deploying to Production

SETUP.md includes a production checklist specific to your project. General steps:

1. **Set `APP_ENV=production`** and `APP_DEBUG=false` in `.env`
2. **Set a real `APP_KEY`** — run `php artisan key:generate`
3. **Configure your real database** credentials
4. **Set up a web server** — Nginx or Apache (SETUP.md has example configs)
5. **Run migrations** on the production database

::: tip
There is no fixed default admin password to change. The installer generates a cryptographically random one-time password per install, shows it exactly once at the end of the build, strips it from `.env` after seeding, and the admin account requires a password change on first login.
:::

## Common Questions

### Can I rename the project?

Yes. The project name is just a folder name. Rename the folder and update `APP_NAME` and `APP_URL` in `.env`.

### Can I change the database after building?

Yes. Update the `DB_*` values in `.env`, then run `php artisan migrate` again.

### Where are the generated files?

The project structure depends on your stack. See the stack-specific documentation for file locations:
- [Laravel](/docs/stacks/laravel)
- [Node.js](/docs/stacks/nodejs)
- [Go](/docs/stacks/go)
- [Flutter](/docs/stacks/flutter)
- [Static](/docs/stacks/static)

## Related

- [Creating a Project](/docs/creating-project) — the full build process
- [Resume & Recovery](/docs/resume) — resuming interrupted builds
- [Troubleshooting](/docs/troubleshooting) — common issues and fixes
