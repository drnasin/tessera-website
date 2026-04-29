---
title: "Getting Started"
description: "Install Tessera CLI in under a minute. Requires PHP, Composer, and at least one AI tool (Claude, Codex, or Gemini). Generate your first project today."
---

# Get Started with Tessera

Tessera is an AI project generator that runs as a CLI tool on your machine. Install it globally with Composer and start generating complete web projects from a conversation. New to Tessera? Read [What is Tessera?](/docs/what-is-tessera) first.

## Installation

```bash
composer global require tessera/installer
```

Make sure the Composer global bin directory is in your PATH:
- **Windows:** `%APPDATA%\Composer\vendor\bin`
- **macOS/Linux:** `~/.composer/vendor/bin`

Verify it works:

```bash
tessera --version
```

## System Check

Before creating your first project, run the built-in diagnostics to check that your system has everything Tessera needs:

```bash
tessera doctor
```

```
  TESSERA DOCTOR — System Check

System:
  OS: windows
  Package manager: scoop

Required:
✓ PHP — PHP 8.5.2
✓ Composer — 2.9.2

AI tools (need at least one):
✓ claude — 2.1.76
✓ gemini — 0.32.1
✓ codex — 0.114.0

Optional (depends on stack):
✓ Node.js — v25.8.0
✓ Go — go1.25.0
  Flutter — not installed
✓ Docker — 28.4.0
✓ Git — 2.45.1

✓ Disk space: 87.7 GB free

  All good! Run: tessera new my-project
```

## Prerequisites

**Required:**

### PHP 8.4+

PHP is the programming language Tessera is built with. Check if you have it:

```bash
php -v
```

If not installed:
- **Windows:** `scoop install php` or download from [php.net](https://www.php.net/downloads)
- **macOS:** `brew install php`
- **Linux (Ubuntu/Debian):** `sudo apt install php php-cli php-mbstring php-xml php-curl php-zip`

### Composer

Composer is PHP's package manager — it installs Tessera and its dependencies. Check if you have it:

```bash
composer --version
```

If not installed: follow the [official Composer install guide](https://getcomposer.org/download/). On macOS you can also run `brew install composer`.

### At least one AI CLI tool

Tessera uses AI tools installed on your machine. You need at least one:

| Tool | Installation | Free plan? |
|---|---|---|
| Claude | `npm install -g @anthropic-ai/claude-code` | Limited |
| Codex | `npm install -g @openai/codex` | Limited |
| Gemini | `npm install -g @google/gemini-cli` | Yes |

::: info Don't have npm?
These AI tools are installed via npm (Node.js package manager). If you don't have it, install Node.js first from [nodejs.org](https://nodejs.org/) — npm comes bundled with it.
:::

**Optional** (auto-installed if missing):
- Node.js — for frontend assets and the [Node.js stack](/docs/stacks/nodejs)
- Go — for the [Go stack](/docs/stacks/go)
- Flutter SDK — for the [Flutter stack](/docs/stacks/flutter)

## Create Your First Project

```bash
tessera new my-project
```

AI will lead a natural conversation — asking about the business, languages, payments, design style — and then [build everything automatically](/docs/creating-project). The entire process takes a few minutes.

::: tip
The installer asks about your AI subscription plans during setup. If you have Claude Max (unlimited), it will prefer Claude for all tasks since there's no cost concern. Learn more about [AI routing](/docs/ai-routing).
:::

## Skipping the conversation (dev mode)

If you already know which stack you want and you don't need AI to interview you, two flags speed things up:

```bash
# Pick the stack yourself — no AI stack-selection call.
tessera new my-shop --stack=laravel

# Skip the interactive Q&A by loading requirements from JSON.
tessera new my-shop \
  --stack=laravel \
  --requirements-fixture=./req.json
```

A minimal `req.json`:

```json
{
  "description": "Online wine shop in Croatia, three categories, Croatian + English",
  "languages": ["hr", "en"],
  "design_style": "elegant, refined",
  "design_colors": "burgundy, cream",
  "needs_shop": true,
  "country": "HR",
  "payment_providers": ["corvuspay", "bank_transfer"]
}
```

This is mostly useful for repeated dev iterations and CI smoke runs.

## Inspect the build before tokens are spent

Tessera lets you compile and inspect the AI plan **without invoking any AI**:

```bash
tessera plan compile stacks/laravel.yaml
tessera plan show
```

The plan tells you exactly which steps run, in which order, with which prompt, against which AI. See [`tessera plan`](/docs/cli/plan) for the full reference.

## Next Steps

- [Creating a Project](/docs/creating-project) — see the full build process from conversation to working app
- [After Building](/docs/after-building) — what to do once your project is generated
- [AI Routing](/docs/ai-routing) — understand how Tessera picks the best AI for each task
- [Resume & Recovery](/docs/resume) — what happens when builds fail or get interrupted
- [Build trace & events](/docs/architecture/build-trace) — read `events.jsonl` to debug a finished build
