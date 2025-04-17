// jest.config.js
const nextJest = require('next/jest');

// Providing the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Use jsdom environment for browser-like testing
  testEnvironment: 'jest-environment-jsdom',

  // Look for test files in the tests directory and __tests__ folders
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.(ts|tsx)',
    '<rootDir>/tests/integration/**/*.test.(ts|tsx)',
    '<rootDir>/src/**/__tests__/**/*.test.(ts|tsx)',
  ],

  // Module path aliases from tsconfig.json
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Use ts-jest for TypeScript files
  preset: 'ts-jest',

  // Ignore node_modules, .next, etc.
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  // Transform options if needed (ts-jest handles most TS/JS)
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest',
  // },

  // Collect coverage from src directory, excluding certain files/patterns
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts', // Exclude type definition files
    '!src/**/route.ts', // Often better tested via integration tests
    '!src/app/layout.tsx', // Layouts can be tricky to unit test
    '!src/app/page.tsx', // Example page, adjust as needed
    '!src/lib/db/index.ts', // Exclude DB client setup (mock in tests)
    // Add other exclusions as needed
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json-summary'], // Add json-summary for coverage badges/reports
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);