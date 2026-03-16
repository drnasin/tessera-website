---
title: "Getting Started"
description: "Install Tessera CLI in under a minute. Requires PHP, Composer, and at least one AI tool (Claude, Codex, or Gemini). Generate your first project today."
---

# Get Started with Tessera

Tessera is an AI project generator that runs as a CLI tool on your machine. Install it globally with Composer and start generating complete web projects from a conversation.

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
- PHP 8.2+
- Composer
- At least one AI CLI tool:

| Tool | Installation |
|---|---|
| Claude | `npm install -g @anthropic-ai/claude-code` |
| Codex | `npm install -g @openai/codex` |
| Gemini | `npm install -g @google/gemini-cli` |

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

## Next Steps

- [Creating a Project](/docs/creating-project) — see the full build process from conversation to working app
- [After Building](/docs/after-building) — what to do once your project is generated
- [AI Routing](/docs/ai-routing) — understand how Tessera picks the best AI for each task
- [Resume & Recovery](/docs/resume) — what happens when builds fail or get interrupted
