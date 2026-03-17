---
layout: home
title: "Tessera — AI Project Generator"
titleTemplate: false
description: "Tessera is an AI-powered CLI tool that generates complete web projects from a conversation. Describe what you need — AI builds models, themes, admin panels, tests, and more."

hero:
  name: Tessera
  text: Describe it. AI builds it.
  tagline: From a 5-minute conversation to a complete, deployable web app — models, admin panel, tests, and docs included.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/drnasin/tessera-installer

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
<p>One Composer command. Works on Windows, macOS, and Linux. Needs PHP 8.2+ and at least one AI tool (Claude, Gemini, or Codex).</p>
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
<p>AI picks the best tech stack and generates everything — models, theme, admin panel, content, tests. A second AI reviews the output for quality.</p>
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
<div class="feature-icon">🧠</div>
<h3>AI Generates the Entire Project</h3>
<p>Describe your project in plain language. The AI code generator creates models, theme, admin panel, tests, and deployment docs — no boilerplate, no copy-paste.</p>
</div>

<div class="features-grid">
<div class="feature-card">
<div class="feature-icon">🔄</div>
<h3>Smart Cross-Tool AI Routing</h3>
<p>Routes tasks to Claude, Gemini, and Codex intelligently — each step gets the best AI model. Rate limits? Auto-switches to the next available tool.</p>
</div>

<div class="feature-card">
<div class="feature-icon">👥</div>
<h3>AI Peer Review Built In</h3>
<p>A different AI reviews what the first one generated. Two perspectives catch mistakes one would miss — quality assurance without human overhead.</p>
</div>

<div class="feature-card">
<div class="feature-icon">🔁</div>
<h3>Resume on Failure</h3>
<p>Build fails or you press Ctrl+C? Progress is saved. Run the same command — it resumes from where it stopped. No wasted AI tokens.</p>
</div>

<div class="feature-card">
<div class="feature-icon">🏗️</div>
<h3>5 Technology Stacks</h3>
<p>Laravel, Node.js, Go, Flutter, Static — AI picks the best stack for your project or you choose your own.</p>
</div>

<div class="feature-card">
<div class="feature-icon">🛡️</div>
<h3>Self-Healing Builds</h3>
<p>Tests fail? AI fixes them. Syntax errors? Auto-detected and corrected. Wrong namespaces? Auto-resolved. The build keeps going.</p>
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
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
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
  color: var(--vp-c-text-3);
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
