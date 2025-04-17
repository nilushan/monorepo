# Project Title (Replace Me)

This is a Next.js application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Architecture

This project follows the architecture outlined in `docs/consolidated_architecture_plan.md`. Key aspects include:

*   Next.js with App Router and TypeScript
*   SSR and API Routes
*   Loosely coupled business logic in `src/lib/services`
*   Tailwind CSS for styling
*   Jest and Testing Library for testing
*   GitHub Actions for CI/CD targeting Google Cloud Run/GKE

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

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server (requires `build` first).
*   `npm run lint`: Runs ESLint checks.
*   `npm run typecheck`: Runs TypeScript static type checking.
*   `npm test`: Runs all tests using Jest.
*   `npm run test:watch`: Runs tests in watch mode.
*   `npm run test:unit`: Runs only unit tests.
*   `npm run test:int`: Runs only integration tests.
*   `npm run test:cov`: Runs tests and generates a coverage report.

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

Deployment is handled via the GitHub Actions workflow defined in `.github/workflows/deploy.yml`. See the workflow file and `docs/consolidated_architecture_plan.md` for details on configuration and targets (Cloud Run/GKE).
