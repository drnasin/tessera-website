---
title: "Tessera vs. ručni scaffolding"
description: "Usporedi AI generiranje projekata s ručnim postavljanjem. Tessera generira produkcijski spreman Laravel, Node.js ili Go projekt za manje od 10 minuta — uključujući testove, admin panel i dokumentaciju za deploy."
---

# Tessera vs. ručni scaffolding

Svaki novi klijentski projekt počinje isto: stvori repozitorij, instaliraj framework, postavi bazu podataka, poveži autentikaciju, napravi admin panel, dodaj demo sadržaj, napiši prve testove, dokumentiraj deploy proces. Za tipičan Laravel projekt to je 18–36 sati rada prije nego što si napisao ijednu liniju poslovne logike.

Tessera sve to radi jednom naredbom.

## Usporedba vremena: ručno postavljanje vs. AI generiranje projekta

Tablica ispod pokriva tipičan klijentski projekt — poslovnu web stranicu s autentikacijom, admin panelom, katalogom proizvoda i kontakt formom. Stvarni primjer: [hrvatska pekara od JSON fixture-a do deployabilnog statičnog projekta za 9 minuta 39 sekundi](/hr/docs/case/bakery).

| Zadatak | Ručno (procjena sati) | S Tesserom |
|---|---|---|
| Postavljanje projekta, struktura direktorija | 1–2 h | uključeno |
| Dizajn sheme baze podataka | 2–4 h | uključeno |
| Eloquent modeli, migracije, factories | 2–4 h | uključeno |
| Autentikacija | 2–3 h | uključeno |
| Filament admin panel | 4–8 h | uključeno |
| Tailwind frontend tema | 3–6 h | uključeno |
| Realistični seed podaci | 1–3 h | uključeno |
| PHPUnit test suite | 2–4 h | uključeno |
| SETUP.md i dokumentacija za deploy | 1–2 h | uključeno |
| **Ukupno** | **18–36 sati** | **< 10 minuta** |

## Što preskačeš svaki put kad počinješ novi projekt

Ručni scaffolding je ponavljanje u najgorem smislu — riješavaš iste probleme na svakom projektu:

- Pamtiti koja verzija Filamenta radi s kojom verzijom Laravela
- Vezati `HasTranslations` na svaki prevedivi model
- Pisati iste `UserFactory`, `ProductFactory`, `PageFactory` stubove
- Resetirati testnu bazu podataka sa zastarjelim migracijama
- Pisati deploy vodič koji developer pri predaji projekta zapravo razumije

Sa Tesserom ništa od toga nije tvoj problem. AI bira ispravne verzije paketa, generira realistični sadržaj na jezicima koje si konfigurirao i piše SETUP.md specifičan za projekt — ne copy-paste od zadnjeg.

## Što AI generator projekata isporučuje, a ručni scaffolding preskače

Većina ručnih scaffolda staje na "radi lokalno". Tessera isporučuje "produkcijski spreman":

| Isporuka | Ručni scaffolding | Tessera |
|---|---|---|
| Test suite | U najboljem slučaju skeleton, obično preskočen | PHPUnit / Vitest / Go testovi koji prolaze |
| Seed podaci | lorem ipsum ili hardkodirani | Realistični, jezično svjesni sadržaj |
| Admin panel | Poseban paket, sati konfiguracije | Filament resursi za svaki model |
| Dokumentacija za deploy | Copy-paste predložak ili preskočeno | SETUP.md specifičan za projekt |
| Trag builda | Git log | `.tessera/events.jsonl` — svaki AI poziv, svaki gate rezultat |
| Kontrolni prolazi | Ručni code review | Deterministički gateovi koji neuspješno završavaju build ako output nije ispravan |

## AI usmjeravanje: pravi model za svaki zadatak

Tessera ne poziva jedan AI model za sve. Plan builda dodjeljuje razine složenosti svakom koraku i usmjerava ih prema tome:

- **Složeni koraci** (scaffold, core modeli) → Claude Opus
- **Srednji koraci** (admin panel, tema) → Claude Sonnet
- **Jednostavni koraci** (SETUP.md, boilerplate) → Claude Haiku

Ne plaćaš Opus-razinu tokena za korake koje Haiku može jednako dobro obaviti. [Vidi AI usmjeravanje →](/hr/docs/ai-routing)

## Kada je ručni scaffolding još uvijek pravi izbor

Tessera generira kompletne, opinionated projekte. To je prednost za većinu rada, a ograničenje u nekim slučajevima:

- **Neobična arhitektura** — ako se tvoj projekt ne može mapirati ni na jedan od pet Tessera stackova, počni ručno
- **Učenje frameworka** — ako proučavaš Laravel iznutra, generiranje projekta skriva osnove; koristi Tesseru kad razumiješ što gradi
- **Proširivanje postojećeg projekta** — Tessera generira nove projekte; ne refaktorira niti dodaje funkcionalnosti postojećoj bazi koda
- **Ultra-minimalni alati** — 20-linijski API bez frontenda, admin panela i testova ne treba generator projekata

## Sažetak: ručni scaffolding vs. Tessera AI generator

| | Ručni scaffolding | Tessera |
|---|---|---|
| Vrijeme postavljanja | 18–36 sati | < 10 minuta |
| Test suite | Opcijski | Uključen, prolazi |
| Admin panel | Sati konfiguracije | Uključen |
| Seed podaci | lorem ipsum ili preskočeno | Realistični, jezično svjesni |
| Dokumentacija za deploy | Predložak ili preskočeno | Specifična za projekt |
| Trag builda | Ništa | Kompletan `.tessera/` direktorij |
| Reproducibilnost | Varira po developeru | Hash-sidren plan builda |
| Cijena | Tvoje vrijeme | Besplatno za osobnu upotrebu — [komercijalna licenca od €249/godišnje](/hr/docs/pricing) za klijentski rad |

## Počni generirati projekte umjesto ručnog scaffoldinga

- [Instaliraj Tessera CLI](/hr/docs/getting-started) — Composer global install, radi za manje od minute
- [Vidi kako izgleda pravi build](/hr/docs/case/bakery) — hrvatska pekara, 9 minuta 39 sekundi
- [Cijene](/hr/docs/pricing) — besplatno za osobnu i nekomercijalnu upotrebu
