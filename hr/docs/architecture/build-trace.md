---
title: Trag builda — Što se dogodilo tijekom builda
description: Čitaj state.json, events.jsonl i plan.json da rekonstruiraš točno što je Tessera napravila, kad i zašto.
---

# Trag builda — Što se dogodilo tijekom builda

Tessera je radila 25 minuta. AI je potrošio tokene. Nešto nije u redu s outputom. Gdje gledaš?

Svaki Tessera build ostavlja tri artefakta u `.tessera/` unutar direktorija projekta. Zajedno odgovaraju na svako pitanje koje junior developer može postaviti o završenom buildu, i većinu pitanja o onom u tijeku.

## Tri artefakta

### `state.json` — trenutno stanje builda

Odgovor na pitanje "gdje sam sada?". Koristi ga `tessera new` sam za nastavak napola završene instalacije.

```json
{
  "schema": "tessera.state/v1",
  "project": "bakery-test",
  "stack": "static",
  "trace_id": "6661a625c1814d2e",
  "status": "complete",
  "started_at": "2026-04-28 18:53:05",
  "updated_at": "2026-04-28 19:02:44",
  "completed_steps": [
    {"name": "scaffold", "completed_at": "..."},
    {"name": "setup_md", "completed_at": "..."}
  ],
  "skipped_steps": [],
  "failed_steps": [{"name": "polish", "error": "Adapter returned non-zero exit."}],
  "current_step": null
}
```

### `events.jsonl` — event log koji se samo dopisuje (append-only)

Svaki važan događaj koji se dogodio, jedan JSON event po retku. Sortirano po pojavi. Nikad se ne uređuje, nikad se ne skraćuje.

```json
{"schema":"tessera.event/v1","type":"build.start","trace_id":"6661a625c1814d2e","occurred_at":"2026-04-28T18:53:05Z","payload":{"stack":"static","plan_hash":"a53a0aa050046435...","step_count":3}}
```

### `plan.json` — recept

Kompajlirani plan koji je `tessera new` trebao izvršiti. Vidi [`tessera plan`](/hr/docs/cli/plan).

## Diskriminator sheme

Svaki artefakt počinje poljem `"schema": "tessera.<artifact>/v<N>"`:

- `tessera.state/v1`
- `tessera.event/v1`
- `tessera.plan/v1`
- `tessera.gate-result/v1` (ugrađen unutar gate eventa)

Kad v2 stigne, v1 čitači moraju odbiti v2 artefakte (eksplicitna greška bolja je od tihe krive interpretacije). v2 čitači MOGU prihvatiti v1 artefakte. Ovo provodi `ArtifactValidator` pri svakom čitanju.

## Trace ID

Kad `tessera new` počne, generira `trace_id` (16 hex znakova) i piše ga jednom u `state.json`. Svaki event u `events.jsonl` nosi isti `trace_id`. Ovako koreliraš sve kad više buildova dodiruje isti stroj, ili kad se redovi loga isprepliću.

```bash
$ jq -r .trace_id .tessera/state.json
6661a625c1814d2e

$ grep '"trace_id":"6661a625c1814d2e"' .tessera/events.jsonl | wc -l
17
```

## Redoslijed eventa s pojašnjenjima

Evo stvarnog (skraćenog) `events.jsonl` iz uspješnog Static builda, po redu:

```json
{"type":"build.start","payload":{"stack":"static","plan_hash":"a53a0aa05004...","context_hash":"62f54864...","step_count":3}}
{"type":"step.start","payload":{"step_id":"scaffold","complexity":"complex","adapter_resolved":"claude","model_resolved":"claude-opus-4-20250514","template_fingerprint":"e468b96d03e9...","rendered_prompt_hash":"fb7460c9c408...","skippable":false}}
{"type":"ai.call.start","payload":{"adapter":"claude","model":"claude-opus-4-20250514","timeout":1200,"step":"scaffold"}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":true,"exit_code":0,"duration_ms":505708,"output_size":1728}}
{"type":"gate.pass","payload":{"step":"scaffold","gate":"exists_any","severity":"hard","passed":true,"message":"Found 'index.html' (matched 1)"}}
{"type":"step.complete","payload":{"step_id":"scaffold","duration_ms":505709,"gates_evaluated":1,"gates_passed":1}}
{"type":"step.start","payload":{"step_id":"polish","complexity":"medium","model_resolved":"claude-sonnet-4-20250514","skippable":true}}
{"type":"ai.call.complete","payload":{"adapter":"claude","success":false,"exit_code":1,"duration_ms":7432}}
{"type":"step.skip","payload":{"step_id":"polish","exit_code":1,"error_excerpt":"Adapter returned non-zero exit.","skippable":true}}
```

Što ovo govori, jednostavnim jezikom:

1. **Build je počeo** — recept `a53a…`, planirana tri koraka.
2. **Korak `scaffold` je počeo** — odabran Claude Opus, predložak prompta `e468b96d…`, nakon renderiranja postao `fb7460c9…`.
3. **AI poziv je trajao 8 minuta** (`duration_ms: 505708`) i uspio.
4. **Gate je prošao** — `index.html` je stvarno zapisan. AI nije lagao.
5. **Korak `polish` se pokrenuo**, AI vratio exit 1 (rate limit, prolazna greška, tko zna), i jer je `skippable: true`, build je nastavio.

Tri hasha na `step.start` eventu omogućavaju rekonstrukciju točnog prompta:

- `template_fingerprint` — `{{var}}` predložak prije supstitucije.
- `context_hash` — `RenderContext` (opis, boje dizajna itd.).
- `rendered_prompt_hash` — stvarni bajtovi koji su stigli do AI-ja.

Isti predložak + isti kontekst → isti renderirani prompt. Ako se dva builda razlikuju u `rendered_prompt_hash` za isti korak, nešto u kontekstu se odmaklo.

## RenderContext

`RenderContext` je skup vrijednosti koje se supstituiraju u predloške prompta pri renderiranju. Polja u Sprintu 1:

| Polje | Izvor | Pouzdano? |
|---|---|---|
| `description` | iz zahtjeva (korisnik) | ne |
| `designStyle` | iz zahtjeva (korisnik) | ne |
| `designColors` | iz zahtjeva (korisnik) | ne |
| `languages`, `langs` | iz zahtjeva (korisnik) | da (langs) |
| `country` | iz zahtjeva (korisnik) | ne |
| `userRequirements` | iz zahtjeva (korisnik) | ne |
| `needsShop`, `shop` | iz zahtjeva (korisnik) | ne |
| `payments`, `paymentProviders` | iz zahtjeva (korisnik) | ne |
| `systemContext` | iz `SystemInfo::buildAiContext()` | da |
| `memoryContext` | iz `Memory::buildAiContext()` | da |
| `nodeVersion` | detektiran iz `node --version` | da |
| `goVersion` | detektiran iz `go version` | da |
| `flutterVersion` | detektiran iz `flutter --version` | da |
| `stackVersions` | kompozit (Laravel: PHP + Composer + framework) | da |

Pouzdana polja se inline-aju sirovo u renderirani prompt; nepouzdana polja se omotavaju u `<<<USER_DATA name="...">>>...<<<END_USER_DATA>>>` blokove. Sprint 2 će podijeliti `RenderContext` na korisničke/okolišne/sistemske slojeve — additivno, bez promjene sheme.

## Zašto se stanje zapisuje prije eventa

Kad korak završi, Tessera piše u `state.json` **prije** nego doda u `events.jsonl`. Ovo je važno kad je build ubijen usred koraka (Ctrl+C, OOM, rušenje stroja):

- Ako se ubijanje dogodi između dva pisanja, audit log nedostaje jedan event ali `state.json` je ispravan. Nastavak se odvija čisto bez dupliciranja posla.
- Suprotno — eventi zapisani prvi — značilo bi uspješan unos audit loga za posao koji engine za nastavak ne smatra završenim. Nastavak bi ga ponovo pokrenuo. To je gore od nedostajućeg retka loga.

Ovo je namjeran kompromis: **ispravnost nastavka > potpunost audita**.

## Česta pitanja za debugging

```bash
# Koji AI alat je korišten za polish korak?
$ jq 'select(.payload.step_id == "polish") | .payload.adapter_resolved' .tessera/events.jsonl

# Koliko dugo je scaffold korak trajao?
$ jq 'select(.type == "step.complete" and .payload.step_id == "scaffold") | .payload.duration_ms' .tessera/events.jsonl

# Zašto je polish korak preskočen?
$ jq 'select(.type == "step.skip") | .payload' .tessera/events.jsonl

# Koji gate-ovi su pali (kroz sve korake)?
$ jq 'select(.type == "gate.fail") | .payload' .tessera/events.jsonl

# Ukupno AI vrijeme vs. ukupno trajanje
$ jq 'select(.type == "ai.call.complete") | .payload.duration_ms' .tessera/events.jsonl | paste -sd+ | bc
```

Ako nemaš `jq`, datoteka je jedan JSON event po retku — `grep` i oči rade sasvim dobro za male buildove.

## Što dolazi u Sprintu 2

`tessera analyze <project>` će sve ovo pretvoriti u jednokratni izvještaj razumljiv čovjeku:

```text
Build a53a0aa050... — bakery-test
  3 steps planned, 2 completed, 1 skipped (polish, transient error)
  AI time:  8m 33s     Wall time:  9m 39s
  Adapters: claude (3 calls, all)
  Cost:     ~€0.42 estimated
  Gates:    2 passed (hard), 0 failed
  ⚠ polish step skipped — re-run with `tessera replay polish` if needed
```

Do tada: čitaj JSON. Sve je tamo.

## Vidi također

- [`tessera plan`](/hr/docs/cli/plan) — pregledaj plan prije pokretanja
- [YAML stack manifesti](/hr/docs/architecture/yaml-manifests) — kako se koraci definiraju
- [Adapter sustav](/hr/docs/architecture/adapter-system) — što znači `adapter_resolved`
