import { test } from '@playwright/test';
import {expect} from "playwright/test";

test('test with steps', async ({ page }) => {
  // 2. step.body
  await test.step('Log in', async () => {
  });

  // 2.2  with step body function's argument
  await test.step('with functions argument', async (testInfo) => {
    // ...
    console.log("with functions argument " + testInfo);
  });

  await test.step('Outer step', async () => {
    // ...
    // You can nest steps inside each other.
    await test.step('Inner step', async () => {
      // ...
    });
  });
});

test('with steps returning', async ({ page }) => {
  // step / returns a value
  const user = await test.step('Log in', async () => {
    // ...
    return 'john';
  });
  expect(user).toBe('john');
});
