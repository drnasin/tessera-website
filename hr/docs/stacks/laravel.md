---
title: "Laravel Stack"
description: "Tesserin Laravel stack generira potpunu aplikaciju s Filament admin panelom, Tailwind temom, e-commerceom, testovima i dokumentacijom za deploy. AI gradi sve iz razgovora."
---

# Laravel + Filament Stack

Najkompletniji stack u Tesserinom AI generatoru projekata. Web stranice, CMS, e-commerce, admin paneli — AI gradi produkcijski spreman Laravel projekt iz razgovora.

## Što se generira

- **Temeljni modeli**: Page, Block, Navigation s prijevodima
- **Tema**: Responzivni Tailwind CSS frontend s blok-baziranim stranicama
- **Admin panel**: Filament resursi za svaki model s dashboard widgetima
- **E-commerce** (po potrebi): Proizvodi, košarica, checkout, plaćanje, dostava
- **Sadržaj**: Realistični seed sadržaj na svim konfiguriranim jezicima
- **Testovi**: PHPUnit feature testovi koji prolaze
- **SETUP.md**: Potpuni vodič za deploy za predaju developeru

## Tech stack

| Komponenta | Verzija |
|---|---|
| PHP | 8.4+ |
| Laravel | 13 |
| Filament | 5 |
| Livewire | 4 |
| Tailwind CSS | 4 |
| Alpine.js | 3 |

## Nakon generiranja

```bash
cd my-project
php artisan serve

# AI-powered izmjene nakon inicijalnog generiranja
php artisan tessera "dodaj galeriju na početnu stranicu"
php artisan tessera --fix    # AI čita log grešaka i popravlja
php artisan tessera --audit  # AI pregledava projekt
```

Admin panel je na `/admin` s plutajućim AI chat widgetom u donjem desnom kutu za kontinuirani AI-asistiran razvoj.

## Kad AI bira ovaj stack

Tessera preporučuje Laravel + Filament kad tvoj projekt treba:
- CMS / web stranicu s admin panelom
- Admin panel za netehničke korisnike
- E-commerce s plaćanjem i dostavom
- Višejezičnu podršku
- Backend s autentikacijom i autorizacijom

## Kako je build opisan

Svaki Tessera stack — uključujući Laravel — opisuje svoje AI build korake u YAML datoteci na `stacks/laravel.yaml`. Pregledaj što će AI napraviti prije pokretanja:

```bash
tessera plan compile stacks/laravel.yaml
tessera plan show
```

Laravel manifest trenutno deklarira šest AI koraka (`core_models`, `theme`, `admin`, `content`, `tests`, `setup_md`) plus post-AI petlju za popravak testova. Pre-AI shell sekvenca (composer create-project, instalacija paketa, filament:install, konfiguracije, struktura, db konfiguracija) živi u `LaravelStack.php` jer su ti koraci previše alat-specifični za YAML engine.

Za pisanje vlastitog stacka, vidi [YAML stack manifeste](/hr/docs/architecture/yaml-manifests).

## Povezani stackovi

Laravel nije pravi izbor za svaki projekt. Tessera podržava i [Node.js](/hr/docs/stacks/nodejs) za API-first aplikacije, [Go](/hr/docs/stacks/go) za visoko-performantne backende, [Flutter](/hr/docs/stacks/flutter) za mobilne aplikacije i [Static](/hr/docs/stacks/static) za jednostavne landing stranice.
