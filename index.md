---
layout: home
title: "Tessera — AI Project Generator"
titleTemplate: false
description: "Tessera is an AI-powered CLI tool that generates complete web projects from a conversation. Describe what you need — AI builds models, themes, admin panels, tests, and more."

hero:
  name: Tessera
  text: Describe it. AI builds it.
  tagline: An AI project generator that builds complete web applications from a single conversation. You describe what the client needs — AI creates models, themes, admin panels, tests, and deployment docs.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/drnasin/tessera-installer

features:
  - icon: 🧠
    title: AI Generates the Entire Project
    details: Describe your project in plain language. The AI code generator creates models, theme, admin panel, tests, and deployment docs — no boilerplate, no copy-paste.
  - icon: 🔄
    title: Smart Cross-Tool AI Routing
    details: Routes tasks to Claude, Gemini, and Codex intelligently — each step gets the best AI model. Rate limits? Auto-switches to the next available tool.
  - icon: 👥
    title: AI Peer Review Built In
    details: A different AI reviews what the first one generated. Two perspectives catch mistakes one would miss — quality assurance without human overhead.
  - icon: 🔁
    title: Resume on Failure
    details: Build fails or you press Ctrl+C? Progress is saved. Run the same command — it resumes from where it stopped. No wasted AI tokens.
  - icon: 🏗️
    title: 5 Technology Stacks
    details: "Laravel, Node.js, Go, Flutter, Static — AI picks the best stack for your project or you choose your own."
  - icon: 🛡️
    title: Self-Healing Builds
    details: Tests fail? AI fixes them. Syntax errors? Auto-detected and corrected. Wrong namespaces? Auto-resolved. The build keeps going.
---

## Install in 10 seconds

```bash
composer global require tessera/installer
tessera new my-project
```

<div class="how-it-works">

## How It Works

<div class="steps">
<div class="step">
<div class="step-number">1</div>
<h3>Install</h3>
<p>One Composer command. Works on Windows, macOS, and Linux. Needs PHP 8.2+ and at least one AI tool (Claude, Gemini, or Codex).</p>
</div>

<div class="step">
<div class="step-number">2</div>
<h3>Describe</h3>
<p>Tell AI about the project in plain language. What the client does, which languages, payments, design style. AI asks the right questions.</p>
</div>

<div class="step">
<div class="step-number">3</div>
<h3>AI Builds</h3>
<p>AI picks the best tech stack and generates everything — models, theme, admin panel, content, tests. A second AI reviews the output for quality.</p>
</div>

<div class="step">
<div class="step-number">4</div>
<h3>Ship It</h3>
<p>Get a working project with SETUP.md that tells you exactly how to deploy. Configure API keys, push to production.</p>
</div>
</div>
</div>

<style>
.how-it-works {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.how-it-works h2 {
  text-align: center;
  margin-bottom: 2.5rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
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
}

@media (max-width: 480px) {
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
