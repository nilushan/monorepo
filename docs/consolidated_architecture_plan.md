## Comprehensive Architecture & Implementation Plan: Next.js Monorepo (SSR)

This plan details the architecture, development practices, testing strategy, CI/CD pipeline, and deployment approach for your Next.js application, incorporating the requirements from your provided documents and our discussion on CI/CD strategy.

**1. Architecture Overview**

*   **Monorepo:** A single repository containing the Next.js application.
*   **Next.js Application:** Serves both frontend (React) and backend logic (API routes, SSR).
*   **Server-Side Rendering (SSR):** Utilized for dynamic pages. SSG for static content.
*   **Loosely Coupled Backend Logic:** Core logic in `/lib/services`, framework-agnostic TypeScript.
*   **Data Layer:** Abstracted database/API access in `/lib/db` or `/lib/clients`.

```mermaid
graph TD
    subgraph "Next.js Monorepo"
        direction LR
        A[Browser User] --> B(Next.js App);
        subgraph B
            direction TB
            B_SSR[SSR Pages / Server Components] --> B_Services;
            B_API[API Routes] --> B_Services;
            B_FE[React Client Components] --> B_API;
            B_Services(Backend Logic /lib/services);
            B_Data(Data Access /lib/db);
            B_Types(Shared Types /lib/types);
            B_Services --> B_Data;
            B_SSR --> B_Types;
            B_API --> B_Types;
            B_FE --> B_Types;
        end
        B_Data --> D[(Database / External APIs)];
    end
    subgraph "CI/CD (GitHub Actions)"
        direction TB
        E[Code Push/PR] --> F{Pipeline Trigger};
        F -- On PR --> G[Lint & Type Check];
        G --> H[Unit Tests];
        H --> I[Integration Tests];
        F -- On Push (develop) --> G;
        I -- develop --> J[Build Docker Image];
        J --> K[Push to Registry];
        K --> L[Deploy to Staging];
        F -- On Push (main) --> G;
        I -- main --> J;
        L -- main (from develop/hotfix) --> M[Deploy to Production];
    end
    subgraph "Deployment (GCP)"
        direction TB
        N[Cloud Run / GKE Staging] --> O(Containerized Staging App);
        P[Cloud Run / GKE Production] --> Q(Containerized Production App);
        O --> R[(Staging DB / APIs)];
        Q --> S[(Production DB / APIs)];
        T[Cloud Monitoring/Logging] --> N;
        T --> P;
    end

    A --> B;
    E --> F;
    K --> L;
    L --> M; # Represents promotion/deployment trigger
    L --> N;
    M --> P;
```

**2. Project Structure & Code Organization**

```
/
├── .github/workflows/         # CI/CD pipeline definitions (e.g., deploy.yml)
├── .vscode/                   # VSCode settings (launch.json for debugging)
├── public/                    # Static assets
├── components/                # Shared React components
├── app/                       # Next.js App Router (preferred) OR /pages/
│   ├── (api)/                 # API Route handlers
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Root page
│   └── ...                    # Other routes, pages, layouts
├── lib/
│   ├── services/              # Core business logic (framework-agnostic TS)
│   ├── db/                    # Database client setup & access
│   ├── clients/               # External API client setup
│   ├── types/                 # Shared TypeScript types/interfaces
│   └── utils/                 # General utility functions
├── tests/
│   ├── unit/                  # Unit tests for /lib/services
│   └── integration/           # Integration tests for API routes, SSR
├── .env.local                 # Local environment variables (uncommitted)
├── .env.example               # Example environment variables (committed)
├── Dockerfile                 # Container build definition
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── package.json
└── README.md                  # Project documentation
```

**3. Design Practices & Decoupling**

*   **Service Layer:** Logic in `/lib/services`, pure TypeScript, testable, framework-agnostic.
*   **Thin Controllers:** API routes & SSR functions delegate to services.
*   **Type Safety:** Shared types in `/lib/types`, used rigorously.
*   **Dependency Injection:** Consider for complex services/testing.
*   **Environment Variables:** Use `process.env` for all config/secrets. Manage securely per environment.
*   **No Frontend -> Backend Imports:** Data via SSR props or API calls only for client components.

**4. SSR & Data Fetching**

*   **Primary Method:** SSR (Server Components, `getServerSideProps`) fetching directly from services.
*   **API Routes:** For client-side fetching, form submissions, external use.
*   **Minimize Redundant APIs:** Avoid APIs if data only needed for SSR load.
*   **Static Generation (SSG):** For public/non-personalized content.

**5. Authentication & Authorization (SSR Focus)**

*   **Session Management:** Secure, HTTP-only cookies (e.g., `next-auth`).
*   **SSR Validation:** Validate session, fetch user-specific data in every SSR function.
*   **Authorization Logic:** Enforce permissions within the `/lib/services` layer.
*   **Redirects:** Redirect unauthenticated users during SSR.
*   **Data Isolation:** Never pass other users' data in props.
*   **Scalability:** Monitor SSR load, configure Cloud Run/GKE resources appropriately.

**6. Local Development & Debugging**

*   **Environment:** Use `.env.local`.
*   **Running Locally:** `npm run dev`.
*   **Debugging Backend/SSR:** VSCode debugger (`launch.json`), breakpoints, `console.log`.
*   **Debugging Frontend:** Browser DevTools.
*   **Source Maps:** Enable for effective debugging.
*   **Logging:** Structured logging (e.g., `pino`).

**7. Testing Strategy**

*   **Unit Tests:** `/lib/services` tested in isolation (Jest/Vitest), mock DB/API access. High coverage goal.
*   **Integration Tests:** API routes/SSR interaction with services (Jest/Vitest + `supertest`/Testing Library), mock external dependencies (`msw`). Reasonable coverage goal.
*   **Type Checking:** `tsc --noEmit` in CI.

**8. CI/CD Pipeline (GitHub Actions)**

*   **Branching Strategy:**
    *   `main`: Production-ready code. Merges via PRs from `develop` or `hotfix`.
    *   `develop`: Latest development changes. Deployed to staging. Integrates `feature` branches via PRs.
    *   `feature/*`: For new features/fixes, branched from `develop`, merged back via PR.
    *   `hotfix/*`: Urgent production fixes, branched from `main`, merged back to `main` and `develop`.
*   **Deployment Triggers & Environments:**
    *   **Staging:** Automatic deployment on merge/push to `develop`. Uses staging config/secrets.
    *   **Production:** Automatic deployment on merge/push to `main`. Uses production config/secrets.
    *   **PR Checks:** Lint, type check, unit tests, integration tests run on PRs targeting `main` or `develop` (no deployment).
*   **Pipeline Structure (Example: Single Workflow):**
    *   A `build-and-test` job runs first (lint, type check, tests).
    *   On success for `develop` or `main` pushes, build/push Docker image.
    *   Conditional `deploy-staging` job runs on `develop` push, using the built image and staging config.
    *   Conditional `deploy-production` job runs on `main` push, using the built image and production config.
*   **Secrets Management:** Use Workload Identity Federation (recommended) for GCP authentication. Manage environment secrets via GitHub Environments and inject runtime secrets via Cloud Run/GKE secrets.
*   **Failure Policy:** Fail pipeline immediately on lint, type, or test errors.

**(Detailed YAML example omitted here for brevity but is understood as defined in the previous refinement step)**

**9. Deployment**

*   **Target:** Cloud Run (recommended) or GKE. Separate services/namespaces for staging and production.
*   **Artifact:** Single, optimized multi-stage Docker container.
*   **Configuration:** Manage resources (CPU/Memory), scaling, secrets, and health checks per environment via Cloud Run/GKE settings.
*   **Monitoring & Logging:** Use Google Cloud Monitoring/Logging for observability. Set up alerts.

**10. Future-Proofing & Backend Migration**

*   **Strict Decoupling:** Maintain framework-agnostic `/lib/services`.
*   **Migration Path:** If needed, move `/lib/services`, `/lib/db`, `/lib/types` to a separate backend project (Express/Fastify/gRPC), expose via API, update Next.js app to call the API.
*   **Documentation:** Keep `architecture_decision_checklist.md` and this plan updated. Document deviations.

**11. References**

*   [architecture_decision_checklist.md](./architecture_decision_checklist.md)
*   Brainstorming documents in `/brainstorm docs/`

