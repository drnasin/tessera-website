---
title: "Pametno usmjeravanje modela"
description: "Tessera usmjerava svaki zadatak generiranja koda na najbolji AI alat i model — Claude, Gemini ili Codex. Usmjeravanje ovisno o planu, upravljanje rate limitima i deterministički kontrolni prolazi."
---

# Inteligentno usmjeravanje AI poziva

Tessera ne koristi samo jedan AI alat — svaki zadatak generiranja koda usmjerava na **najbolji alat i model** za posao. Ovaj pristup s više AI alata daje bolje rezultate nego bilo koji jedini alat.

## Kako radi

| Složenost | Zadano | Lanac rezerve |
|---|---|---|
| **Jednostavno** | Claude Haiku | Gemini Flash → Codex |
| **Srednje** | Claude Sonnet | Gemini Pro → Claude Haiku → Gemini Flash |
| **Složeno** | Claude Opus | Gemini Pro → Claude Sonnet → Gemini Flash |

Jedan build projekta može koristiti Claude Opus za arhitekturu baze, Gemini Flash za SETUP.md i Claude Sonnet za testove — svaki zadatak automatski usmjeren na najbolji model.

## Usmjeravanje ovisno o planu

Tijekom postavljanja, Tessera pita o tvojim AI pretplatnim planovima radi optimizacije usmjeravanja i troškova:

```
Koje AI planove imaš?
  Claude plan: [Max (neograničen) / Pro / Besplatni]
  Codex plan:  [Plus (ChatGPT Plus) / Besplatni]
  Gemini plan: [Pro (Google One AI Premium) / Besplatni]
```

| Razina plana | Primjeri | Ponašanje usmjeravanja |
|---|---|---|
| **Neograničeno** | Claude Max | Preferiran za sve |
| **Velikodušno** | Claude Pro, Codex Plus | Preferiran ali uravnotežen |
| **Ograničeno** | Besplatne razine | Samo kao rezerva |

S Claude Maxom, čak i jednostavni zadaci koriste Claude (Haiku) — nema razloga usmjeravati drugdje kad je besplatno.

## Upravljanje rate limitima

Ako alat dosegne rate limit usred builda, Tessera automatski reagira:
1. Detektira grešku (prepoznaje 13 različitih uzoraka)
2. Označava alat s 2-minutnim hladnjakom
3. Prebacuje na sljedeći alat u lancu rezerve
4. Prikazuje što se dogodilo: `claude rate-limited (cooldown: 120s). Trying next tool...`

Nema ručnog posredovanja. Build se nastavlja.

## Kontrolni prolazi — hvatanje "done!" kad nema ničega

Nakon što svaki AI korak završi, Tessera pokreće **kontrolne prolaze** deklarirane u YAML manifestu stacka. Kontrolni prolaz je deterministička post-provjera — bez AI-ja, bez procjene — koja pita: je li AI zaista napravio što je rekao da je napravio?

```
✓ Dizajn frontend teme            (claude opus, 4m 12s)
   gate: exists_any [resources/views/themes/default/layouts/master.blade.php] → pass
✓ Izgradnja admin panela          (claude opus, 6m 03s)
   gate: exists_any [app/Filament/Resources/PageResource.php] → pass
```

Pad `hard` kontrolnog prolaza zaustavlja korak. Pad `soft` kontrolnog prolaza bilježi se i build nastavlja. Sprint 1 podržava `exists_any` i `exists_all`; Sprint 2 dodaje `not_empty`, `contains`, `min_size` i `command_passes` (npr. "korak prolazi samo ako `php -l` uspije na svakoj promijenjenoj datoteci").

Ovo zamjenjuje stariji pristup "peer reviewa" (drugi AI ocjenjuje output prvog AI-ja): kontrolni prolazi su deterministički, ne troše tokene i proizvode strojno čitljive dokaze u `events.jsonl` koje možeš auditirati kasnije. Vidi [trag builda i eventi](/hr/docs/architecture/build-trace) za puni oblik eventa.

## Provjeri svoje usmjeravanje

Pokreni `tessera tools` da vidiš koji su AI alati instalirani i kako će se zadaci usmjeravati:

```bash
tessera tools
```

```
Available AI tools:
✓ claude: 2.1.75
✓ gemini: 0.32.1
✓ codex: 0.98.0

AI routing:
  plans: claude=max (unlimited), codex=plus (generous), gemini=free (limited)
  simple: claude (claude-haiku-4-5-20251001)
  medium: claude (claude-sonnet-4-20250514)
  complex: claude (claude-opus-4-20250514)
```

Korisno nakon instalacije novog AI alata ili za provjeru ispravnosti konfiguracije plana.

## Sažetak korištenja

Na kraju svakog builda, Tessera prikazuje koliko je poziva svaki alat obradio:

```
AI usage: claude: 5 calls (2 opus, 2 sonnet, 1 haiku) | gemini: 2 calls (2 flash)
```

## Varijable okruženja

Većini korisnika ovo ne treba — installer pita interaktivno. Za CI/CD ili automatizaciju:

```bash
TESSERA_CLAUDE_PLAN=max       # max | pro | free
TESSERA_CODEX_PLAN=plus       # plus | free
TESSERA_GEMINI_PLAN=free      # pro | free
TESSERA_TOOL_PREFERENCE=gemini,claude,codex  # prilagođeni redoslijed
TESSERA_TOOL_EXCLUDE=codex    # nikad ne koristi ovaj alat
TESSERA_SAFE_AI=1             # samo Claude — uklanja --dangerously-skip-permissions
TESSERA_AI_TIMEOUT=900        # sekunde po AI koraku (zadano 900)
```

Vidi [Sigurnosni model](/hr/docs/disclaimer#sigurnosni-model) za što `TESSERA_SAFE_AI` mijenja, zašto trenutno utječe samo na Claude i kako se AI vjerodajnice izoliraju između podprocesa.

## Povezano

- [Kreiranje projekta](/hr/docs/creating-project) — vidi usmjeravanje AI poziva u akciji tijekom punog builda
- [Nastavak i oporavak](/hr/docs/resume) — što se događa kad usmjereni zadatak padne
