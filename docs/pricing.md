---
title: "Pricing"
description: "Tessera is free for personal and noncommercial use. Commercial licences come in three tiers — Solo, Studio, and Enterprise — with annual term plus perpetual fallback."
---

# Pricing

Tessera is **source-available**, not open source. It is free for personal projects, learning, open-source contribution, education, non-profits and government use under the [PolyForm Noncommercial License](/docs/license).

If you build for paying clients, run a SaaS, or use Tessera inside a for-profit company, you need a **commercial licence**.

## What you actually get from a build

A licence is an abstraction. Here's what `tessera new` produces — every tier, every stack:

<div class="deliverables">

<div class="deliverable-col">

**Code**

- Project skeleton (Laravel / Node / Go / Flutter / Static)
- Domain models, migrations, factories, seeders
- Authentication scaffold where applicable
- Admin panel (Filament for Laravel; equivalent dashboards on others)
- Frontend theme — Tailwind, custom palette, mobile-responsive
- Realistic seeded content in your project's languages — no lorem ipsum
- Passing test suite (PHPUnit / Vitest / Go testing / flutter test)

</div>

<div class="deliverable-col">

**Operations**

- `SETUP.md` — junior-friendly deploy guide with every env var explained and where to obtain it
- `composer audit` / `npm audit` clean (Sprint 2 gate)
- Git initialised with first commit
- `.env.example` with every key Tessera generated
- Production checklist: TLS, backups, queue workers, monitoring

</div>

<div class="deliverable-col">

**Audit & traceability**

- `.tessera/plan.json` — versioned, hash-anchored execution plan
- `.tessera/events.jsonl` — append-only build trace, every AI call recorded
- `.tessera/state.json` — resumable build state
- Three hashes per step (template, context, rendered prompt) for replay
- Every step's gates pass/fail captured forever

</div>

</div>

<p class="deliverables-foot">
See an annotated example: <a href="/docs/case/bakery">a Croatian bakery, generated in 9 minutes 39 seconds</a>.
</p>

## Commercial tiers

<div class="pricing-grid">

<div class="pricing-card">
<div class="tier-name">Solo</div>
<div class="tier-tagline">Freelancer · Single-person studio</div>
<div class="tier-price">
  <span class="amount">€249</span>
  <span class="cadence">/ year</span>
</div>
<ul class="tier-features">
<li><strong>1 Authorized Developer</strong></li>
<li>Unlimited client projects</li>
<li>All stacks (Laravel, Node, Go, Flutter, Static)</li>
<li>1 year of updates</li>
<li><strong>Perpetual fallback</strong> — keep using the last version forever</li>
<li>Email support, business hours</li>
</ul>
<a href="mailto:licensing@tessera-ai.net?subject=Tessera%20Solo%20Licence&body=I%20would%20like%20to%20purchase%20a%20Solo%20licence.%0A%0AName%2Fbusiness%3A%20%0AInvoice%20address%3A%20%0AVAT%20%2F%20OIB%20(if%20applicable)%3A%20" class="tier-cta">Buy Solo</a>
</div>

<div class="pricing-card pricing-card-featured">
<div class="tier-badge">Most popular</div>
<div class="tier-name">Studio</div>
<div class="tier-tagline">Agency · Small product team</div>
<div class="tier-price">
  <span class="amount">€799</span>
  <span class="cadence">/ year</span>
</div>
<ul class="tier-features">
<li><strong>Up to 10 Authorized Developers</strong></li>
<li>Unlimited client projects</li>
<li>All stacks</li>
<li>1 year of updates</li>
<li><strong>Perpetual fallback</strong> — keep using the last version forever</li>
<li>Priority email + private GitHub issue tracker</li>
<li>Early access to release candidates</li>
</ul>
<a href="mailto:licensing@tessera-ai.net?subject=Tessera%20Studio%20Licence&body=I%20would%20like%20to%20purchase%20a%20Studio%20licence.%0A%0ACompany%3A%20%0AInvoice%20address%3A%20%0AVAT%20%2F%20OIB%3A%20%0AExpected%20number%20of%20developers%20(max%2010)%3A%20" class="tier-cta tier-cta-featured">Buy Studio</a>
</div>

<div class="pricing-card">
<div class="tier-name">Enterprise</div>
<div class="tier-tagline">Larger teams · Custom needs</div>
<div class="tier-price">
  <span class="amount-text">Custom</span>
</div>
<ul class="tier-features">
<li>Negotiated developer count</li>
<li>Custom SLA &amp; direct contact</li>
<li>Private stack registry (roadmap)</li>
<li>Audit log retention &amp; compliance review (roadmap)</li>
<li>White-label option for resellers</li>
<li>Optional onboarding workshop</li>
</ul>
<a href="mailto:licensing@tessera-ai.net?subject=Tessera%20Enterprise%20Inquiry&body=Tell%20us%20about%20your%20team%3A%0A%0ACompany%3A%20%0ATeam%20size%3A%20%0APrimary%20use%20case%3A%20%0ASpecific%20requirements%20(SLA%2C%20on-prem%2C%20etc.)%3A%20" class="tier-cta">Contact us</a>
</div>

</div>

<div class="vat-note">
Prices are in EUR and exclude VAT. Croatian businesses receive an OIB-based invoice. EU businesses outside Croatia may use the reverse-charge mechanism if a valid VAT ID is supplied. Invoices outside the EU follow the supplier's home rules.
</div>

## What's the same across all paid tiers

| Feature | Solo · Studio · Enterprise |
|---|---|
| Use the Software for **commercial work** | ✓ |
| All current and future **stacks** | ✓ |
| **Generated Output** is yours, royalty-free | ✓ |
| **Updates** during the active term | ✓ |
| **Perpetual fallback** to the last released version | ✓ |
| Source code access via the GitHub repository | ✓ |
| BYOK — uses your own AI CLI tools and plans | ✓ |

Tessera **never holds your AI tokens** or routes calls through our infrastructure. The CLI runs the AI tools you have installed against your own subscription. We do not bill, meter, or relay AI usage. See [AI Routing](/docs/ai-routing) and the [Disclaimer](/docs/disclaimer).

## Compare with the free tier

| | **Noncommercial (free)** | **Commercial (paid)** |
|---|---|---|
| Personal projects | ✓ | ✓ |
| Learning, OSS, school | ✓ | ✓ |
| **Client work for pay** | ✗ | ✓ |
| **Internal for-profit tools** | ✗ | ✓ |
| **SaaS &amp; revenue products** | ✗ | ✓ |
| Updates | latest published version | guaranteed during term |
| Support | community (GitHub issues) | tier-defined |
| Audit confidence | none | written grant |

Read the full [Commercial License Agreement](/docs/commercial-license) before purchase.

## How the purchase works (today)

The Day-0 flow is intentionally manual. We invoice and confirm by email, no third-party checkout in the middle.

1. **Click a Buy button.** Your email client opens with the right tier in the subject line.
2. **Reply with your business details** — name, invoice address, OIB / VAT ID if applicable, number of developers.
3. **Receive the invoice.** PDF, payable by SEPA or wire. EU customers get a reverse-charge invoice if eligible.
4. **Pay and receive activation.** A signed PDF copy of the [Commercial License Agreement](/docs/commercial-license) and an activation email naming the Authorized Developers.

A self-service Stripe checkout is on the roadmap; until then the manual flow keeps things deliberate and lets us answer any compliance question before money moves.

## FAQ

::: details Is Tessera open source?
**No, but the source is published.** Tessera is *source-available*: anyone can read the code, fork it, and contribute. But the right to **use** Tessera commercially is gated by a paid licence. Personal and noncommercial use is free under [PolyForm Noncommercial](https://polyformproject.org/licenses/noncommercial/1.0.0).
:::

::: details Who owns the code Tessera generates?
**You do.** The [Commercial License](/docs/commercial-license) Section 5 says Licensor claims no copyright or royalty over Generated Output. Ship it however you want.
:::

::: details I'm a freelancer who sometimes does pro-bono work. Which licence?
A Solo licence covers everything you do, including pro-bono — the licence is per-developer, not per-project. If your only commercial activity is one client a year, that one client requires the paid tier.
:::

::: details What happens if I don't renew?
You keep using the version of Tessera you already have, **forever**. You just won't receive new features, new stacks, or future bug fixes until you renew. The CLI will not stop working, phone home, or refuse to scaffold.
:::

::: details We grew from 4 to 12 developers mid-year. What now?
You upgrade to Enterprise (or a custom Studio overage). We'll prorate the difference for the remaining months of your annual term. There is no penalty for outgrowing a tier — only for ignoring it.
:::

::: details Can I trial Tessera before paying?
Yes. Run it noncommercially on a personal project as long as you like. The Software is identical between tiers; the licence is the difference.
:::

::: details Refund policy?
**14-day no-questions-asked** for the Solo tier. Studio and Enterprise refunds are case-by-case but we have always agreed when asked in good faith within 30 days. Refunds are not available after the licence has been used to generate code for a paying client — Generated Output is yours either way and that boundary is what the licence pays for.
:::

::: details Why is Tessera not on a SaaS pricing page?
Because Tessera does not run AI on our infrastructure. You bring your own Claude / Codex / Gemini subscription. The price you pay is for the orchestrator — quality gates, prompt library, contract tests, resume — not for tokens. See [AI Routing](/docs/ai-routing).
:::

::: details Can I redistribute Tessera bundled with my own product?
Not under the standard tiers. That's an OEM scenario — get in touch via the Enterprise contact and we'll write a separate redistribution rider.
:::

::: details Will pricing change?
Probably, as the orchestrator becomes more capable. **Existing licences keep their original price** for renewal as long as renewal is continuous. New tiers may be added, but you will not be moved to a more expensive plan against your will.
:::

<style>
.deliverables {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 0.5rem;
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.deliverable-col {
  font-size: 0.93rem;
}

.deliverable-col strong {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.7rem;
}

.deliverable-col ul,
.deliverable-col p {
  margin: 0;
}

.deliverable-col ul {
  padding: 0;
  list-style: none;
}

.deliverable-col li {
  position: relative;
  padding: 0.32rem 0 0.32rem 1.1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
  border-top: 1px solid var(--vp-c-divider-light, rgba(128, 128, 128, 0.08));
}

.deliverable-col li:first-child {
  border-top: none;
}

.deliverable-col li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.7rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0.7;
}

.deliverables-foot {
  margin: 0.6rem 0 2rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.deliverables-foot a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-style: normal;
  font-weight: 500;
}

@media (max-width: 900px) {
  .deliverables {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin: 2.5rem 0 1rem;
  /* Push the grid out of the narrow VitePress doc column so each card has
     real breathing room. The negative margins centre the wider grid back
     under the page heading. */
  width: calc(100% + 12rem);
  margin-left: -6rem;
  margin-right: -6rem;
}

@media (max-width: 1280px) {
  .pricing-grid {
    width: calc(100% + 4rem);
    margin-left: -2rem;
    margin-right: -2rem;
  }
}

@media (max-width: 900px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}

.pricing-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 2.25rem 1.75rem 2rem;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

.pricing-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.pricing-card-featured {
  border-color: var(--vp-c-brand-1);
  border-width: 2px;
  /* Extra top padding so the absolutely-positioned "Most popular" badge
     never overlaps the tier name. */
  padding-top: 3rem;
}

.tier-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.3rem 0.95rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 4px 12px -4px rgba(249, 115, 22, 0.5);
}

.tier-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.tier-tagline {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.tier-price {
  margin-bottom: 1.5rem;
}

.tier-price .amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.tier-price .amount-text {
  font-size: 2rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.tier-price .cadence {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-left: 0.25rem;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
}

.tier-features li {
  padding: 0.4rem 0;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider-light, rgba(128, 128, 128, 0.08));
}

.tier-features li:last-child {
  border-bottom: none;
}

.tier-features strong {
  color: var(--vp-c-text-1);
}

.tier-cta {
  display: block;
  text-align: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none !important;
  transition: background 0.2s, transform 0.1s;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: transparent;
}

.tier-cta:hover {
  background: var(--vp-c-brand-soft, rgba(100, 108, 255, 0.08));
  transform: translateY(-1px);
}

.tier-cta-featured {
  background: var(--vp-c-brand-1);
  color: white !important;
}

.tier-cta-featured:hover {
  background: var(--vp-c-brand-2);
  color: white !important;
}

.vat-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 3rem;
  font-style: italic;
}
</style>
