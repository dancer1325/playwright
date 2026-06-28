import { defineConfig, devices } from '@playwright/experimental-ct-react';

/**
 * See https://playwright.dev/docs/test-components
 */
export default defineConfig({
  testDir: './src',
  /* Match component test files. */
  testMatch: '**/*.spec.tsx',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  use: {
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    /* Port to use for the Playwright component endpoint. */
    ctPort: 3100,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
