// src/lib/services/exampleService.ts
import type { ExampleData } from '@/lib/types/exampleTypes';

/**
 * Example service function demonstrating business logic.
 * This should be framework-agnostic.
 *
 * @param input Some input data
 * @returns Processed data
 */
export const processExampleData = async (input: string): Promise<ExampleData> => {
  console.log('Processing data in exampleService:', input);

  // Simulate some async operation (e.g., database call, external API)
  await new Promise(resolve => setTimeout(resolve, 50));

  // Example business logic
  const processed = `Processed: ${input.toUpperCase()} at ${new Date().toISOString()}`;

  return {
    id: Date.now().toString(),
    originalInput: input,
    processedData: processed,
    timestamp: new Date(),
  };
};

// Add other related service functions here...