import { test, expect } from '@playwright/test';

// 1. Test.use()
test.use({
  viewport: {
    width: 600,
    height: 900
  },
  baseURL: 'https://playwright.dev/'
}
);

test('my portrait test', async ({ page }) => {
  let pageGot = await page.goto('docs/intro');

  // TODO: Response properties
  expect(pageGot).t;
});
