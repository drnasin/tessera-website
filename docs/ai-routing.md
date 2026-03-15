---
title: AI Routing
---

# Intelligent Cross-Tool Routing

Tessera doesn't just use one AI tool — it routes each task to the **best tool and model** for the job.

## How It Works

| Complexity | Default | Fallback chain |
|---|---|---|
| **Simple** | Claude Haiku | Gemini Flash → Codex |
| **Medium** | Claude Sonnet | Gemini Pro → Claude Haiku → Gemini Flash |
| **Complex** | Claude Opus | Gemini Pro → Claude Sonnet → Gemini Flash |

A single build might use Claude Opus for database architecture, Gemini Flash for SETUP.md, and Claude Sonnet for tests.

## Plan-Aware Routing

During setup, Tessera asks about your AI subscription plans:

```
What AI plans do you have?
  Claude plan: [Max (unlimited) / Pro / Free]
  Codex plan:  [Plus (ChatGPT Plus) / Free]
  Gemini plan: [Pro (Google One AI Premium) / Free]
```

| Plan tier | Examples | Routing behavior |
|---|---|---|
| **Unlimited** | Claude Max | Preferred for everything |
| **Generous** | Claude Pro, Codex Plus | Preferred but balanced |
| **Limited** | Free tiers | Fallback only |

With Claude Max, even simple tasks use Claude (Haiku) — no reason to route elsewhere when it's free.

## Rate Limit Awareness

If a tool hits rate limits mid-build, Tessera:
1. Detects the error (13 different patterns recognized)
2. Marks the tool with a 2-minute cooldown
3. Switches to the next tool in the fallback chain
4. Shows you what happened: `claude rate-limited (cooldown: 120s). Trying next tool...`

No manual intervention needed.

## AI Peer Review

After generating the frontend theme and admin panel, a **different AI** reviews the output:

```
✓ Designing frontend theme           (claude opus)
⏳ Peer review: frontend theme
  Reviewer: gemini (gemini-2.0-flash)
  Review found 2 issue(s) — applying fixes...
  ✓ Review fixes applied (2 issues)
```

- Multiple tools: different tool reviews (Claude generates → Gemini reviews)
- Single tool: lighter model reviews (Opus generates → Haiku reviews)
- Cost: 1 cheap AI call per reviewed step

## Usage Summary

At the end of each build, Tessera shows how many calls each tool handled:

```
AI usage: claude: 5 calls (2 opus, 2 sonnet, 1 haiku) | gemini: 2 calls (2 flash)
```

## Environment Variables

Most users don't need these — the installer asks interactively. For automation:

```bash
TESSERA_CLAUDE_PLAN=max       # max | pro | free
TESSERA_CODEX_PLAN=plus       # plus | free
TESSERA_GEMINI_PLAN=free      # pro | free
TESSERA_TOOL_PREFERENCE=gemini,claude,codex  # custom order
TESSERA_TOOL_EXCLUDE=codex    # never use this tool
```
