# monorepo

## Q&A Summary

This project contains several markdown files summarizing key architectural questions and answers:

- [comparison_nextjs_monorepo_vs_split.md](comparison_nextjs_monorepo_vs_split.md):  
  **Comparison of Monorepo Options**  
  Side-by-side analysis of a fullstack Next.js monorepo versus a split frontend/backend monorepo, including pros, cons, and CI/CD pipeline examples.

- [nextjs_backend_separation_possibilities.md](nextjs_backend_separation_possibilities.md):  
  **Migrating from Next.js Monorepo to Separate Backend**  
  Guidance on how to structure your Next.js project for easy backend separation in the future, with best practices and migration steps.

- [nextjs_ssr_vs_api.md](nextjs_ssr_vs_api.md):  
  **Next.js SSR vs. API Endpoints**  
  Explains when you can use server-side rendering or server components to avoid separate APIs, and when explicit API endpoints are still needed, with diagrams and trade-offs.

- [nextjs_monorepo_ssr_loose_coupling_plan.md](nextjs_monorepo_ssr_loose_coupling_plan.md):  
  **Next.js Monorepo SSR with Loosely Coupled Backend Logic**  
  Implementation plan for a Next.js monorepo using SSR, with backend logic organized for maximum reusability and future migration to a standalone service (REST or gRPC).

- [nextjs_ssr_auth_sessions.md](nextjs_ssr_auth_sessions.md):  
  **SSR Authentication, Authorization, and User-Specific Data**  
  How to securely implement authentication and authorization in Next.js SSR, serve user-specific pages, and address performance and scalability concerns.

- [architecture_decision_checklist.md](architecture_decision_checklist.md):  
  **Architectural Decision Checklist**  
  The authoritative checklist of all architectural decisions and strict guidelines for implementation, testing, CI/CD, and deployment.  
  **Every architectural decision must be reflected here. Review this checklist before merging or releasing any feature.**

---
