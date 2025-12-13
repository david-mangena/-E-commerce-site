import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['@replit/monocart-reporter', {
      name: 'Playwright Test Report',
      outputFolder: 'playwright-report',
      includeTestArguments: true,
      workers: 4,
      columns: ['title', 'duration', 'status'],
      detailView: true,
      attachments: {
        lineNumbers: true,
      },
    }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    navigationTimeout: 30000,
    actionTimeout: 10000,
    testIdAttribute: 'data-test',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'UI Tests',
      testDir: './tests/ui',
      use: { 
        ...devices['Desktop Chrome'], 
        baseURL: 'https://www.saucedemo.com',
        headless: true 
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: { 
        baseURL: 'https://restful-booker.herokuapp.com',
      },
    },
  ],
});
