import { test, expect } from '@playwright/test'; // 1

test.describe('Playwright homepage', () => {
  test('contains hero title', async ({ page }) => { // 2, 3
    await page.goto('https://playwright.dev/');
    const titleLocator = page.locator('.hero__title'); // 4
    await expect(titleLocator).toContainText( // 5
      'Playwright enables reliable end-to-end testing'
    );
  });
});
