---
title: "Contributing to Tessera — Add Stacks and Improve the AI Generator"
description: "Contribute to Tessera's open-source AI project generator. Add new technology stacks, improve AI prompts, or fix bugs. 131 tests, zero AI tokens needed to run them."
---

# Contributing to Tessera

Tessera is open for contributions. Whether you want to add a new technology stack, improve AI prompts, or fix bugs — contributions are welcome.

See the full guide in the repository: [CONTRIBUTING.md on GitHub](https://github.com/drnasin/tessera-installer/blob/master/CONTRIBUTING.md)

## Quick Overview

```bash
git clone https://github.com/drnasin/tessera-installer.git
cd tessera-installer
composer install
vendor/bin/phpunit   # 131 tests, zero tokens
```

## Adding a New Stack

Create `src/Stacks/YourStack.php` implementing `StackInterface` and register it in `StackRegistry::init()`. Each stack needs:

- `preflight()` — check required tools
- `scaffold()` — AI-driven build flow
- Universal prompt rules (use it like a customer, verify before you use)

See [CONTRIBUTING.md](https://github.com/drnasin/tessera-installer/blob/master/CONTRIBUTING.md) for details, example code, and the full contribution workflow.

## Related

- [Getting Started](/docs/getting-started) — install Tessera and try it out before contributing
- [AI Routing](/docs/ai-routing) — understand how AI tools are orchestrated during builds
