---
title: "Studija slučaja — Vinarija Split"
description: "Kako je Tessera izgradila puni Laravel + Filament + e-commerce wine shop kroz 5 ciklusa nastavka, uključujući načine pada koji su pokrenuli popravke kasnog Sprinta 1."
---

# Vinarija Split — Laravel + Filament e-commerce, izgrađen kroz 5 nastavaka

[Studija slučaja Pekarnica Ognjište](/hr/docs/case/bakery) prikazuje sretni put: statički site, tri koraka, 9 minuta, bez drame. Ova stranica je suprotnost — Laravel + Filament e-commerce build koji je pogodio svaku vrstu stvarne greške (timeoutovi, rate limitovi, srednje-stream Claude greške) i još uvijek sletio na `status: complete`.

Ovaj wine-shop run **pokrenuo je gate-pass override obrazac** koji je sad dio enginea. Ako hoćeš razumjeti zašto Tessera donosi odluke koje donosi o rukovanju greškama, ovo je stranica za tebe.

## Što je korisnik upisao

```bash
tessera new wine-shop \
  --stack=laravel \
  --requirements-fixture=laravel-req.json
```

```json
{
  "description": "Small Croatian wine importer in Split. Sells Dalmatian, Istrian, and natural wines online. Three product categories, up to 200 SKUs. Needs cart, checkout, order tracking, customer accounts. Croatian + English. Owner is family-run, third generation, wants the site to feel editorial and refined — wine merchant aesthetic, not mass retailer.",
  "languages": ["hr", "en"],
  "design_style": "elegant, refined, slightly editorial — wine merchant aesthetic",
  "design_colors": "deep burgundy, cream, antique gold accent, soft charcoal",
  "needs_shop": true,
  "country": "HR",
  "payment_providers": ["corvuspay", "bank_transfer"]
}
```

## Što je izašlo

Radni Laravel 13 + Filament 5 e-commerce site:

```text
wine-shop/
├── app/
│   ├── Core/                         # Tessera CMS temelj
│   │   ├── Models/                   #   Page, Block, Navigation
│   │   ├── Services/                 #   PageRenderer, BlockRegistry, ThemeManager
│   │   └── Http/PageController.php
│   ├── Modules/Shop/                 # 13 modela, 4 enuma, 6 Livewire komponenti
│   │   ├── Models/                   #   Product, Order, Cart, ShippingZone, ...
│   │   ├── Enums/                    #   OrderStatus, PaymentStatus, ProductStatus
│   │   ├── Livewire/                 #   WineCatalog, MiniCart, Checkout, ...
│   │   └── Payments/                 #   PaymentGatewayInterface + CorvusPay/banka
│   └── Filament/Resources/           # Filament admin (PageResource s block builderom,
│                                     #   CategoryResource, OrderResource, ShopSettings)
├── database/
│   ├── migrations/                   # 19 migracija (3 Laravel default + 16 custom)
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── AdminUserSeeder.php       # admin@vinarija-split.test (AI svjestan branda)
│       ├── WineCatalogSeeder.php     # AI-imenovan prema industriji
│       ├── ShippingSeeder.php
│       ├── TaxRateSeeder.php
│       ├── ShopSettingsSeeder.php
│       ├── RolesSeeder.php
│       └── CmsSeeder.php
├── resources/views/themes/default/   # Tailwind tema, burgundy paleta
├── run-tests.sh                      # AI napisao ovo da zaobiđe PHPUnit 12 kvarku
├── CLAUDE.md                         # 13 KB AI-assisted vodič za razvoj
└── SETUP.md                          # 27 KB vodič za deploy prilagođen juniorima
```

Admin korisnik je **`admin@vinarija-split.test` / `password`** — AI je rebrandirao email da odgovara projektu, a lozinku ostavio prema uputama.

## Pet ciklusa nastavka

Ovo je što se dogodilo, po redu. Svaki red je jedno `tessera new` pozivanje.

| # | Korak koji je pao | Zašto | Ishod | Pokrenulo |
|---|---|---|---|---|
| 1 | `core_models` | Timeout 2400s — Opus + Laravel + e-commerce treba više vremena | Build se zaustavio | Timeout povećan na 3600s |
| 2 | `core_models` | Subprocess je držao `proc_close` živ past 60-min budžeta na Windowsu; AI je završio, gate je prošao | Build se zaustavio | **Gate-pass-override obrazac (timeout izdanje)** |
| 3 | `admin` | Sonnet vratio exit 1 srednje streama nakon pisanja svake datoteke koju gate zahtijeva (vjerojatno free-tier rate cap koji se kasno aktivirao u runu) | Build se zaustavio | **Gate-pass-override generaliziran na bilo koji ne-nulti exit** |
| 4 | `content` | Sonnet pogodio free-tier rate limit za 3.7s, bez gate-a, nije preskočiv | Build se zaustavio | `content` označen kao `skippable: true` da odgovara ostalim stackovima |
| 5 | (nijedan) | Petlja za self-healing test pogodila PHPUnit 12 / Laravel `--no-interaction` zastavica nekompatibilnost — AI napisao `run-tests.sh` wrapper za filtriranje uvredljive zastavice | Build završen | Potvrđeno da se self-healing stvarno ozdravljuje |

Peti run završio s `status: complete`. Finalni oblik state.json:

```json
{
  "status": "complete",
  "completed_steps": [
    "packages", "filament", "configs", "structure",
    "core_models", "theme", "admin", "setup_md", "tests_fixed"
  ],
  "skipped_steps": ["content", "tests"]
}
```

Dva koraka obogaćivanja preskočena (rate-limitirana svaki put), devet završenih, build zelen.

## Trag builda po koraku

| Korak | Adapter / model | Ukupno trajanje | Ishod |
|---|---|---|---|
| `packages` (pre-AI shell) | composer | ~10 min | ✓ 12 paketa instalirana |
| `filament` (pre-AI shell) | composer + artisan | ~30 s | ✓ AdminPanelProvider kreiran |
| `configs`, `structure` (pre-AI shell) | shell | ~10 s | ✓ |
| `core_models` (pokušaj 3) | claude-opus-4-20250514 | (resume kratki spoj — već završeno iz pokušaja 2 s gate-pass overrideom) | ✓ via override |
| `theme` | claude-opus-4-20250514 | 7 min 24 s | ✓ |
| `admin` | claude-opus-4-20250514 | 15 min 30 s | ✓ čisto (resume #4) |
| `content` | claude-sonnet-4-20250514 | 3.7 s | ⏭ preskočeno (rate limit) |
| `tests` | claude-sonnet-4-20250514 | rate-limited | ⏭ preskočeno |
| `setup_md` | claude-haiku-4-5-20251001 | ~1 min | ✓ |
| `tests_fixed` (post-yaml) | claude-sonnet-4-20250514 × 3 pokušaja | ~10 min | ✓ AI napisao `run-tests.sh` wrapper |

Ukupno eventa u `events.jsonl` kroz svih 5 pokušaja: **67**.

## Što je AI napravio što nije bilo u promptu

Tri stvari se ističu čitanjem generiranog koda, od kojih ništa nije direktno zatraženo:

- **Brand-svjesni admin email.** Fixture je rekao da je projekt "Vinarija Split". AI je kreirao `AdminUserSeeder` s `admin@vinarija-split.test`, ne generičkim `admin@tessera.test` iz prompta. Donio je odluku koja odgovara brandu bez upute.
- **`WineCatalogSeeder`.** Zatraženo seedanje proizvoda; kreirana klasa nazvana prema stvarnoj industriji. Isti obrazac kroz `Producer` model, `WineCatalog` Livewire komponentu i editorijalne Tailwind klase (`text-bordeaux`, `editorial-h1`, `editorial-eyebrow`).
- **`run-tests.sh` zaobilaznica.** `tests_fixed` post-yaml hook pogodio je PHPUnit 12.5.23 / Laravel runner nekompatibilnost (`--no-interaction` je Symfony-console, ne PHPUnit). Na trećem pokušaju popravka, AI nije pokušao zakrpati PHPUnit niti ga degradirati — napisao je bash wrapper koji filtrira uvredljivu zastavicu prije prosljeđivanja argumenata. Stvarno inženjerstvo, ne pattern matching.

## Što ovo dokazuje

- **Override obrazac je neophodan, ne opcionalan.** Dva od pet ciklusa pala su jer se exit kod adaptera nije slagao s rezultatom gate-a. Bez overridea, ovaj build bi se petljao unedogled.
- **Preskočivo obogaćivanje je razlika između 25-minutnog djelomičnog uspjeha i 25-minutnog zaustavljenog builda.** Free-tier rate capovi nisu rubni slučajevi; oni su modalni način pada za Sonnet tijekom dugog runa.
- **Self-healing testovi se stvarno ozdravljuju.** Tri pokušaja, AI popravlja i test setup i runner-level nekompatibilnost, završava projekt u stanju gdje se pokreće, admin se učitava i homepage poslužuje hrvatski sadržaj.
- **Nastavak je jeftin.** Pre-AI shell sekvenca (composer + filament install) pokrenula se jednom kroz svih pet ciklusa. `completed_steps` iz state.json kratko spaja sve ispod polog koraka na svakom ponovnom pokušaju.

## Vidi također

- [Studija slučaja Pekarnica Ognjište](/hr/docs/case/bakery) — static-site sretni put, 9m 39s, bez drame
- [Trag builda i eventi](/hr/docs/architecture/build-trace) — što svaki event u 67-rednom logu znači
- [`tessera plan`](/hr/docs/cli/plan) — pregledaj recept prije pokretanja
- [Cijene](/hr/docs/pricing) — kad budeš spreman koristiti ovo za klijentski rad
