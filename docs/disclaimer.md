---
title: "Disclaimer"
description: "Important information about AI token consumption, generated code quality, third-party integrations, and warranty limitations when using Tessera."
---

# Disclaimer

## AI Token Usage

Tessera calls AI CLI tools installed on your system (Claude, Gemini, Codex) to generate code. **Each call consumes tokens from your own subscription plan or API quota.**

- Tessera does not provide, manage, or pay for AI access
- You are responsible for understanding your plan's limits, costs, and terms of service
- A typical project build uses 5-10 AI calls depending on project complexity
- The [plan-aware routing](/docs/ai-routing#plan-aware-routing) during setup helps Tessera route tasks efficiently based on your subscriptions

## Generated Code

All code produced by Tessera is **AI-generated**. While Tessera includes multiple safeguards:

- [Quality gates](/docs/ai-routing#quality-gates-catching-done-when-nothing-exists) (deterministic post-checks declared in YAML)
- PHP lint on all generated files
- Automated test generation and execution
- Filament namespace auto-fix
- Route verification

**AI-generated code may still contain:**

- Bugs and logic errors
- Security vulnerabilities
- Incorrect business logic
- Incompatible dependencies
- Missing edge case handling

**You are responsible** for reviewing, testing, and validating all generated code before use in any environment — especially production.

## Security Model

Tessera runs AI CLI tools and build commands as subprocesses of itself. Those subprocesses go through a small hardened layer:

- **Shell-free execution.** Subprocesses are spawned with array `argv` — no shell interprets the command line, so AI or user input cannot inject metacharacters (`;`, backticks, `$(...)`).
- **Environment allowlist.** The parent process's environment is filtered before it reaches the child. AI credentials for one provider (e.g., `ANTHROPIC_API_KEY`) never leak into other providers' CLIs or into build tools like composer and npm. Each AI tool sees only its own credentials plus the minimum needed to run.
- **Database credentials.** When configuring MySQL/MariaDB/PostgreSQL, passwords travel through the engine's designated env var (`PGPASSWORD`, `MYSQL_PWD`) — never as argv flags that would appear in `ps` or Task Manager. Database and user names are validated against a strict allowlist before being embedded in `CREATE DATABASE`. `.env` values are safely quoted and escaped.
- **Directory guard.** `tessera new --force` can only remove directories inside the current working directory and never follows symlinks.

### AI Permission Mode (Claude only)

By default, Tessera launches Claude with `--dangerously-skip-permissions` so the installer can scaffold without a prompt on every file write. That grants Claude full filesystem and shell access for the duration of the build — this is what non-interactive scaffolding requires.

If you prefer to approve each Claude action manually, set `TESSERA_SAFE_AI=1`:

```bash
TESSERA_SAFE_AI=1 tessera new my-project
```

Claude will then pause and wait for your approval on each action. The installer fails loudly rather than silently hanging if Claude tries to do something that needs permission.

**Codex and Gemini.** `TESSERA_SAFE_AI` affects only Claude today, because Claude is the only AI CLI Tessera launches with a permission-bypass flag. The others have their own permission models that Tessera does not currently configure:

- **Codex** runs via `codex exec` with its own sandbox (approval-on-request by default). Tessera does not pass `--dangerously-bypass-approvals-and-sandbox`. Whether Codex prompts depends on your Codex version's defaults.
- **Gemini** is invoked without any permission flag; its behaviour is whatever the Gemini CLI default is on your system.

Setting `TESSERA_SAFE_AI=1` has no effect on Codex or Gemini. Per-action approval for those CLIs may land in a future release.

Either way, **you should review AI-generated code before deploying it** — no permission model replaces that.

## Third-Party Services

Tessera may generate code that integrates with third-party services including but not limited to:

- Payment providers (Stripe, CorvusPay, PayPal, etc.)
- Cloud services (AWS, Firebase, Supabase)
- Email services (Mailchimp, Brevo)
- Search engines (Meilisearch, Algolia)

These integrations are scaffolded based on AI interpretation and may require manual configuration, testing, and validation. **Tessera is not affiliated with and makes no guarantees about any third-party service.**

## No Warranty

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR ANY CODE IT GENERATES.

**Use at your own risk.**
