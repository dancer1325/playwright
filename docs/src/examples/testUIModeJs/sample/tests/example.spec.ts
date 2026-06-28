import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // comment OR uncomment NEXT line -- to -- check wath mode
  //expect(page).toBeDefined();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Tagged test: in UI mode you can filter by `@smoke` to run only this one.
test('docs search is reachable', { tag: '@smoke' }, async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // The search trigger is present on the docs site.
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
});
