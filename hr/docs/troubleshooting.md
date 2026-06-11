---
title: "Rješavanje problema"
description: "Česti problemi i rješenja pri korištenju Tessere. Popravi probleme s instalacijom, padovima builda, greškama baze i problemima s AI alatima."
---

# Rješavanje problema

## Problemi s instalacijom

### `composer: command not found`

Composer nije instaliran ili nije u PATH-u.

- Instaliraj Composer: [getcomposer.org/download](https://getcomposer.org/download/)
- Na macOS-u: `brew install composer`
- Na Linuxu: `sudo apt install composer`

### `tessera: command not found`

Composerova globalna bin mapa nije u PATH-u. Dodaj je:

- **Windows:** dodaj `%APPDATA%\Composer\vendor\bin` u sistemski PATH
- **macOS/Linux:** dodaj ovo u `~/.bashrc` ili `~/.zshrc`:
  ```bash
  export PATH="$HOME/.composer/vendor/bin:$PATH"
  ```
  Zatim pokreni `source ~/.bashrc` (ili `source ~/.zshrc`).

### `php: command not found`

PHP nije instaliran. Vidi odjeljak [Preduvjeti](/hr/docs/getting-started#php-8-4) za upute za instalaciju.

### PHP verzija prestarа

```
Your PHP version (7.4) does not satisfy the requirement (>=8.2)
```

Nadogradi PHP:
- **Windows:** `scoop update php` ili preuzmi s [php.net](https://www.php.net/downloads)
- **macOS:** `brew upgrade php`
- **Linux:** `sudo apt install php8.3` (provjeri dostupne verzije za svoju distribuciju)

## Problemi s AI alatima

### `No AI tools found`

Tessera treba barem jedan AI CLI alat. Najlakši za početak je Gemini (besplatno):

```bash
npm install -g @google/gemini-cli
```

Vidi [Instalaciju i postavljanje](/hr/docs/getting-started#barem-jedan-ai-cli-alat) za sve opcije.

### AI alat instaliran ali nije prijavljen

`tessera doctor` prijavljuje alat kao `installed but not logged in` kad je CLI na tvom `PATH`-u ali nema aktivnu sesiju. Sama detekcija bi prošla — ali prvi stvarni poziv tijekom builda bi pao. Prijavi se naredbom koju doctor ispiše:

```bash
claude          # otvara Claude prijavu
codex login     # Codex
gemini          # Gemini prijava
```

Zatim ponovno pokreni `tessera doctor` — alat bi se trebao prikazati kao obični `✓`.

### Greške rate limita AI alata

Ako AI alat dosegne rate limit, Tessera automatski prebacuje na sljedeći dostupni alat. Ako su svi alati na rate limitu:

- **Pričekaj nekoliko minuta** i [nastavi build](/hr/docs/resume)
- **Nadogradi plan** — Claude Max ili plaćeni Codex planovi imaju veće limite
- **Dodaj više AI alata** — Tessera rotira između svih dostupnih alata

### AI generira neispravan kod

Tessera ima [ugrađene zaštite](/hr/docs/creating-project#ugrađene-zaštite):
- [Kontrolni prolazi](/hr/docs/architecture/yaml-manifests#kontrolni-prolazi--hvatanje-done-kad-nema-ničega) hvataju AI koji tvrdi "gotovo!" kad ništa nije kreirano
- Za Laravel: self-healing petlja za testove s 3 pokušaja
- Preskočivi koraci obogaćivanja ne zaustavljaju build pri privremenim AI greškama

Kad je AI nešto generirao ali build još uvijek pada, [trag builda](/hr/docs/architecture/build-trace) ti točno govori gdje je puklo. Pogledaj `.tessera/events.jsonl` i traži `step.fail` ili `gate.fail`.

Ako i dalje ne ide, problem je obično u generiranom sadržaju, ne u strukturi. Možeš ga popraviti s:

```bash
# Laravel projekti
php artisan tessera --fix

# Ostali stackovi — koristi AI alat direktno
claude "popravi grešku u src/routes/api.ts"
```

## Problemi s bazom podataka

### `Access denied for user`

Pogrešni podaci za bazu. Tessera će tražiti da ih uneseš ponovo. Provjeri:
- MySQL/MariaDB je pokrenut
- Korisničko ime i lozinka su ispravni
- Korisnik ima dozvolu za kreiranje baza

### `Can't connect to database`

Server baze podataka nije pokrenut. Pokreni ga:
- **Laragon:** pokreni MySQL servis iz Laragon panela
- **MAMP/XAMPP:** pokreni MySQL iz control panela
- **Homebrew (macOS):** `brew services start mysql`
- **Linux:** `sudo systemctl start mysql`

Ako ne možeš pokrenuti bazu, Tessera će ponuditi prelazak na **SQLite** (ne treba server).

### `Can't create database`

Tvoj korisnik baze nema dozvolu za kreiranje baza. Možeš:
- Ručno kreirati bazu i reći Tesseri ime
- Dodijeliti `CREATE` privilegije svom korisniku

## Problemi s buildom

### Build pada na pola puta

Ne brini — napredak je sačuvan. Samo pokreni istu naredbu ponovo:

```bash
tessera new moj-projekt
```

Tessera detektira prethodno stanje i [nastavlja od mjesta gdje je stala](/hr/docs/resume). Ni jedan token nije potrošen na završene korake.

### Build izgleda zaglavljen

AI pozivi mogu trajati 30–90 sekundi svaki. Ako korak traje dulje od 3 minute:

1. Pritisni `Ctrl+C` za zaustavljanje
2. Pokreni istu naredbu ponovo — nastavlja
3. Ako i dalje pada na istom koraku, pokušaj dodati drugi AI alat ili navedi `--stack=` eksplicitno

### Testovi padaju nakon builda

Za Laravel projekte, Tessera pokreće self-healing petlju s 3 pokušaja. Za ostale stackove, korak `tests_fixed` u YAML manifestu radi isto. Ako testovi i dalje padaju nakon toga:

```bash
cd moj-projekt

# Laravel
php artisan test

# Node.js
npm test

# Go
make test
```

Provjeri output greške, zatim koristi AI alat za popravak:

```bash
claude "popravi test koji pada u tests/Feature/PageTest.php"
```

## I dalje zapeo?

Pokreni `tessera doctor` da provjeriš stanje sustava, zatim [otvori issue na GitHubu](https://github.com/drnasin/tessera-installer/issues) s outputom.
