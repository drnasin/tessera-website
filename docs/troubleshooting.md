---
title: "Troubleshooting"
description: "Common issues and solutions when using Tessera. Fix installation problems, build failures, database errors, and AI tool issues."
---

# Troubleshooting

## Installation Issues

### `composer: command not found`

Composer is not installed or not in your PATH.

- Install Composer: [getcomposer.org/download](https://getcomposer.org/download/)
- On macOS: `brew install composer`
- On Linux: `sudo apt install composer`

### `tessera: command not found`

Composer's global bin directory is not in your PATH. Add it:

- **Windows:** add `%APPDATA%\Composer\vendor\bin` to your system PATH
- **macOS/Linux:** add this to your `~/.bashrc` or `~/.zshrc`:
  ```bash
  export PATH="$HOME/.composer/vendor/bin:$PATH"
  ```
  Then run `source ~/.bashrc` (or `source ~/.zshrc`).

### `php: command not found`

PHP is not installed. See the [Prerequisites](/docs/getting-started#php-8-2) section for installation instructions.

### PHP version too old

```
Your PHP version (7.4) does not satisfy the requirement (>=8.2)
```

Upgrade PHP:
- **Windows:** `scoop update php` or download from [php.net](https://www.php.net/downloads)
- **macOS:** `brew upgrade php`
- **Linux:** `sudo apt install php8.3` (check your distro's available versions)

## AI Tool Issues

### `No AI tools found`

Tessera needs at least one AI CLI tool installed. The easiest to start with is Gemini (free):

```bash
npm install -g @google/gemini-cli
```

See [Getting Started](/docs/getting-started#at-least-one-ai-cli-tool) for all options.

### AI rate limit errors

If an AI tool hits its rate limit, Tessera automatically switches to the next available tool. If all tools are rate-limited:

- **Wait a few minutes** and [resume the build](/docs/resume)
- **Upgrade your plan** — Claude Max or paid Codex plans have higher limits
- **Add more AI tools** — Tessera rotates between all available tools

### AI generates incorrect code

Tessera has [built-in safeguards](/docs/creating-project#built-in-safeguards):
- PHP Lint catches syntax errors
- Namespace auto-fix corrects wrong imports
- Self-healing tests fix failing tests automatically

If something still goes wrong, the issue is usually in the generated content, not the structure. You can fix it with:

```bash
# Laravel projects
php artisan tessera --fix

# Other stacks — use your AI tool directly
claude "fix the error in src/routes/api.ts"
```

## Database Issues

### `Access denied for user`

Wrong database credentials. Tessera will ask you to retry. Make sure:
- MySQL/MariaDB is running
- The username and password are correct
- The user has permission to create databases

### `Can't connect to database`

The database server isn't running. Start it:
- **Laragon:** start the MySQL service from the Laragon panel
- **MAMP/XAMPP:** start MySQL from the control panel
- **Homebrew (macOS):** `brew services start mysql`
- **Linux:** `sudo systemctl start mysql`

If you can't get the database running, Tessera will offer to fall back to **SQLite** (no server needed).

### `Can't create database`

Your database user doesn't have permission to create databases. You can either:
- Create the database manually and tell Tessera the name
- Grant `CREATE` privileges to your user

## Build Issues

### Build fails mid-way

Don't worry — progress is saved. Just run the same command again:

```bash
tessera new my-project
```

Tessera detects the previous state and [resumes from where it stopped](/docs/resume). No tokens are wasted on completed steps.

### Build seems stuck

AI calls can take 30–90 seconds each. If a step takes more than 3 minutes:

1. Press `Ctrl+C` to stop
2. Run the same command again — it resumes
3. If it keeps failing on the same step, try a different AI tool by adjusting your available tools

### Tests fail after build

Tessera runs self-healing tests with up to 3 fix attempts. If tests still fail after that:

```bash
cd my-project

# Laravel
php artisan test

# Node.js
npm test

# Go
make test
```

Check the error output, then use your AI tool to fix it:

```bash
claude "fix the failing test in tests/Feature/PageTest.php"
```

## Still stuck?

Run `tessera doctor` to check your system setup, then [open an issue on GitHub](https://github.com/drnasin/tessera-installer/issues) with the output.
