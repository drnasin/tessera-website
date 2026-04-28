---
layout: home
title: "Tessera — AI Project Generator"
titleTemplate: false
description: "Tessera is an AI-powered CLI tool that generates complete web projects from a conversation. Describe what you need — AI builds models, themes, admin panels, tests, and more."

hero:
  name: Tessera
  text: Stop scaffolding. Start shipping.
  tagline: From a 5-minute conversation to a deployable Laravel, Node, Go, Flutter, or static project — built by AI, audited by deterministic quality gates, and traceable down to every prompt and gate.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started
    - theme: alt
      text: See pricing
      link: /docs/pricing

---

<div class="section-divider"></div>

<div class="install-section">

## Install in 10 seconds

```bash
composer global require tessera/installer
tessera new my-project
```

<p class="install-hint">Need PHP and Composer? Follow the <a href="/docs/getting-started">step-by-step setup guide</a>.</p>

</div>

<div class="section-divider"></div>

<div class="how-it-works">

## How It Works

<div class="steps">
<div class="step">
<div class="step-number">1</div>
<h3>Install</h3>
<p>One Composer command. Works on Windows, macOS, and Linux. Needs PHP 8.2+ and at least one AI tool (Claude, Codex, or Gemini).</p>
</div>

<div class="step-arrow">&#8594;</div>

<div class="step">
<div class="step-number">2</div>
<h3>Describe</h3>
<p>Tell AI about the project in plain language. What the client does, which languages, payments, design style. AI asks the right questions.</p>
</div>

<div class="step-arrow">&#8594;</div>

<div class="step">
<div class="step-number">3</div>
<h3>AI Builds</h3>
<p>AI picks the right tech stack and generates the project — models, theme, admin panel, content, tests, deployment docs. Deterministic quality gates verify each step actually produced what it claimed.</p>
</div>

<div class="step-arrow">&#8594;</div>

<div class="step">
<div class="step-number">4</div>
<h3>Ship It</h3>
<p>Get a working project with SETUP.md that tells you exactly how to deploy. Configure API keys, push to production.</p>
</div>
</div>
</div>

<div class="section-divider"></div>

<div class="features-section">

## Why Tessera?

<div class="feature-hero">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg></div>
<h3>AI Generates the Entire Project</h3>
<p>Describe your project in plain language. The AI code generator creates models, theme, admin panel, tests, and deployment docs — no boilerplate, no copy-paste.</p>
</div>

<div class="features-grid">
<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg></div>
<h3>Smart Cross-Tool AI Routing</h3>
<p>Routes each task to the right AI tool and model — Opus for architecture, Sonnet for content, Haiku for setup notes. Rate limit on one? Auto-switches to the next available tool.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
<h3>Quality Gates Built In</h3>
<p>Every step ends with a deterministic post-check declared in YAML — file-existence, syntax, contract checks. No AI grading another AI. The gate either passes or it doesn't, and the result is in events.jsonl forever.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></div>
<h3>Resume on Failure</h3>
<p>Build fails or you press Ctrl+C? Progress is saved atomically. Run the same command — it resumes from where it stopped. Memory-first writes mean no step ever runs twice.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg></div>
<h3>5 Stacks, One Engine</h3>
<p>Laravel, Node, Go, Flutter, Static — every stack lives in a versioned YAML manifest. AI picks the right one or you pass <code>--stack=node</code>. Authoring a sixth means writing one YAML.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
<h3>Self-Healing Builds</h3>
<p>Tests fail? AI fixes them, up to 3 attempts. Skippable enrichment steps don't halt a 25-minute build on a 7-second rate limit. The core scaffolding is never skippable.</p>
</div>
</div>
</div>


<style>
.section-divider {
  border-top: 1px solid var(--vp-c-divider);
  width: 100%;
  margin: 0;
}

.how-it-works {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.how-it-works h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  gap: 0.5rem;
}

.step-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
  font-size: 1.75rem;
  height: 48px;
  margin-top: 1.5rem;
}

.step {
  text-align: center;
  padding: 1.5rem 1rem;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 800;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.step h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.step p {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .steps {
    grid-template-columns: 1fr 1fr;
  }

  .step-arrow {
    display: none;
  }
}

@media (max-width: 480px) {
  .steps {
    grid-template-columns: 1fr;
  }
}

.features-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 2rem;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.feature-hero {
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.feature-hero .feature-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.feature-hero h3 {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.feature-hero p {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 600px;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.features-grid .feature-card {
  flex: 0 1 calc(33.333% - 1rem);
  min-width: 250px;
}

@media (max-width: 768px) {
  .features-grid .feature-card {
    flex: 0 1 calc(50% - 0.75rem);
  }
}

@media (max-width: 480px) {
  .features-grid .feature-card {
    flex: 0 1 100%;
  }
}

.feature-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 0.85rem;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transition: transform 0.25s ease, background 0.25s ease;
}

.feature-icon svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
}

.feature-card:hover .feature-icon {
  transform: scale(1.06);
  background: rgba(249, 115, 22, 0.18);
}

.feature-hero .feature-icon {
  margin: 0 auto 0.85rem;
  width: 56px;
  height: 56px;
  border-radius: 14px;
}

.feature-hero .feature-icon svg {
  width: 30px;
  height: 30px;
}

.feature-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.feature-card p {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.install-section {
  width: 100%;
  padding: 2rem 0;
  text-align: center;
}

.install-section h2 {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.install-section div[class*="language-"] {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.install-hint {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.install-hint a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.install-hint a:hover {
  color: var(--vp-c-brand-2);
}

</style>
