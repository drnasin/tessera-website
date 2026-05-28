---
title: "Instalacija i postavljanje"
description: "Instaliraj Tessera CLI za manje od minute. Potrebni su PHP, Composer i barem jedan AI alat (Claude, Codex ili Gemini). Kreiraj prvi projekt već danas."
---

# Početak rada s Tesserom

Tessera je AI generator projekata koji se pokreće kao CLI alat na tvom računalu. Instaliraj ga globalno putem Composera i počni generirati kompletne web projekte iz razgovora. Nisi čuo za Tesserou prije? Prvo pročitaj [Što je Tessera?](/hr/docs/what-is-tessera).

## Instaliraj Tessera CLI pomoću Composera

```bash
composer global require tessera/installer
```

Provjeri da je Composerov globalni bin direktorij u PATH-u:
- **Windows:** `%APPDATA%\Composer\vendor\bin`
- **macOS/Linux:** `~/.composer/vendor/bin`

Provjeri radi li instalacija:

```bash
tessera --version
```

## Provjera sustava

Prije kreiranja prvog projekta, pokreni ugrađenu dijagnostiku da provjeriš ima li tvoj sustav sve što Tessera treba:

```bash
tessera doctor
```

```
  TESSERA DOCTOR — System Check

System:
  OS: windows
  Package manager: scoop

Required:
✓ PHP — PHP 8.5.2
✓ Composer — 2.9.2

AI tools (need at least one):
✓ claude — 2.1.76
✓ gemini — 0.32.1
✓ codex — 0.114.0

Optional (depends on stack):
✓ Node.js — v25.8.0
✓ Go — go1.25.0
  Flutter — not installed
✓ Docker — 28.4.0
✓ Git — 2.45.1

✓ Disk space: 87.7 GB free

  All good! Run: tessera new my-project
```

## Preduvjeti

**Obavezno:**

### PHP 8.4+

PHP je programski jezik u kojem je Tessera napisana. Provjeri imaš li ga:

```bash
php -v
```

Ako nije instaliran:
- **Windows:** `scoop install php` ili preuzmi s [php.net](https://www.php.net/downloads)
- **macOS:** `brew install php`
- **Linux (Ubuntu/Debian):** `sudo apt install php php-cli php-mbstring php-xml php-curl php-zip`

### Composer

Composer je upravljač paketa za PHP — instalira Tesserou i njene ovisnosti. Provjeri imaš li ga:

```bash
composer --version
```

Ako nije instaliran: slijedi [službeni vodič za instalaciju Composera](https://getcomposer.org/download/). Na macOS-u možeš i `brew install composer`.

### Barem jedan AI CLI alat

Tessera koristi AI alate instalirane na tvom računalu. Potreban je barem jedan:

| Alat | Instalacija | Besplatni plan? |
|---|---|---|
| Claude | `npm install -g @anthropic-ai/claude-code` | Ograničen |
| Codex | `npm install -g @openai/codex` | Ograničen |
| Gemini | `npm install -g @google/gemini-cli` | Da |

::: info Nemaš npm?
Ovi AI alati instaliraju se putem npm-a (Node.js upravljač paketa). Ako ga nemaš, instaliraj Node.js s [nodejs.org](https://nodejs.org/) — npm dolazi uz njega.
:::

**Po potrebi** (automatski se instaliraju ako nedostaju):
- Node.js — za frontend assete i [Node.js stack](/hr/docs/stacks/nodejs)
- Go — za [Go stack](/hr/docs/stacks/go)
- Flutter SDK — za [Flutter stack](/hr/docs/stacks/flutter)

## Generiraj prvi AI web projekt

```bash
tessera new moj-projekt
```

AI vodi prirodan razgovor — pita o poslovanju, jezicima, plaćanju, stilu dizajna — a zatim [automatski gradi sve](/hr/docs/creating-project). Cijeli proces traje nekoliko minuta.

::: tip
Tessera pita o tvojim AI pretplatnim planovima. Imaš Claude Max (neograničen)? Tessera će preferirati Claude za sve zadatke jer nema troška. Više o [usmjeravanju AI poziva](/hr/docs/ai-routing).
:::

## Preskakanje razgovora (dev način)

Znaš već koji stack trebaš i ne treba ti AI razgovor? Dvije zastavice ubrzavaju stvari:

```bash
# Odaberi stack sam — bez AI poziva za odabir stacka.
tessera new moja-trgovina --stack=laravel

# Preskoči interaktivni upitnik učitavanjem zahtjeva iz JSON-a.
tessera new moja-trgovina \
  --stack=laravel \
  --requirements-fixture=./zahtjevi.json
```

Minimalni `zahtjevi.json`:

```json
{
  "description": "Online vinoteka u Hrvatskoj, tri kategorije, hrvatski + engleski",
  "languages": ["hr", "en"],
  "design_style": "elegantno, rafinirano",
  "design_colors": "burgundy, krem",
  "needs_shop": true,
  "country": "HR",
  "payment_providers": ["corvuspay", "bank_transfer"]
}
```

Ovo je korisno uglavnom za ponavljane razvojne iteracije i CI smoke testove.

## Pregled plana prije trošenja tokena

Tessera može pokazati plan **bez pokretanja ijednog AI poziva**:

```bash
tessera plan compile stacks/laravel.yaml
tessera plan show
```

Plan ti točno govori koji se koraci izvode, kojim redoslijedom, s kojim promptom i prema kojem AI-ju. Vidi [`tessera plan`](/hr/docs/cli/plan) za punu referencu.

## Sljedeći koraci

- [Kreiranje projekta](/hr/docs/creating-project) — vidi cijeli proces od razgovora do radne aplikacije
- [Nakon builda](/hr/docs/after-building) — što napraviti kad je projekt generiran
- [Usmjeravanje AI poziva](/hr/docs/ai-routing) — kako Tessera bira najbolji AI za svaki zadatak
- [Nastavak i oporavak](/hr/docs/resume) — što se događa kad build padne ili se prekine
- [Trag builda i eventi](/hr/docs/architecture/build-trace) — čitaj `events.jsonl` za debugiranje završenog builda
