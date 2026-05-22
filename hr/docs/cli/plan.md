---
title: tessera plan — Što će AI napraviti?
description: Pregledaj, usporedi i zamrzni AI recept za build prije nego se potroši ikoji token. Vodič za tri podkomande tessera plan.
---

# `tessera plan` — Što će AI napraviti?

Spremaš se zatražiti od AI-ja da napiše stotine datoteka za tebe. Potrošit će tokene, raditi 5–30 minuta i možda napraviti nešto što nisi očekivao.

`tessera plan` ti omogućuje **pogled na recept prije kuhanja**. Nijedan AI se ne poziva — ove naredbe samo kompajliraju, ispisuju i uspoređuju plan koji bi `tessera new` inače izvršio.

Ako je ovo tvoj prvi dan na Tesseri, pokreni ove tri naredbe barem jednom prije nego što se upustiš u pravo `tessera new` pokretanje.

## Tri podkomande

### `tessera plan compile <yaml> [-o <out.json>]`

Čita stack manifest (YAML) i piše verzioniran, hash-zaštićen `plan.json`.

```bash
$ tessera plan compile stacks/static.yaml
✓ Compiled plan: /home/me/proj/.tessera/plan.json
  stack:      static
  steps:      3
  plan hash:  a53a0aa050046435...
  compiled:   2026-04-28T18:53:05Z
```

Hoćeš li zapisati drugdje? Proslijedi `-o`:

```bash
$ tessera plan compile stacks/static.yaml -o /tmp/before.json
```

Kompajliranje je **čisto** — čita YAML, hašira promptove, validira zavisnosti, piše JSON. Nema mreže, nema AI-ja. Sigurno za pokretanje u bilo koje doba.

### `tessera plan show [<plan.json>]`

Lijepo ispisuje plan. Bez argumenta, prikazuje `.tessera/plan.json` iz trenutnog direktorija.

```bash
$ tessera plan show

Plan: ./.tessera/plan.json
  Stack:    static
  Steps:    3
  Hash:     a53a0aa050046435a6a080477f981de3...
  Compiled: 2026-04-28T18:53:05Z  (compiler v1.0)

Steps (topological order):

  [1] scaffold — [1/3] Creating website
        complexity: complex
        adapter:    (router)    model: (default)
        deps:       -
        fingerprint: e468b96d03e9...
        gates:      exists_any

  [2] polish — [2/3] Validating and polishing
        complexity: medium
        adapter:    (router)    model: (default)
        deps:       scaffold
        fingerprint: ccf069e24b8a...

  [3] setup_md — [3/3] Generating setup instructions
        complexity: simple
        adapter:    (router)    model: (default)
        deps:       polish
        fingerprint: dbfa1ba8e029...
        gates:      exists_any
```

Ovo je točno ono što će `tessera new` izvršiti — tri koraka, ovim redom, s ovim fingerprint-ovima prompta.

### `tessera plan diff <a.json> <b.json>`

Uspoređuje dva plana **semantički** — ne kao sirovi JSON. Govori ti što se zapravo promijenilo, ignorirajući šum poput `compiled_at` timestampa.

```bash
$ tessera plan diff /tmp/before.json /tmp/after.json

Plan diff
  before: /tmp/before.json  hash a53a0aa05004…
  after:  /tmp/after.json   hash 7b91f3e2d840…

  Prompt body changed:
    - scaffold

  Complexity changed:
    - polish
```

**Exit kodovi** — važni su za CI:

| Kod | Značenje |
|---|---|
| `0` | Planovi semantički identični (možeš isporučiti promjenu) |
| `1` | Greška u korištenju (loš put, pokvareni JSON) |
| `2` | Razlike postoje (nije nužno loše — pregledaj ih) |

Pronađena razlika je **signal**, ne greška. Koristi ga kao `git diff`: CI job koji pokreće `tessera plan diff origin/main HEAD` pokrenut će se na svakoj izmjeni prompta, pozivajući na ljudski pregled.

## Što je `plan_hash`?

Svaki kompajlirani plan nosi `plan_hash` — SHA-256 nad determinističkom serijalizacijom fingerprinta, složenosti i zavisnosti svakog koraka, po redu izvršavanja.

Zamisli ga kao otisak prsta cijelog recepta:

- **Isti hash → isti plan.** Identičan posao će biti izvršen.
- **Različit hash → različit plan.** Nešto se promijenilo: prompt, redoslijed koraka, zavisnost, hint složenosti.

Kozmetičke izmjene (preimenovanje `name` polja koraka čitljivog čovjeku) **ne** mijenjaju hash. Povećanje `prompt_version` polja **mijenja**, čak i ako je tijelo prompta bajt-identično — to je cijela poanta `prompt_version`: način prisilnog ponovnog renderiranja bez izmjena teksta.

### Zašto bi te trebalo zanimati

Commitaš `static.yaml`. CI ga kompajlira. Šest mjeseci kasnije, AI build se čudno ponaša. Hoćeš znati: *je li recept isti?*

```bash
$ tessera plan compile stacks/static.yaml -o /tmp/today.json
$ diff <(jq -r .plan_hash /tmp/yesterday.json) <(jq -r .plan_hash /tmp/today.json)
```

Ako se ti hashovi podudaraju, recept se nije odmaknuo. Bug je negdje drugdje — verzija adaptera, ponašanje AI modela, radno okruženje. Ako se ne podudaraju, pokreni `tessera plan diff` da vidiš točno što se promijenilo.

## Kada ćeš posegnuti za ovim naredbama

| Situacija | Naredba |
|---|---|
| "Dotaknuo sam prompt u YAML-u — što to zapravo mijenja?" | `tessera plan diff before.json after.json` |
| "Što će AI napraviti kad pritisnem enter?" | `tessera plan show` |
| "Je li sutrašnji build isti recept kao današnji?" | Usporedi `plan_hash` vrijednosti |
| "Je li moj novi YAML uopće validan?" | `tessera plan compile path.yaml` (glasno će javiti grešku ako nije) |
| "Dodao sam korak — je li zavisnost ispravno spojena?" | `tessera plan show` (pogledaj `deps:` redak) |

## Česte greške

**Ručno uređivanje `plan.json`.** Nemoj. Izvršitelj ponovo izračunava hash pri čitanju; ako tvoje izmjene desynkroniziraju, sljedeći `tessera new --execute` odbacit će plan. Uredi YAML, ponovo kompajliraj.

**Zaboravljanje povećanja `prompt_version`.** Ako "ispravljaš tipfelera" u predlošku prompta ali se ponašanje AI-ja ne bi trebalo promijeniti, i dalje želiš novi fingerprint da `plan diff` označi izmjenu za pregled. Uvijek povećaj `prompt_version` kad dotakneš tijelo prompta, čak i kozmetički.

**Čitanje dugog hasha.** Nitko ne uspoređuje 64 hex znaka na oko. Koristi `tessera plan diff`, ili `jq -r .plan_hash plan.json | head -c 12` za 12-znakový prefiks (bez kolizija u praksi za svaki projekt).

## Vidi također

- [YAML stack manifesti](/hr/docs/architecture/yaml-manifests) — kako stackovi opisuju sebe
- [Trag builda i eventi](/hr/docs/architecture/build-trace) — što se bilježi kad zapravo pokrenuš plan
- [Rješavanje problema](/hr/docs/troubleshooting) — kad `plan compile` javi grešku
