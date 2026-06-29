import { test, expect } from '@playwright/test';

test('is defined', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  expect(page).toBeDefined();
});

