---
title: Contributing
nav_order: 9
---

# Contributing

Tessera is open for contributions. See the full guide in the repository:

[CONTRIBUTING.md on GitHub](https://github.com/drnasin/tessera-installer/blob/master/CONTRIBUTING.md)

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

See [CONTRIBUTING.md](https://github.com/drnasin/tessera-installer/blob/master/CONTRIBUTING.md) for details and example code.
