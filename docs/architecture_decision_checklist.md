# Architectural Decision Summary & Implementation Checklist

This checklist summarizes the key architectural decisions and strict guidelines for implementing, testing, and deploying your Next.js monorepo project with SSR and loosely coupled backend logic.

---

## 1. Project Structure

- [ ] Use a monorepo with a single Next.js app (SSR enabled).
- [ ] Organize code as follows:
  - `/app` or `/pages`: Next.js pages (SSR, server components)
  - `/components`: React components
  - `/lib/services`: All business logic and backend services (pure functions/classes)
  - `/lib/types`: Shared TypeScript types/interfaces
  - `/lib/db.ts` or `/lib/clients/`: Database/external API access layer
  - `/public`: Static assets

---

## 2. Code Organization & Decoupling

- [ ] All business logic must reside in `/lib/services` and be framework-agnostic (no Next.js/Express code).
- [ ] API route handlers and SSR data fetching functions must be thin controllers that delegate to service functions.
- [ ] Shared types/interfaces must be defined in `/lib/types` and used consistently across frontend, backend, and tests.
- [ ] No direct imports from frontend components to backend-only code.

---

## 3. SSR & Data Fetching

- [ ] Use SSR (`getServerSideProps`, server components) for all pages that require dynamic data at render time.
- [ ] Fetch data directly from service functions in SSR or API routes.
- [ ] Avoid unnecessary API endpoints if data can be fetched server-side during rendering.

---

## 4. Authentication & Authorization (SSR)

- [ ] Use HTTP-only, Secure cookies for session tokens.
- [ ] Validate session and user identity in every SSR request (`getServerSideProps`/server components).
- [ ] Fetch and render only the authenticated user's data.
- [ ] Enforce authorization in the service layer.
- [ ] Redirect unauthenticated users to login.
- [ ] Never expose other users' data in SSR props.
- [ ] Use scalable infrastructure to handle SSR load for personalized pages.
- [ ] Use static generation for non-personalized/public pages.

---

## 5. Testing

- [ ] All service functions in `/lib/services` must have unit tests.
- [ ] Use integration tests for API routes and SSR data fetching.
- [ ] Use type-safe mocks/stubs for database/external API access in tests.
- [ ] Ensure 100% type coverage for shared types/interfaces.

---

## 6. CI/CD

- [ ] Set up a single CI/CD pipeline (e.g., GitHub Actions) to:
  - Install dependencies
  - Run linting and type checks
  - Run all tests (unit, integration)
  - Build the Next.js app
  - Deploy to Cloud Run or GKE
- [ ] Use environment variables for all secrets and configuration.
- [ ] Fail the pipeline if any lint, type, or test step fails.

---

## 7. Deployment

- [ ] Deploy the Next.js app as a container to Cloud Run or GKE.
- [ ] Use a single build artifact for both frontend and backend (API routes/SSR).
- [ ] Ensure environment variables are securely managed in the deployment platform.
- [ ] Monitor deployment health and set up alerts for failures.

---

## 8. Future-Proofing

- [ ] Keep all business logic and types decoupled from Next.js-specific code to enable future migration to a standalone backend (REST/gRPC).
- [ ] Document any deviations from this checklist and justify them in project documentation.

---

**Review this checklist before merging any major feature or release to ensure architectural consistency and maintainability.**