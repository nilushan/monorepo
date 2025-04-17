# Implementation Plan: Next.js Monorepo with SSR and Loosely Coupled Backend Logic

## Goals

- Use Next.js monorepo with server-side rendering (SSR) for fast development and SEO.
- Organize backend logic so it is decoupled from API handlers and SSR data fetching.
- Enable easy reuse of backend logic in a future standalone service (REST or gRPC).

---

## Recommended Project Structure

```
/my-app
  /app or /pages         # Next.js pages (SSR, server components)
    /api                 # (Optional) API routes (thin controllers)
  /components            # React components
  /lib                   # Shared business logic, services, and types
    /services            # Core backend logic (pure functions/classes)
    /types               # TypeScript types/interfaces
    /db.ts               # Database access layer (optional)
  /public
  next.config.js
  package.json
  tsconfig.json
```

---

## Key Practices

### 1. **Business Logic in `/lib/services`**

- Write all core logic (e.g., data processing, validation, business rules) as pure functions or classes in `/lib/services`.
- Avoid using Next.js or Express-specific code in these modules.

### 2. **Thin API Handlers and SSR Functions**

- In `/pages/api` or server components, only parse input, call service functions, and return results.
- Example (API route):
  ```ts
  // pages/api/user.ts
  import { getUserById } from '../../lib/services/userService';
  export default async function handler(req, res) {
    const user = await getUserById(req.query.id);
    res.status(200).json(user);
  }
  ```
- Example (SSR):
  ```ts
  // pages/profile.tsx
  import { getUserById } from '../lib/services/userService';
  export async function getServerSideProps(context) {
    const user = await getUserById(context.params.id);
    return { props: { user } };
  }
  ```

### 3. **Shared Types in `/lib/types`**

- Define all request/response and domain types in `/lib/types` for consistency and reusability.

### 4. **Database/External API Layer**

- If needed, create a `/lib/db.ts` or `/lib/clients/` for database or external API access.
- Service functions should depend on this layer, not on Next.js.

---

## Enabling Future Migration

- When ready to split out a backend service:
  - Move `/lib/services` and `/lib/types` to a new package (e.g., `/shared` or a separate repo).
  - Implement REST/gRPC handlers in the new backend, reusing the same service modules.
  - Update Next.js API routes or SSR functions to call the new backend over HTTP/gRPC, or keep them as thin proxies.

---

## Diagram

```mermaid
graph TD
  A[Next.js SSR/API Route]
  B[Service Layer (/lib/services)]
  C[DB/API Layer (/lib/db.ts)]
  D[(Database/External APIs)]
  A -->|calls| B
  B -->|calls| C
  C -->|queries| D
```

---

## Summary

- This structure allows you to start fast with Next.js and SSR, while keeping backend logic portable.
- When you need a standalone backend (REST/gRPC), you can migrate the service layer with minimal refactoring.
- This approach supports both rapid prototyping and long-term scalability.