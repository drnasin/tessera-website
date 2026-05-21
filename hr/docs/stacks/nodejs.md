---
title: "Node.js Stack"
description: "Tessera generira kompletne Node.js projekte s TypeScriptom, Prismom, autentikacijom, Dockerom i testovima. AI bira Next.js ili Express prema tvojim zahtjevima."
---

# Node.js Stack (Next.js / Express)

Tesserin AI generator projekata gradi kompletne Node.js aplikacije za API servere, SaaS platforme i real-time aplikacije s React ili Vue frontendima.

## Što se generira

- TypeScript projekt s Next.js ili Express (AI bira prema tvojim zahtjevima)
- Prisma ORM s PostgreSQL
- Autentikacija (next-auth ili passport)
- Docker Compose za razvoj
- Testovi s Jest ili Vitest
- SETUP.md s API dokumentacijom

## Kad AI bira ovaj stack

Tessera preporučuje Node.js kad opišeš:
- API server ili SaaS platformu
- Dashboard s real-time ažuriranjima
- WebSocket ili Server-Sent Events zahtjeve
- React ili Vue frontend preferenciju
- JavaScript/TypeScript kao primarni jezik

## Primjer outputa

```
my-project/
├── src/
│   ├── pages/          # Next.js stranice ili Express rute
│   ├── api/            # API route handleri
│   ├── services/       # Sloj poslovne logike
│   ├── middleware/      # Auth, validacija, rukovanje greškama
│   └── lib/            # Zajednički utiliteti
├── prisma/
│   └── schema.prisma   # Modeli baze s relacijama
├── __tests__/          # Jest/Vitest test suite
├── docker-compose.yml  # PostgreSQL + app
├── .env.example        # Sve env varijable dokumentirane
├── SETUP.md            # Vodič za deploy
└── package.json        # Sve zavisnosti konfigurirane
```

## E-commerce mogućnosti

Kad tvoj projekt treba shop, AI generira:
- Katalog proizvoda s pretraživanjem, filtriranjem i sortiranjem
- Košaricu (localStorage + API sync)
- Checkout flow sa Stripe ili PayPal integracijom
- Upravljanje narudžbama s praćenjem statusa
- Webhook handlere za obavijesti o plaćanju

## Nakon generiranja

```bash
cd my-project
npm install
docker compose up -d    # Pokretanje PostgreSQL
npx prisma migrate dev  # Pokretanje migracija
npm run dev             # Pokretanje dev servera
```

## Kako je build opisan

Node.js AI pipeline deklariran je u `stacks/node.yaml` (4 koraka: `scaffold`, `tests`, `tests_fixed`, `setup_md`). Pregledaj ili uredi ga kao bilo koji drugi manifest — vidi [YAML stack manifeste](/hr/docs/architecture/yaml-manifests). Za pregled što će `tessera new --stack=node` izvršiti:

```bash
tessera plan compile stacks/node.yaml
tessera plan show
```

## Povezani stackovi

Treba li ti drugačiji pristup? Tessera podržava i [Laravel](/hr/docs/stacks/laravel) za sadržajem upravljane web stranice, [Go](/hr/docs/stacks/go) za visoko-performantne mikroservise, [Flutter](/hr/docs/stacks/flutter) za mobilne aplikacije i [Static](/hr/docs/stacks/static) za landing stranice.
