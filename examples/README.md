
#### Page screenshot

This code snippet navigates to Playwright homepage and saves a screenshot.

```TypeScript
import { test } from '@playwright/test';

test('Page Screenshot', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.screenshot({ path: `example.png` });
});
```

#### Mobile and geolocation

This snippet emulates Mobile Safari on a device at given geolocation, navigates to maps.google.com, performs the action and takes a screenshot.

```TypeScript
import { test, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 13 Pro'],
  locale: 'en-US',
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ['geolocation'],
})

test('Mobile and geolocation', async ({ page }) => {
  await page.goto('https://maps.google.com');
  await page.getByText('Your location').click();
  await page.waitForRequest(/.*preview\/pwa/);
  await page.screenshot({ path: 'colosseum-iphone.png' });
});
```

#### Evaluate in browser context

This code snippet navigates to example.com, and executes a script in the page context.

```TypeScript
import { test } from '@playwright/test';

test('Evaluate in browser context', async ({ page }) => {
  await page.goto('https://www.example.com/');
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  });
  console.log(dimensions);
});
```

#### Intercept network requests

This code snippet sets up request routing for a page to log all network requests.

```TypeScript
import { test } from '@playwright/test';

test('Intercept network requests', async ({ page }) => {
  // Log and continue all network requests
  await page.route('**', route => {
    console.log(route.request().url());
    route.continue();
  });
  await page.goto('http://todomvc.com');
});
```
