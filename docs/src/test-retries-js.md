---
id: test-retries
title: "Retries"
---

* Test retries
  * == way to AUTOMATICALLY re-run a test | test fails
  * use case
    * test
      * is flaky
      * fails INTERMITTENTLY
  * configured | [configuration file](test-configuration-js.md)

## Failures

TODO: based on the "example/sample/failures.spec.js"
When **all tests pass**, they will run in order in the same worker process.
* Worker process starts
  * `beforeAll` hook runs
  * `first good` passes
  * `second flaky` passes
  * `third good` passes
  * `afterAll` hook runs

Should **any test fail**, Playwright Test will discard the entire worker process along with the browser and will start a new one
* Testing will continue in the new worker process starting with the next test.
* Worker process #1 starts
  * `beforeAll` hook runs
  * `first good` passes
  * `second flaky` fails
  * `afterAll` hook runs
* Worker process #2 starts
  * `beforeAll` hook runs again
  * `third good` passes
  * `afterAll` hook runs

If you **enable [retries](#retries)**, second worker process will start by retrying the failed test and continue from there.
* Worker process #1 starts
  * `beforeAll` hook runs
  * `first good` passes
  * `second flaky` fails
  * `afterAll` hook runs
* Worker process #2 starts
  * `beforeAll` hook runs again
  * `second flaky` is retried and passes
  * `third good` passes
  * `afterAll` hook runs

This scheme works perfectly for independent tests and guarantees that failing tests can't affect healthy ones.

## Retries

* **test retries**
  * real NUMBER of retries == UNTIL they pass OR MAXIMUM configured number of retries
  * by default, disabled
  * ways to enable
    * `npx playwright ... --retries=<NUMBER_OF_RETRIES>`
    * | configuration file

        ```js title="playwright.config.ts"
        import { defineConfig } from '@playwright/test';

        export default defineConfig({
          // Give failing tests 3 retry attempts
          retries: <NUMBER_OF_RETRIES>,
        });
        ```

* Playwright Test types -- based on -- need of retries
  * "passed"
    * == tests / passed | FIRST run
  * "flaky"
    * == tests /
      * failed | first run
      * passed | retried
  * "failed"
    * == tests / failed | first run + ALL retries

* `TestInfo.retry`
  * allows
    * detecting retries | runtime
  * accessible -- to --
    * any test
    * any hook
    * any fixture

* retries
  * can be specified
    * | 1 specific group of tests
    * | 1! file

      ```js
      Test.describe.configure({retrie: })
      ```

## Serial mode

Use [`method: Test.describe.serial`] to group dependent tests to ensure they will always run together and in order
* If one of the tests fails, all subsequent tests are skipped
* All tests in the group are retried together.

Consider the following snippet that uses `test.describe.serial`:

```js
import { test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => { /* ... */ });
test('first good', async ({ page }) => { /* ... */ });
test('second flaky', async ({ page }) => { /* ... */ });
test('third good', async ({ page }) => { /* ... */ });
```

When running without [retries](#retries), all tests after the failure are skipped:
* Worker process #1:
  * `beforeAll` hook runs
  * `first good` passes
  * `second flaky` fails
  * `third good` is skipped entirely

When running with [retries](#retries), all tests are retried together:
* Worker process #1:
  * `beforeAll` hook runs
  * `first good` passes
  * `second flaky` fails
  * `third good` is skipped
* Worker process #2:
  * `beforeAll` hook runs again
  * `first good` passes again
  * `second flaky` passes
  * `third good` passes

:::note
It is usually better to make your tests isolated, so they can be efficiently run and retried independently.
:::

## Reuse single page between tests

Playwright Test creates an isolated [Page] object for each test
* However, if you'd like to reuse a single [Page] object between multiple tests, you can create your own in [`method: Test.beforeAll`] and close it in [`method: Test.afterAll`].

```js tab=js-js title="example.spec.js"
// @ts-check

const { test } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });

/** @type {import('@playwright/test').Page} */
let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('runs first', async () => {
  await page.goto('https://playwright.dev/');
});

test('runs second', async () => {
  await page.getByText('Get Started').click();
});
```

```js tab=js-ts title="example.spec.ts"
import { test, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('runs first', async () => {
  await page.goto('https://playwright.dev/');
});

test('runs second', async () => {
  await page.getByText('Get Started').click();
});
```
