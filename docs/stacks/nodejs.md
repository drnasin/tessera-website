---
title: "Node.js Stack"
description: "Tessera generates complete Node.js projects with TypeScript, Prisma, authentication, Docker, and tests. AI picks Next.js or Express based on your requirements."
---

# Node.js Stack (Next.js / Express)

Tessera's AI project generator builds complete Node.js applications for API servers, SaaS platforms, and real-time applications with React or Vue frontends.

## What Gets Generated

- TypeScript project with Next.js or Express (AI picks based on your requirements)
- Prisma ORM with PostgreSQL
- Authentication (next-auth or passport)
- Docker Compose for development
- Tests with Jest or Vitest
- SETUP.md with API documentation

## When AI Picks This Stack

Tessera recommends Node.js when you describe:
- An API server or SaaS platform
- A dashboard with real-time updates
- WebSocket or Server-Sent Events requirements
- React or Vue frontend preference
- JavaScript/TypeScript as the primary language

## Example Output

```
my-project/
├── src/
│   ├── pages/          # Next.js pages or Express routes
│   ├── api/            # API route handlers
│   ├── services/       # Business logic layer
│   ├── middleware/      # Auth, validation, error handling
│   └── lib/            # Shared utilities
├── prisma/
│   └── schema.prisma   # Database models with relations
├── __tests__/          # Jest/Vitest test suite
├── docker-compose.yml  # PostgreSQL + app
├── .env.example        # All env vars documented
├── SETUP.md            # Deployment guide
└── package.json        # All dependencies configured
```

## E-Commerce Capabilities

When your project needs a shop, AI generates:
- Product catalog with search, filtering, and sorting
- Shopping cart (localStorage + API sync)
- Checkout flow with Stripe or PayPal integration
- Order management with status tracking
- Webhook handlers for payment notifications

## After Generation

```bash
cd my-project
npm install
docker compose up -d    # Start PostgreSQL
npx prisma migrate dev  # Run migrations
npm run dev             # Start dev server
```

## Related Stacks

Need a different approach? Tessera also supports [Laravel](/docs/stacks/laravel) for content-managed websites, [Go](/docs/stacks/go) for high-performance microservices, [Flutter](/docs/stacks/flutter) for mobile apps, and [Static](/docs/stacks/static) for landing pages.
