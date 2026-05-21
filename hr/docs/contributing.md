---
title: "Doprinos"
description: "Doprinesi Tessera open-source AI generatoru projekata. Dodaj nove tech stackove, poboljšaj AI promptove ili ispravljaj bugove. 403 testa, nula AI tokena potrebno za pokretanje."
---

# Doprinos Tesseri

Tessera je otvorena za doprinose. Bilo da hoćeš dodati novi tech stack, poboljšati AI promptove ili ispraviti bugove — doprinosi su dobrodošli.

## Postavljanje razvojnog okruženja

```bash
# 1. Fork repoa na GitHubu, zatim kloniraj svoj fork
git clone https://github.com/TVOJE-KORISNICKO-IME/tessera-installer.git
cd tessera-installer

# 2. Instaliraj zavisnosti
composer install

# 3. Provjeri da sve radi
vendor/bin/phpunit
```

Trebao bi vidjeti 403 testa koja prolaze. Svi testovi se pokreću s **nula AI tokena** — nema API ključeva niti AI alata potrebnih za razvoj.

## Struktura projekta

```
tessera-installer/
├── bin/tessera              # CLI entry point
├── src/
│   ├── NewCommand.php       # Glavni `tessera new` orchestrator
│   ├── StepRunner.php       # Izvršava AI korake s oporavkom od greške
│   ├── AiTool.php           # Detektira i pokreće AI CLI alate
│   ├── ToolRouter.php       # Pametno cross-tool usmjeravanje
│   ├── ToolPreference.php   # Plan razine i redoslijed alata
│   ├── Memory.php           # Perzistentnost stanja za nastavak
│   ├── SystemInfo.php       # Detekcija OS-a i alata
│   ├── Console.php          # Terminal I/O i formatiranje
│   └── Stacks/
│       ├── StackInterface.php    # Ugovor za sve stackove
│       ├── StackRegistry.php     # Otkrivanje stackova
│       ├── LaravelStack.php      # Laravel + Filament
│       ├── NodeStack.php         # Node.js / Next.js
│       ├── GoStack.php           # Go backend
│       ├── FlutterStack.php      # Flutter mobile
│       └── StaticStack.php       # Static HTML + Tailwind
└── tests/
    ├── Unit/                # 8 unit test datoteka
    └── Integration/         # 2 integration test datoteke
```

## Što možeš doprinijeti

### Dobri prvi doprinosi

- **Ispravljanje bugova** — pogledaj [otvorene issue-e](https://github.com/drnasin/tessera-installer/issues)
- **Dokumentacija** — ispravljaj tipfelere, poboljšavaj objašnjenja, dodaj primjere
- **Pokrivenost testovima** — dodaj testove za rubne slučajeve

### Veći doprinosi

- **Novi tech stackovi** — dodaj Ruby on Rails, Django ili Rust stack
- **Poboljšaj AI promptove** — poboljšaj generirani kod za specifične slučajeve upotrebe
- **Nove značajke** — nakon rasprave u GitHub issue-u

## Kako poslati pull request

1. **Kreiraj branch** iz `master`-a:
   ```bash
   git checkout -b fix/tvoj-opis
   ```

2. **Napravi izmjene** i napiši testove gdje je primjenjivo

3. **Pokreni test suite** — svih 403 testa mora proći:
   ```bash
   vendor/bin/phpunit
   ```

4. **Pokreni code style** (Laravel Pint):
   ```bash
   ../vendor/bin/pint src/ tests/
   ```

5. **Commitaj s jasnom porukom:**
   ```bash
   git commit -m "Fix: opiši što si ispravio i zašto"
   ```

6. **Push i otvori PR** prema `master`

### Imenovanje brancheva

- `fix/opis` — ispravljanje bugova
- `feature/opis` — nove značajke
- `docs/opis` — izmjene dokumentacije
- `test/opis` — poboljšanja testova

## Pisanje testova

Svi testovi moraju se pokretati s **nula potrošnje tokena** — nije dopušteno stvarno pozivanje AI-ja.

```php
// Koristi AiTool::fake() za test instance
$tool = AiTool::fake('claude');

// Suzbij Console output u testovima
ob_start();
// ... tvoj test kod
ob_end_clean();
```

Testiraj logiku odlučivanja i state machine-e, ne kvalitetu AI outputa. AI output je po prirodi nepredvidiv — testiraj kod koji ga obrađuje.

```bash
# Pokreni sve testove
vendor/bin/phpunit

# Pokreni specifičnu test datoteku
vendor/bin/phpunit tests/Unit/MemoryTest.php

# Pokreni specifičnu test metodu
vendor/bin/phpunit --filter=testResolveComplexDefaultsToClaudeOpus
```

## Dodavanje novog stacka

1. Kreiraj `src/Stacks/TvojStack.php` koji implementira `StackInterface`
2. Registriraj ga u `StackRegistry::init()`
3. Implementiraj potrebne metode:

| Metoda | Svrha |
|---|---|
| `name()` | Kratki identifikator (npr. `'rails'`) |
| `label()` | Ime za prikaz (npr. `'Ruby on Rails'`) |
| `description()` | Jednoredni opis za AI kontekst |
| `preflight()` | Provjeri da su potrebni alati instalirani |
| `scaffold()` | AI-driven build flow |
| `postSetup()` | Pokreni nakon builda (migracije, seeding) |
| `completionInfo()` | Prikaži "tvoj projekt je spreman" info |

4. Dodaj testove u `tests/Unit/TvojStackTest.php`
5. Dodaj dokumentacijsku stranicu u [website repo](https://github.com/drnasin/tessera-website)

## Ključne dizajnerske odluke

Ovi principi vode sve doprinose:

- **Principijelni promptovi** — koristi 2-3 univerzalna pravila umjesto dugih kontrolnih lista. AI bolje radi s principima nego instrukcijama.
- **Neovisnost o verziji** — nikad tvrdo kodiraj verzije frameworka. Čitaj ih iz `vendor/` ili `package.json` pri pokretanju.
- **Deterministički gate-ovi umjesto AI ocjenjivanja** — svaki smisleni korak završava s `gates:` blokom u YAML-u. Preferira se `exists_any` / `exists_all` / `command_passes` nad drugim AI pozivom za "pregled" prvog.
- **Shemom verzionirana artefakti** — svaka perzistentna datoteka (`state.json`, `events.jsonl`, `plan.json`) nosi `tessera.<artifact>/v<N>`. Povećaj verziju, nikad tiho mijenjaj oblik.
- **Atomično stanje** — koristi privremenu datoteku + preimenovanje za sigurnost pri rušenju. Nikad ne piši stanje direktno. Memory pisanja se događaju *prije* odgovarajućeg audit eventa da nastavak ostane ispravan na Ctrl+C.
- **Minimalne zavisnosti** — runtime je PHP 8.4+ i `symfony/yaml`. Dodavanje treće zavisnosti zahtijeva jak razlog.

## Što izbjegavati

- **Breaking changes** bez prethodne rasprave u issue-u
- **Veliki PR-ovi** koji mijenjaju mnogo datoteka — podijeli ih u manje fokusirane PR-ove
- **Dodavanje runtime zavisnosti** — Tessera namjerno ima nula runtime zavisnosti
- **Tvrdo kodiranje naziva AI modela** — koristi sustav usmjeravanja, ne direktne reference modela
- **Testovi koji pozivaju stvarne AI alate** — svi testovi moraju raditi offline

## Prijava bugova

Otvori [GitHub issue](https://github.com/drnasin/tessera-installer/issues) s:

1. **Outputom `tessera doctor`** — prikazuje tvoje postavljanje sustava
2. **Koracima reprodukcije** — koju si naredbu pokrenuo, što si opisao
3. **Očekivanim vs. stvarnim rezultatom** — što je pošlo po krivu
4. **OS-om i PHP verzijom** — iz `php -v` i `uname -a`

## Varijable okruženja

Korisno za testiranje različitih AI konfiguracija:

| Varijabla | Vrijednosti | Svrha |
|---|---|---|
| `TESSERA_CLAUDE_PLAN` | `max`, `pro`, `free` | Override detekcije Claude plana |
| `TESSERA_CODEX_PLAN` | `plus`, `free` | Override detekcije Codex plana |
| `TESSERA_GEMINI_PLAN` | `pro`, `free` | Override detekcije Gemini plana |
| `TESSERA_TOOL_PREFERENCE` | `claude,gemini,codex` | Prilagođeni redoslijed alata |
| `TESSERA_TOOL_EXCLUDE` | `codex` | Alati koje nikad ne koristiš |
| `TESSERA_AI_TIMEOUT` | `900` | Timeout AI koraka u sekundama (zadano 900) |
| `TESSERA_SAFE_AI` | `1` | **Samo Claude** — uklanja `--dangerously-skip-permissions`, tako da Claude pauzira na svakoj akciji za odobrenje. Ne utječe na Codex ili Gemini. Vidi [Sigurnosni model](/hr/docs/disclaimer#sigurnosni-model). |

## Povezano

- [Instalacija i postavljanje](/hr/docs/getting-started) — instaliraj Tesseru i isprobaj je prije doprinosa
- [Usmjeravanje AI poziva](/hr/docs/ai-routing) — razumij kako se AI alati orkestriraju tijekom buildova
- [Puni CONTRIBUTING.md na GitHubu](https://github.com/drnasin/tessera-installer/blob/master/CONTRIBUTING.md) — dodatni detalji
