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

// Using test.step() to group actions into named, reportable steps.
// Each step shows up in the HTML report, the trace viewer, and in the list
// reporter when run with `printSteps: true`.
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
