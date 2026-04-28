---
title: YAML stack manifests — How stacks describe themselves
description: Understand how Tessera stacks (Laravel, Node, Static, etc.) are described in YAML, and learn how to author your own.
---

# YAML stack manifests — How stacks describe themselves

Until Sprint 1, every Tessera stack was a giant PHP class with prompts baked in as heredoc strings. Today, every stack is a YAML file in `stacks/` plus a thin lifecycle class.

This guide is for you if you want to:

- Understand what `tessera new --stack=static` will actually do
- Tweak an existing prompt
- Author a new stack (Python/Django, Rust/Axum, anything)

## What is a stack manifest?

A YAML file that describes the **steps** an AI will run, in order, to scaffold a project. Each step is named, has a prompt template, a complexity hint, optional gates (post-checks), optional dependencies, and a few knobs.

The file lives at `stacks/<name>.yaml`. The compiler turns it into a hash-anchored `plan.json`; the executor dispatches each step through the [adapter system](/docs/architecture/adapter-system).

## Anatomy of a manifest

Here is `stacks/static.yaml`, annotated. The same shape applies to `laravel.yaml`, `node.yaml`, `go.yaml`, and `flutter.yaml`.

```yaml
name: static                         # stable identifier — lower-case, no spaces
label: "Static Site (HTML + Tailwind)"
description: "Simple landing pages, portfolios..."
manifest_version: "1"                # schema version. v1 manifests stay valid in v2 readers.

requires:                            # runtime deps checked at preflight
  - node
  - npm

steps:
  - id: scaffold                     # stable — used as dependency target and event_log key
    name: "[1/3] Creating website"   # human-readable, NOT part of plan_hash
    complexity: complex              # simple | medium | complex — drives model selection
    timeout: 1200                    # seconds before the adapter kills the subprocess
    prompt: |
      You are a SENIOR frontend developer ...
      PROJECT: {{description}}
      DESIGN COLORS: {{designColors}}
      ...
    prompt_version: "1"              # bump when you edit the prompt body
    gates:                           # post-checks: did the AI actually do its job?
      - type: exists_any
        severity: hard
        patterns:
          - index.html
          - package.json

  - id: polish
    name: "[2/3] Validating and polishing"
    complexity: medium
    timeout: 120
    skippable: true                  # if this fails, plan continues (don't halt)
    dependencies:
      - scaffold                     # polish runs only after scaffold completes
    prompt: |
      Review the generated static site thoroughly ...
    prompt_version: "1"
```

That's the entire surface. Every field has a purpose; let's walk through them.

## Templates and `{{var}}` substitution

Prompt bodies are **templates**, not literal strings. Anything in `{{double_braces}}` gets substituted at render time from a [`RenderContext`](/docs/architecture/build-trace#rendercontext).

Available variables include `description`, `designStyle`, `designColors`, `langs`, `nodeVersion`, `systemContext`, `memoryContext`, `country`, `shop`, `payments`, and more. The compiler hashes the template **with placeholders intact**, so the same `plan_hash` can render against different contexts and produce different prompts — by design.

### Trusted vs. untrusted variables

There are two classes of variable:

- **Trusted** (`systemContext`, `memoryContext`, `nodeVersion`, `goVersion`, `flutterVersion`, `stackVersions`, `langs`) — Tessera sets these from the host. They get inlined raw.
- **Untrusted** (everything else, especially `description` and `userRequirements`) — these come from the user. Tessera wraps them in delimiters:

```
<<<USER_DATA name="description">>>
A bakery website with online ordering
<<<END_USER_DATA>>>
```

This is **prompt injection mitigation**, not full defence. A malicious project description can't trivially escape the wrapping to issue new instructions. AI tools that respect the delimiter convention treat the contents as data, not commands.

If a template references a variable that doesn't exist in the context, rendering raises an error. Better to fail loudly than ship a hallucinated build.

## Gates — catching "done!" when nothing exists

An AI will happily say "I created your website!" when it created nothing. Gates are post-execution checks that catch this.

```yaml
gates:
  - type: exists_any
    severity: hard
    patterns:
      - index.html
      - package.json
```

This says: after the step finishes, **at least one** of these paths must exist; otherwise the step failed.

### Gate types (Sprint 1)

| Type | Meaning |
|---|---|
| `exists_any` | One of the patterns matches at least one file. |
| `exists_all` | Every pattern matches at least one file. |

Patterns can be literal paths or `*`/`?` globs. `**` is intentionally not supported in v1 (no surprise recursion).

### Severity

| Severity | What happens on fail |
|---|---|
| `hard` | Step is marked failed; plan halts (unless `skippable: true`). |
| `soft` | Step is marked complete; failure logged to events.jsonl as a warning. |

Sprint 2 adds `not_empty`, `contains`, `min_size`, and `command_passes` (e.g., "step passes only if `php -l` succeeds on every changed file").

## Skippable steps — graceful degradation

Real life: enrichment AI calls (a polish pass, a SETUP.md generator) sometimes hit rate limits or fail for transient reasons. You don't want that to abort a 25-minute build that already produced a working site.

```yaml
- id: polish
  skippable: true
  ...
```

When `skippable: true`, a failure logs `step.skip` to events.jsonl and the plan moves on. The core scaffolding step is **not** skippable; everything downstream of it can be.

Rule of thumb: anything that *improves* output is skippable. Anything that *produces* output is not.

## Dependencies — execution order

```yaml
- id: polish
  dependencies:
    - scaffold
```

Steps run in topological order: a step runs only after every step in its `dependencies` list has completed (or skipped). The compiler rejects cycles at compile time.

If you don't list dependencies, steps run in YAML order. List them anyway when there's a real ordering constraint — it documents intent and protects against accidental reordering.

## `prompt_version` — when to bump

You wrote `prompt_version: "1"` and shipped. Now you want to:

- **Fix a typo in the prompt body** → bump to `"2"`. The prompt fingerprint changes; `tessera plan diff` flags it. Reviewers know to look.
- **Reword for clarity (no behaviour change)** → bump to `"2"`. Same reason. Visibility > vanity.
- **Force a re-render without editing the body** (rare; e.g., you upgraded the AI model and want fresh output) → bump to `"2"`. The body is identical but the hash changes, so cached responses are bypassed.
- **Rename the step's human-readable `name` field** → don't bump. `name` is not part of the hash.

## How to add your own stack

Authoring a new stack — say, "Python/Django" — takes two files:

### 1. `stacks/django.yaml`

```yaml
name: django
label: "Django (Python)"
description: "Server-rendered Python web app with Django + Postgres."
manifest_version: "1"

requires:
  - python
  - pip

steps:
  - id: scaffold
    name: "[1/2] Creating Django project"
    complexity: complex
    timeout: 1200
    prompt: |
      You are a senior Django developer ...
      PROJECT: {{description}}
      LANGUAGES: {{langs}}
      ...
    prompt_version: "1"
    gates:
      - type: exists_any
        severity: hard
        patterns:
          - manage.py

  - id: setup_md
    name: "[2/2] SETUP.md"
    complexity: simple
    timeout: 120
    skippable: true
    dependencies: [scaffold]
    prompt: |
      Read the project at {{description}} and write SETUP.md ...
    prompt_version: "1"
```

### 2. `src/Stacks/DjangoStack.php`

A thin lifecycle class, modelled on `StaticStack`:

```php
final class DjangoStack implements StackInterface
{
    public function name(): string { return 'django'; }
    public function label(): string { return 'Django'; }
    public function description(): string { return '...'; }

    public function preflight(): array { /* check python installed */ }

    public function scaffold(string $directory, array $requirements, ToolRouter $router, SystemInfo $system, Memory $memory): bool
    {
        return (new YamlStackRunner)->run(
            directory: $directory,
            stackName: 'django',
            requirements: $requirements,
            router: $router,
            system: $system,
            memory: $memory,
        );
    }

    public function postSetup(string $directory): bool { /* pip install -r */ }
    public function completionInfo(string $directory): array { /* "run: python manage.py runserver" */ }
}
```

Register it with `StackRegistry`. That's it — the YAML drives everything AI-related; the PHP class only handles preflight, post-install, and completion messaging (things too quirky for YAML in v1).

## See also

- [`tessera plan`](/docs/cli/plan) — inspect what your YAML compiles to
- [Build trace & events](/docs/architecture/build-trace) — what gets recorded when steps run
- [Adapter system](/docs/architecture/adapter-system) — how prompts reach an AI tool
