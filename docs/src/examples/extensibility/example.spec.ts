import { test, expect } from './baseTest';

test('selector engine test', async ({ page }) => {
  // Now we can use 'tag=' selectors.
  const button = page.locator('tag=button');
  await button.click();

  // We can combine it with built-in locators.
  await page.locator('tag=div').getByText('Click me').click();

  // We can use it in any methods supporting selectors.
  await expect(page.locator('tag=button')).toHaveCount(3);
});
