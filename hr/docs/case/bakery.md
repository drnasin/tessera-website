---
title: "Studija slučaja — Pekarnica Ognjište"
description: "Anatomija stvarnog Tessera builda: hrvatska pekarska stranica generirana za 9 minuta i 39 sekundi, s punim tragom eventa, AI pozivima, gate-ovima i rezultirajućim kodom."
---

# Pekarnica Ognjište — anatomija 9-minutnog builda

Ovo je stvarno `tessera new` pokretanje. Fixture je ušao, AI je radio, i s druge strane je izašla radna Laravel + Filament stranica. U nastavku je točno što se dogodilo — prompt, AI pozivi, gate-ovi, vremena, trošak.

::: tip Zašto studija slučaja
Demo-e je lako lažirati. Ova stranica je trag builda koji se stvarno izvršio uz live AI alate. Svaki broj — trajanje, AI alat, rezultat gate-a — dolazi direktno iz `.tessera/events.jsonl` projekta.
:::

## Što je korisnik upisao

```bash
tessera new pekarnica-ognjiste --stack=static --requirements-fixture=req.json
```

```json
{
  "description": "Mala obiteljska pekara u Splitu od 1968. Kruh od divljeg kvasca, kroasani s francuskim maslacem, tradicionalna dalmatinska peciva. Tri lokacije: Riva, Bačvice, Žnjan. Catering za vjenčanja.",
  "languages": ["hr"],
  "design_style": "warm and rustic, hand-drawn feel, natural textures",
  "design_colors": "cream, warm brown, terracotta, hint of sage green",
  "needs_shop": false,
  "country": "HR"
}
```

To je sve. Nikakva dodatna konfiguracija. Tessera je sve ostalo prepustila AI-ju.

## Što je izašlo

Statički projekt spreman za `npm run dev` i deploy na Netlify ili Vercel:

```text
pekarnica-ognjiste/
├── index.html              # Hrvatski sadržaj, stvarne splitske lokacije,
│                           # JSON-LD Bakery schema, OG/Twitter cards,
│                           # inline SVG favicon
├── package.json            # Vite 6 + Tailwind v4 + Alpine.js
├── postcss.config.js
├── tailwind.config.js      # topla zemlja-tonska paleta izvedena iz fixture-a
├── netlify.toml
├── vercel.json
├── src/
│   ├── style.css           # Tailwind importi + par custom CSS varijabli
│   └── main.js             # Alpine.js init + kontroler mobilnog izbornika
├── dist/                   # produkcijski build (Vite ga je već pokrenuo)
└── SETUP.md                # vodič za deploy prilagođen juniorima
```

AI je sam nazvao pekarnicu ("Ognjište" — hrvatsko za "ognjište"). Spomenuo je stvarne splitske lokacije (Riva, Bačvice, Žnjan). Odabrao Fraunces + Nunito + Caveat kao type stack (topli serif + humanistički body + ručno pisani naglasak — točno prema opisu). Koristio `picsum.photos` placeholder-e ispravnih dimenzija za hero, galeriju i OG sliku.

## Trag builda

Tri koraka, tri AI poziva, tri različita modela — `tessera plan show` iz pokretanja:

| # | Korak | Složenost | Model | Trajanje | Gate |
|---|---|---|---|---|---|
| 1 | `scaffold` | complex | claude-opus-4-20250514 | 8m 25s | ✓ `exists_any [index.html, package.json]` (hard) |
| 2 | `polish` | medium | claude-sonnet-4-20250514 | 7s ⚠ | — (preskočeno, `skippable: true`) |
| 3 | `setup_md` | simple | claude-haiku-4-5-20251001 | 1m 5s | ✓ `exists_any [SETUP.md]` (soft) |

**Ukupno trajanje:** 9 minuta 39 sekundi.

Polish korak vratio je ne-nulti exit za 7 sekundi — gotovo sigurno prolazni rate limit na Sonnet besplatnoj razini. Jer je YAML manifest deklarirao `skippable: true` na tom koraku, build je prešao ravno na `setup_md` i završio. Preskočeni polish bio bi prolaz code-reviewa nad scaffold outputom; bez njega, scaffold je i dalje pravi produkcijski spreman site.

## Kako je izgledao event log

Skraćeno na ključne trenutke — svaki event ima stabilan `trace_id` pa možeš grep-ati kroz datoteku:

```json
{"type":"build.start","payload":{"stack":"static","plan_hash":"a53a0aa050046435...","step_count":3}}
{"type":"step.start","payload":{"step_id":"scaffold","model_resolved":"claude-opus-4-20250514","template_fingerprint":"e468b96d03e9...","rendered_prompt_hash":"fb7460c9c408..."}}
{"type":"ai.call.start","payload":{"adapter":"claude","timeout":1200}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":true,"duration_ms":505708,"output_size":1728}}
{"type":"gate.pass","payload":{"step":"scaffold","gate":"exists_any","severity":"hard","message":"Found 'index.html' (matched 1)"}}
{"type":"step.complete","payload":{"step_id":"scaffold","duration_ms":505709,"gates_evaluated":1,"gates_passed":1}}
{"type":"step.start","payload":{"step_id":"polish","model_resolved":"claude-sonnet-4-20250514","skippable":true}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":false,"exit_code":1,"duration_ms":7432}}
{"type":"step.skip","payload":{"step_id":"polish","exit_code":1,"error_excerpt":"Adapter returned non-zero exit.","skippable":true}}
{"type":"step.start","payload":{"step_id":"setup_md","model_resolved":"claude-haiku-4-5-20251001"}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":true,"duration_ms":65780}}
{"type":"gate.pass","payload":{"step":"setup_md","gate":"exists_any","severity":"soft"}}
{"type":"step.complete","payload":{"step_id":"setup_md"}}
{"type":"build.complete","payload":{"plan_hash":"a53a0aa050046435...","total_duration_ms":578961}}
```

Ako nikad nisi čitao `events.jsonl`, [Trag builda i eventi](/hr/docs/architecture/build-trace) prolazi kroz što svako polje znači.

## Što ovo dokazuje

- **Plan je stvarno hash-zaštićen.** Taj `plan_hash: a53a0aa05004...` je reproduktivan na bilo kojoj mašini koja kompajlira isti `static.yaml` s istom `prompt_version`. Rebuildi u različitim sobama produciraju isti recept; samo AI output drifta.
- **Gate-ovi rade.** Hard gate na `scaffold` bi pao build da je AI rekao "gotovo!" bez zapisivanja `index.html`. AI ga je napisao. Gate je to potvrdio. Oboje vidljivo u logu.
- **Preskočivo je važno.** Ne-nulti exit za 7 sekundi na polish koraku bi prekinuo tipični build pipeline. Tesserin manifest je unaprijed deklarirao korak opcionalni, pa Sonnet problem nije uzalud trošio 8-minutni Opus run.
- **Tri različita modela za tri različita posla.** Opus za teški kreativni scaffold, Haiku za boilerplate-y SETUP.md. Plan-svjesno usmjeravanje to je sredilo bez ikakvog korisničkog inputa.

## Vidi također

- [Referenca `tessera plan`](/hr/docs/cli/plan) — kako kompajlirati i pregledati plan prije pokretanja
- [Trag builda i eventi](/hr/docs/architecture/build-trace) — potpuna taksonomija vrsta eventa i `jq` recepti
- [YAML stack manifesti](/hr/docs/architecture/yaml-manifests) — Static manifest koji je pokretao ovaj build
- [Cijene](/hr/docs/pricing) — kad budeš spreman koristiti ovo za klijentski rad
