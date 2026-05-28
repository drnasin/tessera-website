---
title: "Tessera Licence — PolyForm Noncommercial & Commercial Tiers"
description: "Tessera is source-available — free for noncommercial use under PolyForm Noncommercial 1.0.0, paid for commercial work. Solo, Studio, and Enterprise tiers."
---

# License

Tessera is **source-available**, not open source. The full source code lives on [GitHub](https://github.com/drnasin/tessera-installer) — anyone can read it, fork it, contribute. But the right to *use* Tessera depends on what you use it for.

::: tip TL;DR
- **Personal, learning, OSS, non-profit, government → free.** PolyForm Noncommercial 1.0.0.
- **Client work, SaaS, internal for-profit tools → paid.** Solo / Studio / Enterprise tier — see [Pricing](/docs/pricing).
- **Generated code is yours** in both cases.
:::

## Why "source-available" and not "open source"

The Open Source Initiative reserves the term *open source* for licences that allow commercial use without restriction. PolyForm Noncommercial does not — it explicitly excludes commercial use. Calling it "open source" would be both factually wrong and insulting to people who actually maintain OSS licences.

So we use the accurate phrase: **source-available**. You get to read it, fork it, build with it personally; you pay for the right to deploy it commercially. We think that's a fair trade and we say so plainly.

## Two lanes

| | Noncommercial — free | Commercial — paid |
|---|---|---|
| **Personal projects, hobby sites** | ✓ | ✓ |
| **Learning, research, university** | ✓ | ✓ |
| **Open-source contribution** | ✓ | ✓ |
| **Non-profits, schools, government** | ✓ | ✓ |
| **Client work for pay (agency / freelance)** | ✗ | ✓ |
| **SaaS or revenue-generating product** | ✗ | ✓ |
| **Internal tools for a for-profit company** | ✗ | ✓ |
| Source access | ✓ | ✓ |
| Contribute upstream | ✓ | ✓ |
| Generated code is yours | ✓ | ✓ |
| Updates | latest published version | guaranteed during term |
| Support | GitHub issues, community | tier-defined |
| Written grant for audits | ✗ | ✓ |
| Cost | €0 | from €249 / yr |

Full terms: [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) · [Commercial License Agreement](/docs/commercial-license).

## Frequent questions

::: details Can I use Tessera to build my personal blog?
Yes — personal use is always free. You don't owe anyone anything.
:::

::: details Can I use it to learn Laravel/Filament?
Yes — educational use is free, including bootcamps and university courses.
:::

::: details Can I build a client's e-commerce site with it?
That is commercial use — you need a [paid licence](/docs/pricing). Even one paying client triggers the commercial tier.
:::

::: details Can I use it inside my employer's company on internal tools?
If your employer is a for-profit company and the tool is part of how it makes money — yes, commercial. The Studio tier is the usual fit.
:::

::: details Can I contribute to Tessera without a license?
Yes — open-source contributions don't require a licence. Pull requests, issues, docs improvements — all free, and welcome.
:::

::: details What about the generated code?
**It is yours**, in both lanes. The licence covers the Tessera installer itself — not the projects it creates. You can sell, fork, open-source, or keep private anything Tessera generates. See [Commercial License § 5](/docs/commercial-license#_5-generated-output).
:::

::: details Can I redistribute or repackage Tessera?
No — neither lane allows redistributing Tessera as part of another product or as a hosted service. That's an OEM/redistribution arrangement; talk to us via [Enterprise contact](/docs/pricing#commercial-tiers).
:::

::: details I bought a Solo licence and now my team is 5 people. What do I do?
Upgrade to Studio. The difference is prorated for the remaining months. There's no penalty for outgrowing a tier — only for ignoring it.
:::

::: details Does Tessera "phone home" to verify my licence?
No. There is no licence server, no telemetry by default, no dial-back. The licence is honour-based. We may ask you, in writing, to confirm developer counts during a friendly audit (Commercial License § 8) — but the CLI itself does not check.
:::

## Buying a commercial licence

[See the Pricing page →](/docs/pricing)

For licensing questions: <span id="contact-email" style="cursor:pointer; color: var(--vp-c-brand-1); text-decoration: underline;">Click to reveal email</span>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const el = document.getElementById('contact-email')
  if (el) {
    el.addEventListener('click', () => {
      const u = 'licensing'; const d = 'tessera-ai.net'
      el.innerHTML = '<a href="mai' + 'lto:' + u + '@' + d + '">' + u + '@' + d + '</a>'
    })
  }
})
</script>

## Full legal text

- [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) — applies to noncommercial use.
- [Tessera Commercial License Agreement](/docs/commercial-license) — applies once you purchase a tier.
