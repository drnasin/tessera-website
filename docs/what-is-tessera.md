---
title: "What is Tessera?"
description: "Tessera is an AI-powered CLI tool that generates complete web projects from a conversation. Learn what it does, how it works, and what you need to get started."
---

# What is Tessera?

Tessera is a **command-line tool** (CLI) that generates complete web projects using AI. You describe what you need in plain language, and AI builds everything — database, backend, frontend, admin panel, tests, and deployment instructions.

## Who is it for?

- **Freelancers** who need to deliver client projects fast
- **Developers** who want to skip boilerplate and scaffolding
- **Agencies** that build multiple sites with similar patterns
- **Students** learning how real-world projects are structured

## What Does an AI Project Generator Do?

When you run `tessera new my-project`, Tessera:

1. **Asks you questions** — what the client does, which languages, payments, design style
2. **Picks a tech stack** — Laravel, Node.js, Go, Flutter, or Static, based on your answers
3. **Generates everything** — models, pages, admin panel, content, tests, deployment docs
4. **Reviews its own work** — a second AI checks the first AI's output for mistakes

The result is a working project you can run locally and deploy to production.

## Requirements: PHP, Composer, and an AI CLI Tool

- **PHP 8.4+** — the programming language Tessera is built with
- **Composer** — a package manager for PHP (like npm for JavaScript)
- **At least one AI tool** — Claude, Codex, or Gemini installed on your machine

Don't have these yet? The [Getting Started](/docs/getting-started) guide walks you through installing everything.

## Tessera vs. ChatGPT and GitHub Copilot

ChatGPT and Copilot help you write code **one file at a time**. Tessera generates an **entire project** — dozens of files that work together. It understands how models connect to views, how admin panels map to database tables, and how tests should cover the generated code.

Think of it this way:
- **ChatGPT** = asking a developer to write a function
- **Tessera** = hiring a developer to build the whole project

## What are AI tokens?

When Tessera talks to AI tools like Claude or Gemini, each request uses **tokens** — units of text that AI processes. More complex tasks use more tokens.

- **Free plans** have limited tokens per day
- **Paid plans** (like Claude Max) give you unlimited or higher limits
- Tessera is smart about token usage — it picks the cheapest AI model that can handle each task

You don't pay Tessera anything. You pay for the AI tools you already have installed.

## Does it cost money?

Tessera itself is **free for non-commercial use**. You only pay for the AI subscriptions you already have (Claude, Gemini, Codex). See the [License](/docs/license) page for details on commercial use.

## Next Steps

- [Getting Started](/docs/getting-started) — install Tessera and create your first project
- [Creating a Project](/docs/creating-project) — see the full build process
- [Technology Stacks](/docs/stacks/laravel) — what each stack generates
