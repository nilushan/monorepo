# Project Title (Replace Me)

This is a Next.js application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Architecture

This project follows the architecture outlined in [`docs/consolidated_architecture_plan.md`](docs/consolidated_architecture_plan.md) and [`docs/architecture_decision_checklist.md`](docs/architecture_decision_checklist.md). Key aspects include:

* Next.js with App Router and TypeScript
* SSR and API Routes
* Loosely coupled business logic in `src/lib/services`
* Shared types in `src/lib/types`
* Utility functions in `src/lib/utils`
* External API clients in `src/lib/clients`
* Jest and Testing Library for testing
* GitHub Actions for CI/CD targeting Google Cloud Run/GKE

### System Architecture Diagram

A high-level system diagram (Mermaid format) is available in [docs/architecture_diagram.mmd](docs/architecture_diagram.mmd).

## Architecture Diagram

```mermaid
flowchart TD
    subgraph Next.js_App
        A[App Router (src/app/)]
        B[API Routes (Placeholder)]
        C[Frontend Pages/Components (Placeholder)]
    end

    subgraph Backend
        D[User Service (src/lib/services/userService.ts)]
        E[Auth Service (Placeholder)]
        F[Additional Services (Email, Logging, etc.) (Placeholder)]
    end

    subgraph Data
        G[MongoDB (docker-compose)]
        H[MongoDB Client (src/lib/clients/mongoClient.ts)]
        I[User Types (src/lib/types/userTypes.ts)]
        J[.env.local (MONGODB_URI)]
    end

    subgraph Testing
        K[Unit Tests (Placeholder)]
        L[Integration Tests (Placeholder)]
    end
m 
    %% Relationships
    A -->|calls| B
    B -->|uses| D
    D -->|uses| H
    H -->|connects to| G
    D -->|uses| I
    H -->|reads| J
    D -->|planned| E
    D -->|planned| F
    A -->|planned| C
    D -->|tested by| K
    B -->|tested by| L
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
# yarn install
# or
# pnpm install
```

Second, create a local environment file by copying the example:

```bash
cp .env.example .env.local
```

Update `.env.local` with your specific development environment variables (e.g., database connection string if applicable).

Third, run the development server:

```bash
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker

You can build and run the app locally using Docker:

```bash
docker build -t my-nextjs-app .
docker run --env-file .env.local -p 3000:3000 my-nextjs-app
```

Or use Docker Compose for easier orchestration (recommended for local development):

```bash
docker-compose up --build
```

This will use the `docker-compose.yml` file to build the image and start the app with environment variables from `.env.local`. The app will be available at [http://localhost:3000](http://localhost:3000).

### Local MongoDB Database

A MongoDB service is included in `docker-compose.yml` for local development. User details and credentials are securely stored in MongoDB.

**How to use:**
- The MongoDB container runs on `mongodb://root:example@localhost:27017` (see `.env.local` for `MONGODB_URI`).
- User data is managed via the service in `src/lib/services/userService.ts` and types in `src/lib/types/userTypes.ts`.
- Passwords are hashed using bcryptjs before storage; plaintext passwords are never saved.
- To inspect the database, you can connect a MongoDB GUI (e.g., MongoDB Compass) to `localhost:27017` with username `root` and password `example`.

No additional setup is required—just run `docker-compose up --build` and the app will connect to MongoDB automatically.

### Extending with Additional Services

To add a database or other services, extend the `docker-compose.yml` file. See the commented example in that file for adding a PostgreSQL service.

## Available Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the application for production.
* `npm run start`: Starts the production server (requires `build` first).
* `npm run lint`: Runs ESLint checks.
* `npm run typecheck`: Runs TypeScript static type checking.
* `npm test`: Runs all tests using Jest.
* `npm run test:watch`: Runs tests in watch mode.
* `npm run test:unit`: Runs only unit tests.
* `npm run test:int`: Runs only integration tests.
* `npm run test:cov`: Runs tests and generates a coverage report.

## Testing

Unit tests are located in `tests/unit` and integration tests in `tests/integration`. Run all tests with:

```bash
npm test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

Deployment is handled via the GitHub Actions workflow defined in `.github/workflows/deploy.yml`. See the workflow file and [`docs/consolidated_architecture_plan.md`](docs/consolidated_architecture_plan.md) for details on configuration and targets (Cloud Run/GKE).

## References

* [`docs/consolidated_architecture_plan.md`](docs/consolidated_architecture_plan.md)
* [`docs/architecture_decision_checklist.md`](docs/architecture_decision_checklist.md)
