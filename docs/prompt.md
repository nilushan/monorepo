Project Development Rules Summary

Follow the Architecture Plan:

Adhere to the structure and practices in docs/consolidated_architecture_plan.md and docs/architecture_decision_checklist.md.
Keep business logic in src/lib/services (framework-agnostic, pure TypeScript).
Use src/lib/types for all shared types/interfaces.
Place utility functions in src/lib/utils and API clients in src/lib/clients.
Use the App Router (src/app/) for pages and API routes.
Code Organization & Best Practices:

API routes and SSR functions must act as thin controllers, delegating logic to services.
Never import backend code directly into frontend/client components.
Use environment variables via .env.local (never commit secrets).
Maintain strict type safety and use TypeScript everywhere.
Testing & Quality:

Write unit tests for services (tests/unit) and integration tests for API/SSR (tests/integration).
Ensure high test coverage and run tests locally before pushing.
Use npm run lint and npm run typecheck to enforce code quality.
CI/CD & Deployment:

All code must pass lint, type checks, and tests in CI before merging.
Use GitHub Actions workflows in .github/workflows/.
Build and run locally with Docker (docker-compose up --build), using .env.local for config.
Documentation:

Keep README.md and architecture docs up to date.
Document any architectural or process deviations.
Branching & Collaboration:

Use feature branches (feature/*), develop for staging, and main for production.
Merge via pull requests with required reviews.
Always reference this summary and the architecture plan when developing or making changes.