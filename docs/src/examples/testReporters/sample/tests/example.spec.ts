import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('failure', async () => {
  expect(2+2).toBe(5);
})

// Test with explicit test.step() calls. Run with the list reporter and
// `printSteps: true` IN A REAL TERMINAL (TTY) to see each step on its own line:
//   npx playwright test --reporter=list
//   (with reporter: [['list', { printSteps: true }]] in the config)
// Without printSteps you only get one line for the whole test.
test('with steps', async ({ page }) => {
  await test.step('navigate to site', async () => {
    await page.goto('https://playwright.dev/');
  });

  await test.step('check title', async () => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  await test.step('open get started', async () => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
