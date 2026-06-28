import { test } from '@playwright/test';

test.describe('suite', () => {
  test.beforeAll(async () => { /* ... */ });
  test('first good', async ({ page }) => { /* ... */ });
  test('second flaky', async ({ page }) => { /* ... */ });
  test('third good', async ({ page }) => { /* ... */ });
  test.afterAll(async () => { /* ... */ });
});
