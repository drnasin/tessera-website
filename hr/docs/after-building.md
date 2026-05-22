---
title: "Nakon builda"
description: "Što napraviti nakon što Tessera generira tvoj projekt. Postavi okruženje, konfiguriri bazu, pokreni server i nastavi razvoj uz AI."
---

# Nakon builda

Projekt je spreman. Evo što napraviti dalje.

## Korak 1: Pročitaj SETUP.md

Svaki generirani projekt uključuje `SETUP.md` datoteku pisanu specifično za tvoj projekt. Sadrži:

- **Varijable okruženja** — što postaviti, gdje nabaviti vrijednosti
- **Postavljanje plaćanja** — korak po korak ako projekt uključuje online prodaju
- **Produkcijska kontrolna lista** — sigurnost, baza, email, cachiranje
- **Uobičajeni zadaci** — kako dodati stranice, blokove ili značajke

```bash
cd moj-projekt
cat SETUP.md
```

::: tip
SETUP.md je pisan za juniore. Po potrebi objašnjava tehničke koncepte i uključuje linkove na mjesta gdje možeš nabaviti API ključeve.
:::

## Korak 2: Konfiguriraj okruženje

Projekt ima `.env` datoteku s konfiguracijom. Većina je postavljena automatski, ali možda ćeš trebati ažurirati:

### Podaci baze podataka

Ako si koristio MySQL ili PostgreSQL tijekom builda, ovo je već postavljeno. Ako trebaš promijeniti:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=moj_projekt
DB_USERNAME=root
DB_PASSWORD=
```

::: info Što je .env?
`.env` datoteka pohranjuje konfiguraciju koja se razlikuje između okruženja (tvoje računalo vs produkcijski server). Stvari poput lozinki baze, API ključeva i URL-ova aplikacije. Nikad ne commiti ovu datoteku u git — već je u `.gitignore`.
:::

### API ključevi (ako je primjenjivo)

Ako projekt ima plaćanje ili integracije s trećim stranama, SETUP.md navodi točno koje ključeve trebaš i gdje ih nabaviti.

## Korak 3: Postavi bazu podataka

### Laravel projekti

```bash
# Pokreni migracije — ovo kreira tablice baze podataka
php artisan migrate

# Napuni bazu — ovo popunjava tablice uzornim sadržajem
php artisan db:seed
```

::: info Što su migracije?
Migracije su PHP datoteke koje definiraju strukturu tvoje baze (tablice, stupce, relacije). Pokretanje `php artisan migrate` kreira sve tablice koje projekt treba. Ovo je već napravljeno tijekom builda, ali možda ćeš morati ponovo pokrenuti ako si promijenio bazu.
:::

### Node.js projekti

```bash
# Generiraj Prisma klijent i pokreni migracije
npx prisma migrate dev
npx prisma db seed
```

### Go projekti

```bash
make migrate
```

## Korak 4: Pokreni server

### Laravel

```bash
php artisan serve
```

- **Stranica:** `http://localhost:8000`
- **Admin panel:** `http://localhost:8000/admin`
- **Zadani login:** `admin@tessera.test` / `password`

### Node.js

```bash
npm run dev
```

### Go

```bash
make run
```

### Flutter

```bash
flutter run
```

### Static

```bash
npm run dev
```

Otvori `http://localhost:5173` (ili koji port Vite prikaže).

## Kako napraviti izmjene

Kako unosiš izmjene ovisi o stacku koji je AI odabrao za tvoj projekt.

### Laravel projekti

Laravel projekti imaju ugrađeni AI Engine koji poznaje cijeli projekt — modele, blokove, temu, admin, sve.

**Za izmjene sadržaja** (tekst, slike, stranice) — koristi admin panel na `/admin`. U donjem desnom kutu je AI chat widget koji prati što radiš i nudi pomoć.

**Za strukturalne izmjene** (nove značajke, moduli, integracije) — koristi `tessera` naredbu:

```bash
# AI chat — opiši što trebaš
php artisan tessera

# Direktni zahtjev
php artisan tessera "dodaj galeriju na početnu stranicu"

# Automatski popravak greške
php artisan tessera --fix

# AI pregledava projekt za probleme
php artisan tessera --audit
```

### Node.js / Go / Flutter / Static projekti

Ovi stackovi nemaju ugrađeni AI Engine. Koristi AI CLI alat direktno — automatski čita strukturu projekta:

```bash
# Koristi koji god AI alat imaš
claude "dodaj autentikaciju korisnika s JWT-om"
codex "kreiraj REST API za proizvode"
gemini "dodaj prekidač tamnog načina"
```

Nema potrebe objašnjavati arhitekturu — AI čita codebase i razumije ga.

## Deploy na produkciju

SETUP.md uključuje produkcijsku listu provjera specifičnu za tvoj projekt. Opći koraci:

1. **Postavi `APP_ENV=production`** i `APP_DEBUG=false` u `.env`
2. **Postavi pravi `APP_KEY`** — pokreni `php artisan key:generate`
3. **Konfiguriri pravu bazu** s produkcijskim podacima
4. **Postavi web server** — Nginx ili Apache (SETUP.md ima primjere konfiguracija)
5. **Pokreni migracije** na produkcijskoj bazi

::: warning
Promijeni zadanu admin lozinku prije deploya! Generirani `admin@tessera.test / password` je samo za lokalni razvoj.
:::

## Česta pitanja

### Mogu li preimenovati projekt?

Da. Ime projekta je samo ime mape. Preimenuj mapu i ažuriraj `APP_NAME` i `APP_URL` u `.env`.

### Mogu li promijeniti bazu nakon builda?

Da. Ažuriraj `DB_*` vrijednosti u `.env`, zatim ponovo pokreni `php artisan migrate`.

### Gdje su generirane datoteke?

Struktura projekta ovisi o stacku. Vidi stack-specifičnu dokumentaciju za lokacije datoteka:
- [Laravel](/hr/docs/stacks/laravel)
- [Node.js](/hr/docs/stacks/nodejs)
- [Go](/hr/docs/stacks/go)
- [Flutter](/hr/docs/stacks/flutter)
- [Static](/hr/docs/stacks/static)

## Povezano

- [Kreiranje projekta](/hr/docs/creating-project) — cijeli proces gradnje
- [Nastavak i oporavak](/hr/docs/resume) — nastavak prekinutih buildova
- [Rješavanje problema](/hr/docs/troubleshooting) — česti problemi i rješenja
