// tests/unit/exampleService.test.ts
import { processExampleData } from '@/lib/services/exampleService';
import type { ExampleData } from '@/lib/types/exampleTypes';

// Mock console methods to prevent logs during tests if desired
// beforeEach(() => {
//   jest.spyOn(console, 'log').mockImplementation(() => {});
//   jest.spyOn(console, 'warn').mockImplementation(() => {});
//   jest.spyOn(console, 'error').mockImplementation(() => {});
// });

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe('Example Service - Unit Tests', () => {
  describe('processExampleData', () => {
    it('should process the input string correctly', async () => {
      const input = 'test input';
      const result: ExampleData = await processExampleData(input);

      // Check if the result has the expected structure
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('originalInput', input);
      expect(result).toHaveProperty('processedData');
      expect(result).toHaveProperty('timestamp');

      // Check the processed data format (adjust based on actual logic)
      expect(result.processedData).toContain('Processed: TEST INPUT');
      expect(result.processedData).toContain('at'); // Contains the timestamp part

      // Check if the timestamp is a valid Date object
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle default input if none is provided (based on service logic)', async () => {
      // Assuming the service handles empty/null input gracefully,
      // otherwise adjust this test or the service logic.
      // For this example, let's test with an empty string.
      const input = '';
      const result: ExampleData = await processExampleData(input);

      expect(result.originalInput).toBe(input);
      expect(result.processedData).toContain('Processed:'); // Uppercase of empty is empty
    });
  });

  // Add tests for other functions in exampleService.ts here...
});