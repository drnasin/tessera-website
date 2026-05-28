---
title: "Tessera vs. ChatGPT"
description: "ChatGPT generira isječke koda. Tessera generira kompletne, deployabilne web projekte — s testovima, admin panelom, seed podacima i tragom builda. Vidi kada koristiti što."
---

# Tessera vs. ChatGPT za generiranje web projekata

I Tessera i ChatGPT koriste velike jezične modele za generiranje koda. Tu prestaje sličnost. ChatGPT je AI asistent opće namjene. Tessera je namjenski generator projekata koji orkestrira AI alate za izgradnju kompletnih, produkcijski spremnih web aplikacija iz jednog razgovora.

## Kako ChatGPT pristupa generiranju projekata

ChatGPT ti može pomoći pisati kod, objašnjavati koncepte i predlagati strukture datoteka. Za generiranje projekata radi ovako:

1. Tražiš da generira model — ispisuje kod u prozor chata
2. Ručno kopiraš taj kod u datoteku
3. Tražiš sljedeći dio — migraciju, factory, controller
4. Opet kopiraš, popravljaš importove koji referenciraju datoteke koje ChatGPT nije vidio
5. Ponavljaš ovo za svaki model, svaki admin resurs, svaki test
6. Kad nešto pokvari, zaljepiš grešku natrag i iteriraš

Za Laravel projekt s pet modela, admin panelom i test suiteom, to su deseci izmjena i sati ručnog kopiranja i debugiranja.

## Kako Tessera pristupa generiranju projekata

Tessera izvršava plan builda — hash-sidreni niz AI koraka, svaki s razinom složenosti, dodijeljenim modelom i determinističkim kontrolnim prolazima:

```bash
tessera new moj-projekt
```

Jedna naredba. AI ti postavlja pitanja, bira stack, generira sve datoteke, pokreće testove i predaje ti radni projektni direktorij. Bez kopiranja. Bez ručnog povezivanja. Bez nedostajućih importova.

## Usporedba: ChatGPT vs. Tessera za Laravel projekt

| | ChatGPT | Tessera |
|---|---|---|
| **Format izlaza** | Kod u prozoru chata | Datoteke zapisane na disk, projekt spreman za pokretanje |
| **Opseg** | Jedan dio po jedan | Kompletan projekt — modeli, tema, admin, testovi, dokumentacija |
| **Konzistentnost datoteka** | Ti osiguravaš podudaranje importova | Upravljano planom builda |
| **Test suite** | Pišeš ili tražiš zasebno | Uključen, prolazi pri generiranju |
| **Admin panel** | Sam scaffoldaš ili tražiš zasebno | Filament resursi za svaki model |
| **Seed podaci** | lorem ipsum ako se sjetiš pitati | Realistični, jezično svjesni sadržaj |
| **Verzije paketa** | Može predložiti nekompatibilne verzije | Stack manifesti koriste testirane, kompatibilne setove |
| **Kontrolni prolazi** | Nema — ručno pregledavaš | Deterministički gateovi neuspješno završavaju build ako output nije ispravan |
| **Trag builda** | Povijest chata | `.tessera/events.jsonl` — svaki AI poziv, svaki rezultat |
| **Nastavak nakon greške** | Počni razgovor iznova | `tessera resume` — nastavlja od posljednjeg završenog koraka |
| **Cijena AI-ja** | Tvoja ChatGPT pretplata | Tvoja Claude / Codex / Gemini pretplata |

## Problem kopiranja i lijepljenja

Ovo je ključni problem s korištenjem ChatGPT-a za generiranje projekata. Pravi Laravel + Filament projekt uključuje:

- 5–10 Eloquent modela s relacijama
- Migracije za svaki model
- Factories i seedere
- Filament resurse (svaki s List, Create, Edit stranicama)
- Tailwind frontend s blok-baziranim stranicama
- PHPUnit feature testove
- SETUP.md vodič za deploy

ChatGPT generira svaki od ovih na zahtjev, jedan po jedan, u prozoru chata. Kopiraš ih u datoteke, otkriješ da User model referencira Role model koji još nije generiran, vratiš se i pitaš za Role, ažuriraš User model, otkriješ da Filament resurs koristi metodu koja ne postoji na modelu, i tako dalje.

Tessera generira cijeli graf u ispravnom redoslijedu. Plan builda zna da `core_models` mora završiti prije nego počne `admin`, da `tests` ovise o oba, i da je `setup_md` uvijek zadnji.

## Što ChatGPT radi bolje

ChatGPT je bolji alat za:

- **Objašnjavanje koda** — razumijevanje zašto nešto funkcionira, ne samo generiranje
- **Debugiranje specifičnih grešaka** — zalijepi grešku, dobij ciljano objašnjenje
- **Istraživanje opcija** — "koji su kompromisi između pristupa A i B?"
- **Nekonvencionalne projekte** — stvari koje ne odgovaraju standardnom stack obrascu
- **Interaktivni razgovor** — preciziranje zahtjeva kroz razgovor
- **Jednokratne skripte** — mali alat koji ne treba punu strukturu projekta

## Rade li zajedno?

Da. Tessera koristi Claude, Codex ili Gemini ispod haube — iste modele koji pokreću AI asistente. Nakon što Tessera generira tvoj projekt, možeš koristiti ChatGPT ili Claude za:

- Dodavanje specifične značajke na generirani model
- Debugiranje problema s poslovnom logikom
- Pisanje jednokratne migracije
- Objašnjavanje generiranog dijela koda koji želiš razumjeti

Tessera se brine za scaffolding. AI asistenti se brinu za tekuća razvojna pitanja.

## Usporedba vremena: ChatGPT vs. Tessera

| Faza | ChatGPT | Tessera |
|---|---|---|
| Inicijalni scaffold projekta | 3–8 h prompting i kopiranje | < 10 minuta |
| Postavljanje admin panela | 1–3 h dodatno | uključeno |
| Testovi koji stvarno prolaze | Još nekoliko rundi | uključeno |
| Seed podaci | Lako zaboraviti, sporo dodati | uključeno |
| Dokumentacija za deploy | Pitaj zasebno, generički rezultat | project-specific SETUP.md |
| **Ukupno do radnog projekta** | **Pola dana do dva dana** | **< 10 minuta** |

Studija slučaja o pekari konkretan je dokaz: [kompletan statični projekt za 9 minuta 39 sekundi](/hr/docs/case/bakery), s objavljenim kompletnim event logom.

## Sažetak

| | ChatGPT | Tessera |
|---|---|---|
| Najbolje za | Pitanja, isječke, debugiranje | Kompletno generiranje projekata |
| Izlaz | Tekst u prozoru chata | Radni projekt na disku |
| Konzistentnost projekta | Ti održavaš | Plan builda održava |
| Kontrolni prolazi | Nema | Deterministički, po koraku |
| Nastavak nakon greške | Počni iznova | `tessera resume` |
| Trag builda | Povijest chata | `.tessera/events.jsonl` |
| Cijena | ChatGPT Plus ili API | Besplatno za osobnu upotrebu — [komercijalna licenca od €249/godišnje](/hr/docs/pricing) |

## Generiraj prvi projekt

- [Što je Tessera?](/hr/docs/what-is-tessera) — kako AI generator projekata funkcionira
- [Instaliraj Tessera CLI](/hr/docs/getting-started) — Composer global install, za manje od minute
- [Tessera vs. ručni scaffolding](/hr/docs/comparison) — ako želiš usporedbu s ručnim radom
- [Vidi pravi build](/hr/docs/case/bakery) — kompletan trag 9-minutnog projekta
