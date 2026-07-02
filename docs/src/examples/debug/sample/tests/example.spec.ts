import { test, expect } from '@playwright/test';

test('failure test', async ({ page }) => {
  expect(2).toBe(3);
  expect(2).toBe(2);
});
