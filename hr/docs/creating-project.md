---
title: "Kreiranje projekta"
description: "Pogledaj kako Tesserin AI generator projekata gradi kompletnu web aplikaciju iz razgovora. Modeli, tema, admin panel, testovi i deploy — sve automatizirano."
---

# Kreiranje projekta uz AI

Tessera generira kompletne web projekte kroz kratki razgovor. Opišeš poslovanje, AI odabere najbolji tech stack i izgradi sve — modele, temu, admin panel, sadržaj, testove i dokumentaciju za deploy.

## Razgovor

Kad pokreneš `tessera new`, AI generator koda vodi prirodan razgovor da razumije tvoj projekt:

```
$ tessera new moj-restoran

✓ AI: claude, gemini, codex
✓ OS: windows (scoop)
✓ DB: mysql, sqlite

Koje AI planove imaš?
  Claude plan: Max (neograničen)
  Codex plan: Besplatni
  Gemini plan: Besplatni

AI: Reci mi o projektu — što klijent radi?
> Restoran u Splitu, trebaju stranicu s jelovnikom i rezervacijama

AI: Koje jezike stranica treba podržavati?
> Hrvatski i engleski

AI: Hoće li klijenti plaćati online?
> Ne, samo prezentacija s formom za rezervacije

AI: Kakav stil preferiraš?
> Moderan i topao. Zemljani tonovi.
```

AI pita o 5 obaveznih tema:
1. **Poslovanje** — što klijent radi
2. **Jezici** — koje jezike stranica treba
3. **Plaćanje** — ako je e-commerce, koji davatelj
4. **Frontend dizajn** — stil, boje, atmosfera
5. **Opseg** — očekivani broj korisnika/proizvoda

## Gradnja

Nakon razgovora, AI odabire najbolji tech stack i automatski gradi sve:

```
AI preporučuje: Laravel + Filament (Tessera CMS)
Nastavi? [Y/n]: Y

[1/8] Kreiraj Laravel projekt           ✓
[2/8] Instaliraj pakete                  ✓
[3/8] Postavi admin panel                ✓
[4/8] Objavi konfiguracije               ✓
[5/8] Kreiraj strukturu projekta         ✓
[6/8] AI gradi tvoj projekt...
  ✓ Kreiranje modela baze podataka       (claude opus)
  ✓ Dizajn frontend teme                 (claude opus)
  ✓ Izgradnja admin panela               (claude opus)
  ✓ Pisanje sadržaja i punjenje podataka (claude sonnet)
  ✓ Generiranje testova                  (claude sonnet)
  ✓ Svi kontrolni prolazi prošli (provjere datoteka)
  ✓ Upute za postavljanje                (claude haiku)
[7/8] Pokretanje migracija               ✓
[8/8] Punjenje baze podataka             ✓

╔══════════════════════════════════════╗
║         PROJEKT JE SPREMAN!          ║
╚══════════════════════════════════════╝

  AI usage: claude: 5 calls (2 opus, 2 sonnet, 1 haiku) | gemini: 1 call (flash)

  cd moj-restoran
  php artisan serve

  Stranica:  http://localhost:8000
  Admin:     http://localhost:8000/admin
  Login:     admin@tessera.test / (jednokratna lozinka — prikazana samo ovdje, promijeni je pri prvoj prijavi)
```

## Što se generira

Za [Laravel projekt](/hr/docs/stacks/laravel), AI kreira:

- **Modeli i migracije** — Page, Block, Navigation + projektno-specifični modeli
- **Tema** — Responzivni Tailwind CSS frontend s blok-baziranim stranicama
- **Admin panel** — Filament resursi za svaki model s dashboard widgetima
- **Sadržaj** — Realistični seed sadržaj (bez lorem ipsuma)
- **Testovi** — PHPUnit feature testovi koji prolaze
- **SETUP.md** — Dokument za predaju projektu sa svim potrebnim za deploy

Ostali stackovi generiraju ekvivalentni output — vidi [Node.js](/hr/docs/stacks/nodejs), [Go](/hr/docs/stacks/go), [Flutter](/hr/docs/stacks/flutter) i [Static](/hr/docs/stacks/static) za detalje.

## Platni sustavi po državi

AI generator koda zna koje su platforme za plaćanje popularne u svakoj državi:

| Država | Predloženi davatelji |
|---|---|
| Hrvatska, Slovenija, Srbija | CorvusPay, WSPay, Stripe |
| Austrija, Njemačka, Švicarska | Klarna, Mollie, Stripe |
| Velika Britanija | Stripe, GoCardless, PayPal |
| SAD | Stripe, Square, PayPal |

## Postavljanje baze podataka

Tijekom provjere sustava, Tessera detektira koje su baze dostupne na tvom računalu (MySQL, MariaDB, PostgreSQL, SQLite). Ako odabereš MySQL ili PostgreSQL, Tessera traži tvoje podatke za prijavu i testira vezu.

Ako nešto pođe po krivu:
- **Pogrešni podaci** — pokušaj ponovo s ispravnim podacima
- **Ne može kreirati bazu** — Tessera čeka da je ručno kreiraš, zatim verificira
- **Uopće se ne može spojiti** — prelazi na SQLite da se build može nastaviti

Nećeš izgubiti napredak — odabir baze se sprema i može se promijeniti u `.env` datoteci.

## Ugrađene zaštite

Nakon generiranja koda, Tessera automatski provjerava prije predaje projekta:

- **Kontrolni prolazi** — svaki korak deklarira post-provjere u YAML-u (npr. "je li AI zaista kreirao `index.html`?"). Tvrdi prolazi zaustavljaju build; meki prolazi bilježe upozorenje i nastavljaju. Vidi stranicu [traga builda](/hr/docs/architecture/build-trace) za što se bilježi.
- **Self-healing testovi (Laravel)** — nakon AI dijela, Tessera pokreće `php artisan test`; ako nešto pada, output se vraća AI-ju i pokušava se popravak, do 3 puta.
- **Preskočivi koraci obogaćivanja** — koraci označeni s `skippable: true` u YAML-u (lint prolazi, faze poliranja, generatori SETUP.md-a) ne zaustavljaju build ako padnu — tipično kad AI alat dosegne privremeni rate limit. Glavni korak scaffoldinga nikad nije preskočiv.
- **Prompti neovisni o verziji** — AI verificira verzije paketa iz tvog stvarnog `vendor/` direktorija, pa prompti ostaju točni kroz nadogradnje Laravela, Filamenta i Livewirea.

## Tvoji zahtjevi se poštuju

Ako AI-ju kažeš da koristi određeni paket, pristup ili stil — koristit će ga. Na primjer:

- "Koristi Laravel Breeze za autentikaciju"
- "Hoću tamnu temu"
- "Koristi PostgreSQL, ne MySQL"

Ovo se šalje svim AI koracima gradnje kao obvezne upute.

## Što se događa ako nešto pođe po krivu?

Tessera sprema napredak nakon svakog koraka. Ako build padne ili ga prekineš, [nastavi od mjesta gdje je stao](/hr/docs/resume) — bez trošenja AI tokena na završene korake, bez gubitka rada.

## Sljedeći koraci

- [Nakon builda](/hr/docs/after-building) — što napraviti kad build završi
- [Usmjeravanje AI poziva](/hr/docs/ai-routing) — kako Tessera bira najbolji AI za svaki zadatak
