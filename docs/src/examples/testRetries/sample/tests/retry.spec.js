import { test, expect } from '@playwright/test';

// 1. TestInfo.retry
test('my test', async ({ page }, testInfo) => {
  if (testInfo.retry)
    await cleanSomeCachesOnTheServer();
  // ...
});

// 2. specify retries | 1! file
test.describe(() => {
  // All tests in this describe group will get 2 retry attempts.
  test.describe.configure({ retries: 2 });

  test('test 1', async ({ page }) => {
    // ...
  });

  test('test 2', async ({ page }) => {
    // ...
  });
});
