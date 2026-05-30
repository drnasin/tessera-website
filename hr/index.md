---
layout: home
title: "Tessera — AI generator projekata"
titleTemplate: false
description: "Tessera je CLI alat koji generira kompletne web projekte iz razgovora. Opišeš što trebaš — AI gradi modele, teme, admin panele, testove i sve ostalo."

hero:
  name: Tessera
  text: Manje scaffoldinga. Više isporuke.
  tagline: Opišeš projekt u petominutnom razgovoru. AI gradi kompletan, spreman-za-deploy Laravel, Node, Go, Flutter ili statički projekt — a svaki korak se automatski provjerava, pa možeš vjerovati onome što izađe.
  actions:
    - theme: brand
      text: Kreni
      link: /hr/docs/getting-started
    - theme: alt
      text: Cijene
      link: /hr/docs/pricing

---

<div class="section-divider"></div>

<div class="install-section">

## Instalacija za 10 sekundi

```bash
composer global require tessera/installer
tessera new moj-projekt
```

<p class="install-hint">Nemaš PHP i Composer? Slijedi <a href="/hr/docs/getting-started">vodič za postavljanje korak po korak</a>.</p>

</div>

<div class="section-divider"></div>

<div class="how-it-works">

## Kako radi

<div class="steps">
<div class="step">
<div class="step-number">1</div>
<h3>Instaliraj</h3>
<p>Jedna Composer naredba. Radi na Windowsu, macOS-u i Linuxu. Potrebni su PHP 8.4+ i barem jedan AI alat (Claude, Codex ili Gemini).</p>
</div>

<div class="step-arrow">&#8594;</div>

<div class="step">
<div class="step-number">2</div>
<h3>Opiši</h3>
<p>Opiši projekt AI-ju normalnim riječima. Što klijent radi, koji jezici, plaćanje, stil dizajna. AI sam pita što mu treba.</p>
</div>

<div class="step-arrow">&#8594;</div>

<div class="step">
<div class="step-number">3</div>
<h3>AI gradi</h3>
<p>AI bira pravi tech stack i generira projekt — modele, temu, admin panel, sadržaj, testove i dokumentaciju za deploy. Deterministički kontrolni prolazi provjeravaju je li svaki korak zaista dao što je obećao.</p>
</div>

<div class="step-arrow">&#8594;</div>

<div class="step">
<div class="step-number">4</div>
<h3>Isporuči</h3>
<p>Dobivaš radni projekt s SETUP.md-om koji ti točno govori kako deployati. Postavi API ključeve, deployaj na produkciju.</p>
</div>
</div>
</div>

<div class="section-divider"></div>

<div class="features-section">

## Zašto Tessera?

<div class="feature-hero">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg></div>
<h3>Cijeli projekt, ne isječci</h3>
<p>Većina AI alata daje ti jednu datoteku po jednu. Tessera generira cijeli projekt — modele, temu, admin panel, testove i deploy dokumentaciju — povezane i spremne za pokretanje.</p>
</div>

<div class="features-grid">
<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg></div>
<h3>Pametno usmjeravanje AI poziva</h3>
<p>Svaki zadatak šalje pravom AI alatu i modelu — Opus za arhitekturu, Sonnet za sadržaj, Haiku za upute za postavljanje. Ako AI alat dosegne rate limit, automatski prebacuje na sljedeći dostupni.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
<h3>Ugrađene provjere kvalitete</h3>
<p>Svaki korak provjerava automatska kontrola — ne drugi AI koji nagađa. Ili prolazi ili se build zaustavlja, a svaki rezultat se bilježi pa točno vidiš što se dogodilo.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></div>
<h3>Nastavak nakon greške</h3>
<p>Build pao ili si pritisnuo Ctrl+C? Pokreni istu naredbu i nastavlja točno gdje je stao — nijedan korak se ne pokreće dvaput, ništa se ne gubi.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg></div>
<h3>5 stackova, jedan engine</h3>
<p>Laravel, Node, Go, Flutter, Static — AI bira pravi za tvoj projekt, ili ga sam odabereš s <code>--stack=node</code>. Isti workflow, svaki stack.</p>
</div>

<div class="feature-card">
<div class="feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
<h3>Self-healing buildovi</h3>
<p>Testovi padaju? AI ih popravlja i ponavlja, do 3 puta. Kratki rate limit neće srušiti 25-minutni build — sporedni koraci mogu pričekati, a temeljni scaffold uvijek prođe do kraja.</p>
</div>
</div>
</div>
