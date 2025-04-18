// tests/integration/exampleApi.test.ts

import axios from 'axios';
import { spawn, ChildProcess } from 'child_process';

const TEST_PORT = 3001;
const BASE_URL = `http://localhost:${TEST_PORT}`;

function waitForServerReady(url: string, timeout = 10000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for server to be ready'));
      }
      try {
        await axios.get(url);
        clearInterval(interval);
        resolve();
      } catch {
        // Server not ready yet
      }
    }, 200);
  });
}

describe('API Integration Tests - /example', () => {
  let serverProcess: ChildProcess;

  beforeAll(async () => {
    // Start the Next.js dev server on TEST_PORT
    serverProcess = spawn('npm', ['run', 'dev'], {
      env: { ...process.env, PORT: TEST_PORT.toString() },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Optionally log server stdout and stderr for debugging
    if (serverProcess.stdout) {
      serverProcess.stdout.on('data', (data) => {
        // Uncomment to debug server output
        // console.log(`[server stdout]: ${data.toString()}`);
      });
    }
    if (serverProcess.stderr) {
      serverProcess.stderr.on('data', (data) => {
        // Uncomment to debug server errors
        // console.error(`[server stderr]: ${data.toString()}`);
      });
    }

    // Wait for server to be ready by polling the base URL
    await waitForServerReady(`${BASE_URL}/example`);
  }, 60000); // Allow up to 60s for server startup

  afterAll(() => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });

  it('GET /example should return processed data', async () => {
    const response = await axios.get(`${BASE_URL}/example`, {
      params: { input: 'integration' },
    });
    expect(response.status).toBe(200);
    expect(response.data.processedData).toContain('INTEGRATION');
  });

  it('POST /example should return processed data', async () => {
    const response = await axios.post(
      `${BASE_URL}/example`,
      { input: 'integration post' },
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(response.status).toBe(201);
    expect(response.data.processedData).toContain('INTEGRATION POST');
  });
});