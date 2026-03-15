---
title: Resume & Recovery
---

# Resume & Recovery

## How It Works

Tessera saves progress to `.tessera/state.json` after every completed step. If the build fails, times out, or you press Ctrl+C — progress is saved.

Run the same command again:

```
$ tessera new my-shop

Found previous installation (stack: laravel, status: in_progress)
  Completed steps: 4
    ✓ packages
    ✓ filament
    ✓ configs
    ✓ structure

[0] Resume — continue from where it stopped
[1] Start fresh — overwrite everything
[2] Abort
```

Resume skips all completed steps and continues from where it left off. No need to re-describe the project or re-select the stack.

## Atomic State

State writes use a temp file + rename pattern. If the process crashes mid-write, the state file stays intact — no corruption.

## Database Setup on Resume

When resuming a project that uses MySQL or PostgreSQL, Tessera asks for your database credentials again, tests the connection, and continues. If the database can't be reached, it falls back to SQLite.
