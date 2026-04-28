---
title: "Commercial License Agreement"
description: "Full terms of the Tessera Commercial License — what you get, what you can do with it, term, support, and warranty."
---

# Tessera Commercial License Agreement

**Version 1.0 — effective 2026-04-27**

This document is the legal agreement under which the **Tessera Installer** (referred to here as "the Software") is licensed for **commercial use**. For free non-commercial use, see the [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0).

A signed PDF copy of this agreement is delivered with every commercial purchase. The PDF version and this page are kept in sync; in the event of any discrepancy, the signed PDF prevails.

---

## 1. Definitions

- **"Software"** — the Tessera Installer command-line tool published at [github.com/drnasin/tessera-installer](https://github.com/drnasin/tessera-installer), including its source code, documentation and prompt assets.
- **"Licensor"** — Ante Drnasin, sole copyright holder of the Software, operating as a sole proprietor under Croatian law.
- **"Licensee"** — the natural or legal person identified on the purchase record (the invoice and the activation email) as the buyer of the licence.
- **"Authorized Developer"** — an individual employee, contractor or owner of the Licensee who actually runs the Software on a development machine. The number of Authorized Developers is set by the licence tier.
- **"Generated Output"** — any source code, configuration, prompts, documentation or other artefact produced by running the Software, regardless of which AI model produced it.
- **"Tier"** — one of the licence tiers defined on the [pricing page](/docs/pricing): Solo, Studio, or Enterprise.

## 2. Grant of Licence

Subject to payment of the applicable fee and continued compliance with this agreement, Licensor grants Licensee a **worldwide, non-exclusive, non-transferable, non-sublicensable** licence to:

1. **Install and run** the Software on any number of machines, **provided the Software is only operated by Authorized Developers** as set by the Tier.
2. **Use the Software commercially**, including for paid client work, internal business tools, SaaS products and other revenue-generating activities.
3. **Modify** the source code of the Software for the Licensee's own use. Modified copies remain bound by this agreement and may not be redistributed.
4. **Receive Generated Output** with no royalty or further obligation to Licensor — see Section 5.
5. **Receive updates** to the Software according to the rules in Section 6.

## 3. Restrictions

Licensee shall not:

1. Distribute, sublicense, sell, rent, lease, or host the Software (in whole or in modified form) **as a service or product** to third parties — for example, by exposing it as a hosted "build for me" API or repackaging it as a competing installer.
2. Remove, obscure or alter copyright notices, attributions, or this licence text in the Software.
3. Allow more individuals to use the Software than the Tier permits. If the team grows, the Licensee must upgrade the Tier before the additional developers run the Software.
4. Use the Software to build a product whose **primary purpose** is to compete with Tessera as an AI project generator. Using Tessera to build any other commercial product, including other developer tools, is allowed.
5. Misrepresent the Licensor's role — Generated Output must not claim to be authored, endorsed, supported or warranted by Licensor unless explicitly agreed in writing.

## 4. Tiers and Authorized Developer Count

The Tier and number of Authorized Developers is set on the invoice and the activation email and corresponds to the [pricing page](/docs/pricing) at the time of purchase.

| Tier | Authorized Developers | Typical use |
|---|---|---|
| Solo | 1 | Freelancer, single-person studio |
| Studio | up to 10 | Agency, small product team |
| Enterprise | negotiated | Larger organisations, custom terms |

A "developer machine" is any computer on which the Software is launched against a real (non-test) project. CI machines and one-off evaluation containers used by an Authorized Developer do not count as additional developers.

## 5. Generated Output

Generated Output produced by the Software belongs to the Licensee. **Licensor claims no copyright, royalty, or right of refusal over Generated Output.**

This is intentional and absolute. You can:

- Ship Generated Output to clients without attribution to Tessera.
- Modify, fork, sell, or open-source it.
- Keep it private.

Generated Output is created by third-party AI models acting on the Licensee's prompts and context. Licensor does not warrant that Generated Output is correct, secure, fit for purpose, or free of third-party rights claims. See Section 9 (Warranty) and the [Disclaimer](/docs/disclaimer).

## 6. Term, Renewal and Updates

### 6.1 Term

The licence is sold as an **annual term** of 12 months from the activation date.

### 6.2 Perpetual Fallback

When the annual term ends, Licensee retains a **perpetual right** to continue using the version of the Software that was current at the moment the term ended. No further updates, fixes or releases are granted.

This means: **you never lose access to a working tool because you stopped paying.** You only lose access to *new* releases.

### 6.3 Renewal

A renewal of 12 months may be purchased at the then-current price. Renewal restores the right to receive updates and reset the perpetual fallback to the latest released version.

### 6.4 Updates

During the active term, Licensee is entitled to all releases of the Software — including bug fixes, security patches, new stacks, and new features — distributed through Composer and the GitHub releases page. There is no separate "update channel" or paid SKU.

## 7. Support

Support level is set by the Tier:

| Tier | Support channel | Target response |
|---|---|---|
| Solo | Email, business hours | Best effort, typically within 5 business days |
| Studio | Email + private GitHub issue tracker | Best effort, typically within 2 business days |
| Enterprise | Direct contact, custom SLA | As negotiated in the order form |

Support covers the Software itself: install, run, build flow, errors thrown by Tessera. It does **not** cover:

- Bugs, security issues or behavioural surprises in Generated Output.
- Issues caused by the user's AI CLI tools (Claude Code, Codex, Gemini), AI plan limits, or AI provider outages.
- Custom development work, code review of Licensee projects, or training.

These can be purchased separately under a consulting engagement; ask via the support email.

## 8. Audit

Licensor may, at any time and at its own expense, request a written confirmation of the number of Authorized Developers currently using the Software. Licensee must respond within 30 days. Licensor will not request access to source code, infrastructure, or internal systems — only an honest count.

If an audit reveals more developers than the Tier allows, the Licensee has 30 days to upgrade the Tier and pay the difference. No back-fees, no penalty interest — provided the response is timely and honest.

## 9. Warranty Disclaimer

THE SOFTWARE IS PROVIDED **"AS IS"**, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. THIS DISCLAIMER APPLIES IN FULL TO ANY GENERATED OUTPUT.

In particular, Licensor does not warrant:

- That the Software will run without errors on every supported platform.
- That AI models invoked by the Software will produce correct, secure, complete or non-infringing output.
- That third-party services scaffolded by Generated Output (payment gateways, cloud APIs, email providers, etc.) will function as expected or remain available.
- That the Software is free of vulnerabilities, although it is built and reviewed with reasonable care.

## 10. Limitation of Liability

To the maximum extent permitted by law:

1. Licensor's total liability under this agreement, in aggregate, is limited to **the amount actually paid by Licensee for the licence in the 12 months preceding the claim**.
2. Licensor is not liable for indirect, incidental, special, consequential, exemplary or punitive damages, including loss of profit, loss of data, loss of goodwill, or business interruption — even if Licensor was advised of the possibility of such damages.
3. Licensor is not liable for any damages arising from Generated Output or from any third-party service the Software interacts with.

These limits apply even if a remedy fails of its essential purpose.

## 11. Termination

This licence terminates automatically if the Licensee:

- Materially breaches Section 3 (Restrictions) and fails to cure within 30 days of written notice.
- Initiates litigation alleging the Software infringes a patent or copyright held by the Licensee.

On termination, the Licensee must stop using the Software. Section 5 (Generated Output) survives termination — work already shipped to clients does not need to be recalled. Sections 9, 10 and 12 also survive.

The annual term is not refundable on termination for breach. If Licensor terminates without cause (which Licensor does not currently foresee but reserves the right to in extraordinary circumstances), the unused portion of the annual fee is refunded pro rata.

## 12. Governing Law and Disputes

This agreement is governed by the laws of the **Republic of Croatia**, without regard to its conflict of law provisions.

The parties shall first attempt to resolve any dispute by good-faith negotiation. If negotiation fails after 30 days, the dispute shall be submitted to the **competent court of the city of Split, Republic of Croatia** as the venue of exclusive jurisdiction. This venue clause is for clarity and does not waive any mandatory consumer-protection rights of an EU-based Licensee.

## 13. Assignment

Licensee may not assign this agreement, by operation of law or otherwise, without the prior written consent of the Licensor. As a courtesy, in case of an internal reorganisation, change of company name, or acquisition by an entity that is not a competitor of Tessera, Licensor will normally consent without charge — but consent must still be requested in writing.

## 14. Entire Agreement

This document, together with the invoice and activation email that identifies the Tier and the Authorized Developers, constitutes the **entire agreement** between Licensor and Licensee regarding the Software. It supersedes all prior discussions and proposals, written or oral.

Modifications must be in writing and signed by both parties. Click-through terms or unilateral updates do not modify a purchased licence — only the version of this agreement that was current at the time of purchase applies, until the Licensee voluntarily renews under a newer version.

## 15. Contact

| Purpose | Channel |
|---|---|
| Buy a licence | [Pricing page](/docs/pricing) |
| Licensing questions | <span id="lic-email" style="cursor:pointer; color: var(--vp-c-brand-1); text-decoration: underline;">Click to reveal email</span> |
| Support (after purchase) | Email address provided on the invoice |
| Security report | [github.com/drnasin/tessera-installer/security](https://github.com/drnasin/tessera-installer/security) |

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const el = document.getElementById('lic-email')
  if (el) {
    el.addEventListener('click', () => {
      const u = 'licensing'; const d = 'tessera-ai.net'
      el.innerHTML = '<a href="mai' + 'lto:' + u + '@' + d + '">' + u + '@' + d + '</a>'
    })
  }
})
</script>

---

::: tip Looking for the Noncommercial terms?
This page covers the **commercial** licence. If your use is personal, educational, open-source, non-profit or government, see the [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) — no purchase needed.
:::
