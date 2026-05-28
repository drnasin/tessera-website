---
title: "Što je Tessera?"
description: "Tessera je CLI alat koji generira kompletne web projekte uz pomoć AI-ja. Saznaj što radi, kako funkcionira i što ti je potrebno za početak."
---

# Što je Tessera?

Tessera je **CLI alat** koji generira kompletne web projekte uz pomoć AI-ja. Opišeš što ti treba normalnim jezikom, a AI gradi sve — bazu podataka, backend, frontend, admin panel, testove i upute za deploy.

## Komu je namijenjena?

- **Freelancerima** koji trebaju brzo isporučiti klijentske projekte
- **Programerima** koji žele preskočiti boilerplate i scaffolding
- **Agencijama** koje grade više stranica sa sličnim obrascima
- **Studentima** koji uče kako izgledaju projekti iz stvarnog života

## Što radi AI generator web projekata?

Kad pokreneš `tessera new moj-projekt`, Tessera:

1. **Pita te** — što klijent radi, koji jezici, plaćanje, stil dizajna
2. **Bira tech stack** — Laravel, Node.js, Go, Flutter ili Static, na temelju tvojih odgovora
3. **Generira sve** — modele, stranice, admin panel, sadržaj, testove, dokumentaciju za deploy
4. **Provjerava vlastiti rad** — deterministički kontrolni prolazi verificiraju svaki korak

Rezultat je radni projekt koji možeš pokrenuti lokalno i deployati na produkciju.

## Preduvjeti: PHP, Composer i AI CLI alat

- **PHP 8.4+** — programski jezik u kojem je Tessera napisana
- **Composer** — package manager za PHP (slično npm-u za JavaScript)
- **Barem jedan AI alat** — Claude, Codex ili Gemini instaliran na tvom računalu

Nemaš još ništa od toga? Vodič za [Instalaciju i postavljanje](/hr/docs/getting-started) vodi te kroz sve korak po korak.

## Tessera vs. ChatGPT i GitHub Copilot

ChatGPT i Copilot pomažu ti pisati kod **jednu datoteku po jednu**. Tessera generira **cijeli projekt** — desetke datoteka koje zajedno funkcioniraju. Razumije kako se modeli vežu na prikaze, kako admin paneli mapiraju tablice baze podataka i kako testovi trebaju pokriti generirani kod.

Da bi to bilo jasno:
- **ChatGPT** = tražiš od programera da napiše funkciju
- **Tessera** = zapošljavaš programera da izgradi cijeli projekt

## Što su AI tokeni?

Kad Tessera komunicira s AI alatima poput Claudea ili Geminija, svaki zahtjev troši **tokene** — jedinice teksta koje AI obrađuje. Složeniji zadaci troše više tokena.

- **Besplatni planovi** imaju ograničen broj tokena dnevno
- **Plaćeni planovi** (poput Claude Max) daju neograničen ili veći broj
- Tessera pazi na potrošnju tokena — bira najjeftiniji AI model koji može obaviti svaki zadatak

Tesseri ne plaćaš ništa. Plaćaš za AI alate koje već imaš instalirane.

## Košta li nešto?

Tessera je **besplatna za nekomercijalno korištenje**. Plaćaš samo AI pretplate koje već imaš (Claude, Gemini, Codex). Detalje o komercijalnom korištenju pogledaj na stranici [Licenca](/hr/docs/license).

## Sljedeći koraci

- [Instalacija i postavljanje](/hr/docs/getting-started) — instaliraj Tesserou i kreiraj prvi projekt
- [Kreiranje projekta](/hr/docs/creating-project) — vidi cijeli proces gradnje
- [Tech stackovi](/hr/docs/stacks/laravel) — što svaki stack generira
