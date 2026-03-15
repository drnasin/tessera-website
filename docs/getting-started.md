---
title: Getting Started
---

# Getting Started

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

Before creating your first project, check if your system is ready:

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
- Node.js — for frontend assets and Node.js stack
- Go — for Go stack
- Flutter SDK — for Flutter stack

## Create Your First Project

```bash
tessera new my-project
```

AI will ask you about your project — what it does, what languages, what payment provider, what design style — and build everything.

{: .tip }
The installer asks about your AI subscription plans during setup. If you have Claude Max (unlimited), it will prefer Claude for all tasks since there's no cost concern.
