---
title: "Go Stack"
description: "Tessera generates production-ready Go backends with Chi/Gin router, database layer, Docker, structured logging, and tests. Built for high-concurrency systems."
---

# Go Stack (Backend / API / Microservice)

Tessera's AI project generator builds production-grade Go backends for systems that need high performance and thousands of concurrent users.

## What Gets Generated

- Go project with Chi or Gin router
- GORM or sqlc for database access
- Docker + PostgreSQL
- Structured logging (slog)
- Health check and readiness endpoints
- Makefile for common tasks
- Comprehensive tests
- SETUP.md with API documentation

## When AI Picks This Stack

Tessera recommends Go when you describe:
- A high-performance backend or microservice
- 1000+ expected concurrent users
- Payment processing or financial systems
- IoT gateway or real-time data pipeline
- CLI tools or DevOps utilities

## Example Output

```
my-project/
├── cmd/server/
│   └── main.go             # Entry point, graceful shutdown
├── internal/
│   ├── config/             # Environment-based configuration
│   ├── handler/            # HTTP handlers per domain
│   ├── middleware/          # Auth, logging, CORS, recovery
│   ├── model/              # Domain structs
│   ├── repository/         # Database layer (GORM)
│   ├── service/            # Business logic
│   └── router/             # Route registration
├── migrations/             # SQL migration files
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # App + PostgreSQL
├── Makefile                # build, run, test, migrate
├── .env.example            # All config documented
└── SETUP.md                # API docs + deployment
```

## After Generation

```bash
cd my-project
make docker-up    # Start PostgreSQL
make migrate      # Run migrations
make run          # Start server
# API at http://localhost:8080
```

## How the build is described

The Go AI pipeline lives at `stacks/go.yaml` (4 steps). Edit or preview it via [`tessera plan`](/docs/cli/plan):

```bash
tessera plan compile stacks/go.yaml
tessera plan show
```

To author your own Go variant, see [YAML stack manifests](/docs/architecture/yaml-manifests).

## Related Stacks

Need a different approach? Tessera also supports [Laravel](/docs/stacks/laravel) for content-managed websites, [Node.js](/docs/stacks/nodejs) for JavaScript full-stack, [Flutter](/docs/stacks/flutter) for mobile apps, and [Static](/docs/stacks/static) for landing pages.
