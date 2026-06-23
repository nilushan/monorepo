# Next.js Service-Oriented Architecture Reference

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Tests](https://img.shields.io/badge/tests-Jest-99425B?logo=jest&logoColor=white)

A reference Next.js application demonstrating a **loosely-coupled, service-oriented architecture** — built to explore how to keep business logic, data access, and the UI cleanly separated within a single App Router codebase, with first-class testing and a path to production on Google Cloud.

The architectural reasoning behind this project (including the monorepo-vs-split and SSR-vs-API-routes trade-offs) is documented in [`docs/`](docs) — see [`consolidated_architecture_plan.md`](docs/consolidated_architecture_plan.md) and [`architecture_decision_checklist.md`](docs/architecture_decision_checklist.md).

## Architecture

Key aspects of the design:

- **Next.js App Router + TypeScript** with SSR and API routes
- **Authentication** via NextAuth, with passwords hashed using `bcryptjs` (plaintext is never stored)
- **Business logic** isolated in `src/lib/services` (e.g. `userService.ts`)
- **External API clients** in `src/lib/clients` (e.g. `mongoClient.ts`)
- **Shared domain types** in `src/lib/types`; utilities in `src/lib/utils`
- **MongoDB** for persistence (via `docker-compose` for local development)
- **Jest + Testing Library** for unit and integration tests
- **GitHub Actions** CI/CD targeting Google Cloud Run / GKE

```mermaid
flowchart TD
    subgraph App["Next.js App"]
        A["App Router (src/app)"]
        B["API Routes"]
        C["Pages & Components"]
    end
    subgraph Backend
        D["User Service"]
        E["Auth (NextAuth)"]
    end
    subgraph Data
        H["MongoDB Client"]
        G["MongoDB (docker-compose)"]
        I["Shared Types"]
    end

    A --> B
    B --> D
    A --> E
    D --> H
    H --> G
    D --> I
```

## Getting started

**Prerequisites:** Node.js 20+, Docker (for local MongoDB).

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local        # set MONGODB_URI and NextAuth secrets

# Run the dev server (Turbopack)
npm run dev                       # http://localhost:3000
```

### Run everything with Docker Compose (recommended for local dev)

```bash
docker-compose up --build
```

This starts the app together with a local MongoDB service defined in `docker-compose.yml`. The database is reachable at `mongodb://root:example@localhost:27017` (matching `MONGODB_URI`); user records are managed by `src/lib/services/userService.ts`. Connect a GUI such as MongoDB Compass to `localhost:27017` to inspect data.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` / `npm start` | Production build / serve (standalone output) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run all Jest tests |
| `npm run test:unit` / `test:int` | Unit / integration tests only |
| `npm run test:cov` | Tests with coverage report |

## Testing

Unit tests live in `tests/unit`, integration tests in `tests/integration`. Run the full suite with `npm test`.

## Deployment

Deployment is handled by the GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), targeting Google Cloud Run / GKE. See [`docs/consolidated_architecture_plan.md`](docs/consolidated_architecture_plan.md) for configuration details.
