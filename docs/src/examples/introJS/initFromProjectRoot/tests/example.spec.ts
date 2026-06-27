import { test, expect } from '@playwright/test';

// `page` argument -> Playwright Test set up the `page` fixture
test('has title', async ({ page }) => {
  // "page" -- belongs to an -- isolated BrowserContext / created | this specific test

  // 1. action - navigation
  await page.goto('https://playwright.dev/');

  // 3. assertion - async
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // "page" -- is completely isolated from the -- first test

  await page.goto('https://playwright.dev/');

  // 2. action - interaction
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


// test hooks
test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://playwright.dev/');
  });

  test('main navigation', async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});
