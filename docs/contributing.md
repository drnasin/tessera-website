---
title: "Contributing"
description: "Contribute to Tessera's open-source AI project generator. Add new technology stacks, improve AI prompts, or fix bugs. 403 tests, zero AI tokens needed to run them."
---

# Contributing to Tessera

Tessera is open for contributions. Whether you want to add a new technology stack, improve AI prompts, or fix bugs — contributions are welcome.

## Setting Up the Dev Environment

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/tessera-installer.git
cd tessera-installer

# 2. Install dependencies
composer install

# 3. Verify everything works
vendor/bin/phpunit
```

You should see 403 tests passing. All tests run with **zero AI tokens** — no API keys or AI tools needed for development.

## Project Structure

```
tessera-installer/
├── bin/tessera              # CLI entry point
├── src/
│   ├── NewCommand.php       # Main `tessera new` orchestrator
│   ├── StepRunner.php       # Executes AI steps with error recovery
│   ├── AiTool.php           # Detects & runs AI CLI tools
│   ├── ToolRouter.php       # Smart cross-tool routing
│   ├── ToolPreference.php   # Plan tiers & tool ordering
│   ├── Memory.php           # State persistence for resume
│   ├── SystemInfo.php       # OS & tool detection
│   ├── Console.php          # Terminal I/O & formatting
│   └── Stacks/
│       ├── StackInterface.php    # Contract for all stacks
│       ├── StackRegistry.php     # Stack discovery
│       ├── LaravelStack.php      # Laravel + Filament
│       ├── NodeStack.php         # Node.js / Next.js
│       ├── GoStack.php           # Go backend
│       ├── FlutterStack.php      # Flutter mobile
│       └── StaticStack.php       # Static HTML + Tailwind
└── tests/
    ├── Unit/                # 8 unit test files
    └── Integration/         # 2 integration test files
```

## What You Can Contribute

### Good first contributions

- **Bug fixes** — check [open issues](https://github.com/drnasin/tessera-installer/issues)
- **Documentation** — fix typos, improve explanations, add examples
- **Test coverage** — add tests for edge cases

### Bigger contributions

- **New technology stacks** — add a Ruby on Rails, Django, or Rust stack
- **Improve AI prompts** — make generated code better for specific use cases
- **New features** — after discussing in a GitHub issue first

## How to Submit a Pull Request

1. **Create a branch** from `master`:
   ```bash
   git checkout -b fix/your-description
   ```

2. **Make your changes** and write tests if applicable

3. **Run the test suite** — all 403 tests must pass:
   ```bash
   vendor/bin/phpunit
   ```

4. **Run code style** (Laravel Pint):
   ```bash
   ../vendor/bin/pint src/ tests/
   ```

5. **Commit with a clear message:**
   ```bash
   git commit -m "Fix: describe what you fixed and why"
   ```

6. **Push and open a PR** against `master`

### Branch naming

- `fix/description` — bug fixes
- `feature/description` — new features
- `docs/description` — documentation changes
- `test/description` — test improvements

## Writing Tests

All tests must run with **zero token usage** — no real AI calls allowed.

```php
// Use AiTool::fake() for test instances
$tool = AiTool::fake('claude');

// Suppress Console output in tests
ob_start();
// ... your test code
ob_end_clean();
```

Test decision logic and state machines, not AI output quality. The AI output is unpredictable by nature — test the code that handles it.

```bash
# Run all tests
vendor/bin/phpunit

# Run a specific test file
vendor/bin/phpunit tests/Unit/MemoryTest.php

# Run a specific test method
vendor/bin/phpunit --filter=testResolveComplexDefaultsToClaudeOpus
```

## Adding a New Stack

1. Create `src/Stacks/YourStack.php` implementing `StackInterface`
2. Register it in `StackRegistry::init()`
3. Implement the required methods:

| Method | Purpose |
|---|---|
| `name()` | Short identifier (e.g. `'rails'`) |
| `label()` | Display name (e.g. `'Ruby on Rails'`) |
| `description()` | One-line description for AI context |
| `preflight()` | Check that required tools are installed |
| `scaffold()` | AI-driven build flow |
| `postSetup()` | Run after build (migrations, seeding) |
| `completionInfo()` | Show "your project is ready" info |

4. Add tests in `tests/Unit/YourStackTest.php`
5. Add a documentation page in the [website repo](https://github.com/drnasin/tessera-website)

## Key Design Decisions

These principles guide all contributions:

- **Principle-based prompts** — use 2-3 universal rules instead of long checklists. AI works better with principles than instructions.
- **Version-agnostic** — never hardcode framework versions. Read them from `vendor/` or `package.json` at runtime.
- **Deterministic gates over AI grading** — every meaningful step ends with a `gates:` block in YAML. Prefer `exists_any` / `exists_all` / `command_passes` over a second AI call to "review" the first.
- **Schema-versioned artefacts** — every persistent file (`state.json`, `events.jsonl`, `plan.json`) carries `tessera.<artifact>/v<N>`. Bump the version, never silently change the shape.
- **Atomic state** — use temp file + rename for crash safety. Never write state directly. Memory writes happen *before* the matching audit event so resume stays correct on Ctrl+C.
- **Minimal dependencies** — runtime is PHP 8.2+ and `symfony/yaml`. Adding a third dependency requires a strong reason.

## What to Avoid

- **Breaking changes** without discussing in an issue first
- **Large PRs** that change many files — split them into smaller focused PRs
- **Adding runtime dependencies** — Tessera intentionally has zero runtime deps
- **Hardcoding AI model names** — use the routing system, not direct model references
- **Tests that call real AI tools** — all tests must work offline

## Reporting Bugs

Open a [GitHub issue](https://github.com/drnasin/tessera-installer/issues) with:

1. **Output of `tessera doctor`** — shows your system setup
2. **Steps to reproduce** — what command you ran, what you described
3. **Expected vs actual result** — what went wrong
4. **OS and PHP version** — from `php -v` and `uname -a`

## Environment Variables

Useful for testing different AI configurations:

| Variable | Values | Purpose |
|---|---|---|
| `TESSERA_CLAUDE_PLAN` | `max`, `pro`, `free` | Override Claude plan detection |
| `TESSERA_CODEX_PLAN` | `plus`, `free` | Override Codex plan detection |
| `TESSERA_GEMINI_PLAN` | `pro`, `free` | Override Gemini plan detection |
| `TESSERA_TOOL_PREFERENCE` | `claude,gemini,codex` | Custom tool order |
| `TESSERA_TOOL_EXCLUDE` | `codex` | Tools to never use |
| `TESSERA_AI_TIMEOUT` | `900` | AI step timeout in seconds (default 900) |
| `TESSERA_SAFE_AI` | `1` | **Claude only** — strips `--dangerously-skip-permissions`, so Claude pauses on each action for approval. Does not affect Codex or Gemini. See [Security Model](/docs/disclaimer#security-model). |

## Related

- [Getting Started](/docs/getting-started) — install Tessera and try it out before contributing
- [AI Routing](/docs/ai-routing) — understand how AI tools are orchestrated during builds
- [Full CONTRIBUTING.md on GitHub](https://github.com/drnasin/tessera-installer/blob/master/CONTRIBUTING.md) — additional details
