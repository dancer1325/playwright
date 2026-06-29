import { test, expect } from '@playwright/test';

test('is truthy', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  expect(page).toBeTruthy();
});

