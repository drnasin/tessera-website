---
title: "Tessera vs. GitHub Copilot za generiranje projekata"
description: "GitHub Copilot automatski dovršava kod unutar editora. Tessera generira kompletan, deployabilan web projekt iz jednog razgovora. Različiti alati, različiti poslovi — vidi što odgovara tvojoj situaciji."
---

# Tessera vs. GitHub Copilot za generiranje projekata

GitHub Copilot i Tessera oba koriste AI za pisanje koda. Razlika je u tome od čega polaze. Copilot radi unutar editora, predlažući sljedeći redak ili funkciju dok tipkaš. Tessera polazi od opisa onoga što želiš izgraditi i isporučuje kompletan, radni projekt.

## Što radi GitHub Copilot

Copilot je AI asistent za programiranje unutar editora. Njegovi glavni načini rada:

- **Inline dopunjavanje** — predlaže sljedeći redak, funkciju ili blok dok tipkaš
- **Copilot Chat** — panel za chat unutar VS Code-a ili JetBrainsa za postavljanje pitanja i traženje izmjena u otvorenim datotekama
- **Copilot Workspace** — agentski način rada koji može planirati i primijeniti izmjene u više datoteka unutar *postojećeg* repozitorija

Copilot je odličan za svakodnevni razvoj unutar postojećeg projekta. Nije dizajniran za scaffolding novih projekata od nule.

## Što radi Tessera

Tessera je CLI generator projekata. Opišeš što trebaš, a ona generira cijeli projekt:

```bash
tessera new moj-projekt
```

AI te pita o projektu — što klijent radi, koji jezici, plaćanje, stil dizajna — bira ispravni stack i generira sve datoteke: modele, migracije, admin panel, frontend temu, seed podatke, testove i dokumentaciju za deploy.

## Usporedba: GitHub Copilot vs. Tessera

| | GitHub Copilot | Tessera |
|---|---|---|
| **Primarna svrha** | Dopunjavanje koda i chat unutar editora | Generiranje novih projekata iz razgovora |
| **Polazna točka** | Postojeća datoteka ili repozitorij | Opis onoga što treba izgraditi |
| **Izlaz** | Prijedlozi koda unutar editora | Kompletan projektni direktorij na disku |
| **Opseg novog projekta** | Predlaže kod za datoteke koje otvoriš | Generira sve datoteke kroz cijeli projekt |
| **Admin panel** | Piše Filament kod ako tražiš, datoteka po datoteka | Puni Filament resursi za svaki model, generirani automatski |
| **Test suite** | Piše testove ako tražiš | Uključen i prolazi pri prvom generiranju |
| **Seed podaci** | Piše factories ako tražiš | Realistični, jezično svjesni sadržaj generiran automatski |
| **Dokumentacija za deploy** | Nije uključena | SETUP.md specifičan za projekt |
| **Kontrolni prolazi** | Nema | Deterministički gateovi koji neuspješno završavaju build ako output nije ispravan |
| **Trag builda** | Nema osim gita | `.tessera/events.jsonl` — svaki AI poziv, svaki rezultat |
| **Nastavak nakon greške** | N/A | `tessera resume` nastavlja od posljednjeg završenog koraka |
| **Cijena** | 10–19 $/mj. | Besplatno za osobnu upotrebu — [komercijalna licenca od €249/godišnje](/hr/docs/pricing) |

## Problem novog projekta

Tu je razlika najvidljivija. Kad pokrećeš novi Laravel + Filament projekt s Copilotom:

1. `composer create-project laravel/laravel moj-projekt` — pokrećeš sâm
2. Otvoriš projekt u VS Code-u — Copilot se aktivira
3. Tražiš od Copilot Chata da generira model `Product` — zapisuje klasu u otvorenu datoteku
4. Tražiš migraciju — piše je, ali referencira model koji ne vidi
5. Tražiš Filament resurs — generira boilerplate koji može ili ne mora odgovarati modelu
6. Tražiš factories — piše ih, koristeći `lorem ipsum` za string polja
7. Tražiš testove — piše testove koji mogu proći ili ne, ovisno o pretpostavkama o modelu

I dalje si u petlji za svaki korak, pregledavaš i popravljaš dok ideš. Kompletan projekt traje sate.

S Tesserom:

```bash
tessera new moj-projekt
```

Deset minuta kasnije imaš kompletan projekt — svaki model, svaki Filament resurs, factories s realističnim podacima, prolazeće PHPUnit testove i SETUP.md. Plan builda je upravljao redoslijedom, kontrolni prolazi verificirali svaki korak, a event log snimio sve.

## Copilot Workspace vs. Tessera

Copilot Workspace je GitHubova agentskija ponuda — može planirati i implementirati izmjene u više datoteka unutar postojećeg repozitorija. Bliži je Tesseri konceptom, ali se i dalje razlikuje po opsegu:

| | Copilot Workspace | Tessera |
|---|---|---|
| Polazna točka | Postojeći repozitorij | Novi projekt |
| Okvir zadatka | GitHub issue ili prirodnojezičan zahtjev za izmjenu | Razgovor o opisu projekta |
| Odabir stacka | Na tebi | AI bira prema tvojim odgovorima |
| Kontrolni prolazi | Nema ugrađenih | Deterministički, po koraku |
| Trag builda | Sesija Workspacea | `.tessera/events.jsonl` |
| Nastavak | N/A | `tessera resume` |

Copilot Workspace je jak za dodavanje značajki postojećim bazama koda. Tessera je namjenski izgrađena za generiranje novih.

## Što GitHub Copilot radi bolje

Copilot pobjeđuje u svemu što se događa *nakon* što projekt postoji:

- **Inline prijedlozi** — najbrži način pisanja metode čiji oblik već znaš
- **Objašnjavanje nepoznatog koda** — čitanje baze koda kojoj si se tek pridružio
- **Refaktoriranje postojećeg koda** — preimenovanje, ekstrakcija, restrukturiranje
- **Širina jezika** — Copilot radi u bilo kojem jeziku i bilo kojem editoru
- **Integracija s IDE-om** — pristup bez trenja odakle već programiraš
- **Zadaci na postojećoj bazi koda** — dodavanje značajke živom proizvodu

## Rade li zajedno?

Da — ovo je namijenjeni tijek rada za većinu timova:

1. **Tessera** generira inicijalni projekt — modele, admin, testove, temu, dokumentaciju — za nekoliko minuta
2. **Copilot** pomaže sa svakom značajkom, ispravkom i refaktoriranjem od tog trenutka nadalje

Tessera eliminira dio za koji Copilot nije dizajniran. Copilot ubrzava dio za koji Tessera nije dizajnirana.

## Sažetak

| | GitHub Copilot | Tessera |
|---|---|---|
| Najbolje za | Svakodnevno programiranje unutar postojećih projekata | Generiranje novih projekata od nule |
| Izlaz | Prijedlozi koda u editoru | Kompletan radni projekt na disku |
| Postavljanje novog projekta | Datoteka po datoteka, ti orkestriraš | Cijeli projekt, AI orkestrira |
| Kontrolni prolazi | Nema | Deterministički, po koraku |
| Trag builda | Nema | `.tessera/events.jsonl` |
| Admin panel | Na zahtjev, ručno integrirano | Uključen |
| Testovi koji prolaze | Na zahtjev, ručno verificirani | Uključeni |
| Nastavak nakon greške | N/A | `tessera resume` |

## Pokreni novi projekt bez uobičajenog postavljanja

- [Što je Tessera?](/hr/docs/what-is-tessera) — kako AI generator projekata funkcionira
- [Instaliraj Tessera CLI](/hr/docs/getting-started) — Composer global install, za manje od minute
- [Tessera vs. ručni scaffolding](/hr/docs/comparison) — usporedba s ručnim radom
- [Tessera vs. ChatGPT](/hr/docs/comparison-chatgpt) — usporedba s AI asistentom opće namjene
- [Vidi pravi build](/hr/docs/case/bakery) — hrvatska pekara, 9 minuta 39 sekundi
