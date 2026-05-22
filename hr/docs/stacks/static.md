---
title: "Static Stack"
description: "Tessera generira statičke stranice s HTML-om, Tailwind CSS-om i Alpine.js-om. SEO optimizirano, spremno za deploy na Netlify, Vercel ili GitHub Pages."
---

# Static Stack (HTML + Tailwind)

Tesserin AI generator projekata gradi profesionalne statičke stranice — landing stranice, portfelje, event stranice — bez potrebe za backendom.

## Što se generira

- HTML5 stranice sa semantičkom strukturom
- Tailwind CSS za svo stiliziranje
- Alpine.js za interaktivnost (mobilni izbornik, accordioni, tabovi)
- Vite za build i razvoj
- SEO optimizirano (meta tagovi, OG tagovi, JSON-LD)
- Kontaktna forma (Formspree ili Netlify Forms)
- Deploy konfiguracije (netlify.toml + vercel.json)
- SETUP.md s uputama za deploy

## Kad AI bira ovaj stack

Tessera preporučuje Static kad opišeš:
- Jednostavnu landing stranicu ili portfelj
- Event ili kampanjsku stranicu
- Coming-soon stranicu
- Bez potrebe za backendom ili bazom podataka
- Brze jednokratne stranice

## Primjer outputa

```
my-site/
├── index.html              # Početna stranica s heroem, značajkama, CTA
├── about.html              # O nama stranica
├── contact.html            # Kontakt s formom
├── src/
│   ├── style.css           # Tailwind importi + custom stilovi
│   └── main.js             # Alpine.js init
├── package.json            # Vite + Tailwind
├── vite.config.js          # Multi-page konfiguracija
├── netlify.toml            # Netlify deploy konfiguracija
├── vercel.json             # Vercel deploy konfiguracija
├── SETUP.md                # Vodič za deploy
└── .env.example            # Formspree ključ (ako ima kontaktna forma)
```

## Što ga čini profesionalnim

AI piše kao copywriter, ne kao developer:
- Privlačni naslovi i value propositions
- Realistični testimonijali s imenima karakterističnima za tržište
- Pravilna tipografska hijerarhija i razmaci
- Mobile-first responzivni dizajn
- WCAG AA pristupačnost (alt tagovi, focus stanja, kontrast)

## Nakon generiranja

```bash
cd my-site
npm install
npm run dev       # Pregled na localhost:5173
npm run build     # Build za produkciju (dist/)
```

Deployaj `dist/` na Netlify, Vercel ili GitHub Pages.

## Kako je build opisan

Static AI pipeline živi na `stacks/static.yaml` (3 koraka: `scaffold`, `polish`, `setup_md`). Najmanji je manifest — odlično polazište ako hoćeš pisati vlastiti stack.

```bash
tessera plan compile stacks/static.yaml
tessera plan show
```

Vidi [YAML stack manifeste](/hr/docs/architecture/yaml-manifests) za opis polje po polje.

## Povezani stackovi

Treba ti više od statičke stranice? Tessera podržava i [Laravel](/hr/docs/stacks/laravel) za sadržajem upravljane web stranice, [Node.js](/hr/docs/stacks/nodejs) za JavaScript full-stack, [Go](/hr/docs/stacks/go) za visoko-performantne backende i [Flutter](/hr/docs/stacks/flutter) za mobilne aplikacije.
