# Documentation Index

This documentation is organized to clearly separate the decision-making process from the final architecture and implementation plan. Use this index to navigate the project’s architectural history and the definitive guidance for implementation.

---

## Structure

- **decisions/**: Documents that record architectural options, comparisons, and the rationale behind key decisions.
- **final/**: The finalized architecture, design plan, and checklists to be followed during implementation.

---

## Contents

### decisions/

- **comparison_nextjs_monorepo_vs_split.md**  
  Compares monorepo fullstack Next.js vs. split frontend/backend architectures, including pros, cons, CI/CD samples, and recommendations.

- **nextjs_backend_separation_possibilities.md**  
  Explores how to migrate from a fullstack Next.js monorepo to a separate backend, with best practices and migration steps.

- **nextjs_ssr_vs_api.md**  
  Discusses when to use SSR data fetching versus API endpoints in Next.js, with pros, cons, and data flow diagrams.

---

### final/

- **architecture_decision_checklist.md**  
  The authoritative checklist summarizing all architectural decisions and strict guidelines for implementation, testing, and deployment.

- **nextjs_monorepo_ssr_loose_coupling_plan.md**  
  The implementation plan for a Next.js monorepo with SSR and loosely coupled backend logic, including project structure and key practices.

- **nextjs_ssr_auth_sessions.md**  
  Finalized approach for authentication, authorization, and user-specific data handling in SSR, including security and scalability best practices.

- **architecture_and_design_plan.md**  
  Comprehensive architecture and design plan synthesizing all requirements, best practices, and implementation guidance.

---

## How to Use

- Start with the **final/** folder for all implementation work.
- Refer to the **decisions/** folder for context on why certain architectural choices were made.
- Use this index as a map to the project’s architectural documentation.