import { test, expect } from '@playwright/test';

function stamp(label: string, testInfo: { workerIndex: number; title: string }) {
  const t = new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm
  // eslint-disable-next-line no-console
  console.log(`[${t}] ${label.padEnd(5)} | worker #${testInfo.workerIndex} (pid ${process.pid}) | ${testInfo.title}`);
}

test('has title', async ({ page }, testInfo) => {
  stamp('START', testInfo);
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  stamp('END', testInfo);
});

test('get started link', async ({ page }, testInfo) => {
  stamp('START', testInfo);
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  stamp('END', testInfo);
});
