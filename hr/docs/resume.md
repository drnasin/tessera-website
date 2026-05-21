---
title: "Nastavak i oporavak"
description: "Tessera sprema napredak nakon svakog koraka. Ako build padne, istupi ili bude prekinut, nastavi od mjesta gdje je stao — bez trošenja AI tokena."
---

# Nastavak i oporavak

Generiranje AI projekata može uključivati više koraka i AI poziva. Tessera osigurava da nikad ne izgubiš napredak — čak i ako nešto pođe po krivu usred builda.

## Kako radi

Tessera sprema napredak u `.tessera/state.json` nakon svakog završenog koraka. Ako build padne, istekne ili pritisneš Ctrl+C — napredak je sačuvan.

Pokreni istu naredbu ponovo:

```
$ tessera new my-shop

Found previous installation (stack: laravel, status: in_progress)
  Completed steps: 4
    ✓ packages
    ✓ filament
    ✓ configs
    ✓ structure

[0] Resume — continue from where it stopped
[1] Start fresh — overwrite everything
[2] Abort
```

Nastavak preskače sve završene korake i nastavlja od mjesta gdje je stao. Nema potrebe ponovo opisivati projekt ili birati stack.

## Atomično stanje

Pisanje stanja koristi obrazac privremena datoteka + preimenovanje. Ako se proces sruši usred pisanja, datoteka stanja ostaje netaknuta — bez korupcije. Isti pristup koriste baze podataka za sigurnost pri rušenju.

## Postavljanje baze pri nastavku

Kad nastavljaš projekt koji koristi MySQL ili PostgreSQL, Tessera ponovo pita za podatke baze, testira vezu i nastavlja. Ako se ne može spojiti na bazu, automatski prelazi na SQLite.

## Povezano

- [Kreiranje projekta](/hr/docs/creating-project) — cijeli proces builda koji nastavak štiti
- [Usmjeravanje AI poziva](/hr/docs/ai-routing) — kako rezervni mehanizmi pri rate limitu dopunjuju nastavak
- [Instalacija i postavljanje](/hr/docs/getting-started) — instaliraj Tesseru i kreiraj prvi projekt
