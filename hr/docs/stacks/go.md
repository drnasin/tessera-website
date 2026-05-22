---
title: "Go Stack"
description: "Tessera generira produkcijski spreman Go backend s Chi/Gin routerom, slojem baze podataka, Dockerom, strukturiranim logiranjem i testovima. Napravljeno za sustave s visokim paralelizmom."
---

# Go Stack (Backend / API / Mikroservis)

Tesserin AI generator projekata gradi produkcijski Go backende za sustave koji trebaju visoke performanse i tisuće paralelnih korisnika.

## Što se generira

- Go projekt s Chi ili Gin routerom
- GORM ili sqlc za pristup bazi podataka
- Docker + PostgreSQL
- Strukturirano logiranje (slog)
- Health check i readiness endpointi
- Makefile za uobičajene zadatke
- Sveobuhvatni testovi
- SETUP.md s API dokumentacijom

## Kad AI bira ovaj stack

Tessera preporučuje Go kad opišeš:
- Visoko-performantni backend ili mikroservis
- 1000+ paralelnih korisnika
- Procesiranje plaćanja ili financijski sustavi
- IoT gateway ili real-time data pipeline
- CLI alate ili DevOps utilitete

## Primjer outputa

```
my-project/
├── cmd/server/
│   └── main.go             # Entry point, graceful shutdown
├── internal/
│   ├── config/             # Konfiguracija temeljena na okolini
│   ├── handler/            # HTTP handleri po domeni
│   ├── middleware/          # Auth, logiranje, CORS, recovery
│   ├── model/              # Domain strukture
│   ├── repository/         # Sloj baze podataka (GORM)
│   ├── service/            # Poslovna logika
│   └── router/             # Registracija ruta
├── migrations/             # SQL migracijske datoteke
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # App + PostgreSQL
├── Makefile                # build, run, test, migrate
├── .env.example            # Sva konfiguracija dokumentirana
└── SETUP.md                # API dokumentacija + deploy
```

## Nakon generiranja

```bash
cd my-project
make docker-up    # Pokretanje PostgreSQL
make migrate      # Pokretanje migracija
make run          # Pokretanje servera
# API na http://localhost:8080
```

## Kako je build opisan

Go AI pipeline živi na `stacks/go.yaml` (4 koraka). Uredi ili pregledaj ga putem [`tessera plan`](/hr/docs/cli/plan):

```bash
tessera plan compile stacks/go.yaml
tessera plan show
```

Za pisanje vlastite Go varijante, vidi [YAML stack manifeste](/hr/docs/architecture/yaml-manifests).

## Povezani stackovi

Treba li ti drugačiji pristup? Tessera podržava i [Laravel](/hr/docs/stacks/laravel) za sadržajem upravljane web stranice, [Node.js](/hr/docs/stacks/nodejs) za JavaScript full-stack, [Flutter](/hr/docs/stacks/flutter) za mobilne aplikacije i [Static](/hr/docs/stacks/static) za landing stranice.
