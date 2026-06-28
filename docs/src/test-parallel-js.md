---
id: test-parallel
title: "Parallelism"
---

* goal
  * Playwright Test runs tests in parallel

* way to achieve parallel running
  * [run several worker processes / run | SAME time](test-api/class-testconfig.md#property-testconfigworkers)

* by default,
  * **test files** run in parallel | DIFFERENT AVAILABLE workers
  * tests | 1! file run in order | SAME worker process

## Worker processes

* == 👀OS processes👀 /
  * run INDEPENDENTLY
  * orchestrated -- by the -- test runner /
    * as soon as a worker is free -> it's reused
    * Reason:🧠make testing faster🧠
  * have IDENTICAL environments (NEW Node process, cleaned browser, ...)
    * ⚠️EXCEPT TO,⚠️
      * workerIndex
      * parallelIndex
  * ❌can NOT communicate BETWEEN THEM❌
  * AFTER a [test fails](test-retries-js.md#failures), shut down
    * Reason:🧠guarantee pristine environment -- for -- following tests🧠
* uses
  * ALL tests run | worker processes

## Limit workers | WHOLE test suite

* Reason:🧠efficiency🧠

* ways
  * | [configuration file](test-configuration-js.md), set `workers: <SOME_VALUE>`
  * | [CL](test-cli-js.md), pass `--workers=<SOME_VALUE>`

From the command line:
```bash
npx playwright test --workers 4
```

In the configuration file:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,
});
```

## Disable parallelism

* steps
  * way
    * | configuration file, set `workers: 1`
    * | CL, pass `--workers=1`
      * == `npx playwright test --workers=1`

## Parallelize tests | 1! file

- You can configure tests using [`test.describe.configure`](#parallelize-tests-in-a-single-file) to run **tests in a single file** in parallel.
By default, tests in a single file are run in order
* If you have many independent tests in a single file, you might want to run them in parallel with [`method: Test.describe.configure`].

Note that parallel tests are executed in separate worker processes and cannot share any state or global variables
* Each test executes all relevant hooks just for itself, including `beforeAll` and `afterAll`.

```js
import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('runs in parallel 1', async ({ page }) => { /* ... */ });
test('runs in parallel 2', async ({ page }) => { /* ... */ });
```

- You can configure **entire project** to have all tests in all files to run in parallel using [`property: TestProject.fullyParallel`] or [`property: TestConfig.fullyParallel`].
Alternatively, you can opt-in all tests into this fully-parallel mode in the configuration file:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
});
```

You can also opt in for fully-parallel mode for just a few projects:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // runs all tests in all files of a specific project in parallel
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
  ]
});
```

## Serial mode

You can annotate inter-dependent tests as serial
* If one of the serial tests
fails, all subsequent tests are skipped
* All tests in a group are retried together.

:::note
Using serial is not recommended
* It is usually better to make your tests isolated, so they can be run independently.
:::

```js
import { test, type Page } from '@playwright/test';

// Annotate entire file as serial.
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

## Opt out of fully parallel mode

If your configuration applies parallel mode to all tests using [`property: TestConfig.fullyParallel`], you might still want to run some tests with default settings
* You can override the mode per describe:
```js
test.describe('runs in parallel with other describes', () => {
  test.describe.configure({ mode: 'default' });
  test('in order 1', async ({ page }) => {});
  test('in order 2', async ({ page }) => {});
});
```

## Shard tests between multiple machines

Playwright Test can shard a test suite, so that it can be executed on multiple machines.
See [sharding guide](./test-sharding.md) for more details.

```bash
npx playwright test --shard=2/3
```

## Limit failures & fail fast | WHOLE test suite

* Reason:🧠efficiency🧠
You can limit the number of failed tests in the whole test suite by setting `maxFailures` config option or passing `--max-failures` command line flag.

When running with "max failures" set, Playwright Test will stop after reaching this number of failed tests and skip any tests that were not executed yet
* This is useful to avoid wasting resources on broken test suites.

Passing command line option:
```bash
npx playwright test --max-failures=10
```

Setting in the configuration file:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 10 : undefined,
});
```

## Worker index and parallel index

Each worker process is assigned two ids: a unique worker index that starts with 1, and a parallel index that is between `0` and `workers - 1`
* When a worker is restarted, for example after a failure, the new worker process has the same `parallelIndex` and a new `workerIndex`.

You can read an index from environment variables `process.env.TEST_WORKER_INDEX` and `process.env.TEST_PARALLEL_INDEX`, or access them through [`property: TestInfo.workerIndex`] and [`property: TestInfo.parallelIndex`].

### Isolate test data between parallel workers

You can leverage `process.env.TEST_WORKER_INDEX` or [`property: TestInfo.workerIndex`] mentioned above to
isolate user data in the database between tests running on different workers
* All tests run by the worker
reuse the same user.

Create `playwright/fixtures.ts` file that will [create `dbUserName` fixture](./test-fixtures#creating-a-fixture)
and initialize a new user in the test database
* Use [`property: TestInfo.workerIndex`] to differentiate
between workers.

```js title="playwright/fixtures.ts"
import { test as baseTest, expect } from '@playwright/test';
// Import project utils for managing users in the test database.
import { createUserInTestDatabase, deleteUserFromTestDatabase } from './my-db-utils';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { dbUserName: string }>({
  // Returns db user name unique for the worker.
  dbUserName: [async ({ }, use) => {
    // Use workerIndex as a unique identifier for each worker.
    const userName = `user-${test.info().workerIndex}`;
    // Initialize user in the database.
    await createUserInTestDatabase(userName);
    await use(userName);
    // Clean up after the tests are done.
    await deleteUserFromTestDatabase(userName);
  }, { scope: 'worker' }],
});
```

Now, each test file should import `test` from our fixtures file instead of `@playwright/test`.

```js title="tests/example.spec.ts"
// Important: import our fixtures.
import { test, expect } from '../playwright/fixtures';

test('test', async ({ dbUserName }) => {
  // Use the user name in the test.
});
```


## Control test order

Playwright Test runs tests from a single file in the order of declaration, unless you [parallelize tests in a single file](#parallelize-tests-in-a-single-file).

There is no guarantee about the order of test execution across the files, because Playwright Test runs test files in parallel by default
* However, if you [disable parallelism](#disable-parallelism), you can control test order by either naming your files in alphabetical order or using a "test list" file.

### Sort test files alphabetically

When you **disable parallel test execution**, Playwright Test runs test files in alphabetical order
* You can use some naming convention to control the test order, for example `001-user-signin-flow.spec.ts`, `002-create-new-document.spec.ts` and so on.

### Use a "test list" file

:::warning
Tests lists are discouraged and supported as a best-effort only
* Some features such as VS Code Extension and tracing may not work properly with test lists.
:::

You can put your tests in helper functions in multiple files
* Consider the following example where tests are not defined directly in the file, but rather in a wrapper function.

```js title="feature-a.spec.ts"
import { test, expect } from '@playwright/test';

export default function createTests() {
  test('feature-a example test', async ({ page }) => {
    // ... test goes here
  });
}

```

```js title="feature-b.spec.ts"
import { test, expect } from '@playwright/test';

export default function createTests() {
  test.use({ viewport: { width: 500, height: 500 } });

  test('feature-b example test', async ({ page }) => {
    // ... test goes here
  });
}
```

You can create a test list file that will control the order of tests - first run `feature-b` tests, then `feature-a` tests
* Note how each test file is wrapped in a `test.describe()` block that calls the function where tests are defined
* This way `test.use()` calls only affect tests from a single file.


```js title="test.list.ts"
import { test } from '@playwright/test';
import featureBTests from './feature-b.spec.ts';
import featureATests from './feature-a.spec.ts';

test.describe(featureBTests);
test.describe(featureATests);
```

Now **disable parallel execution** by setting workers to one, and specify your test list file.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
  testMatch: 'test.list.ts',
});
```

:::note
Do not define your tests directly in a helper file
* This could lead to unexpected results because your
tests are now dependent on the order of `import`/`require` statements
* Instead, wrap tests in a function that will be explicitly called by a test list file, as in the example above.
:::
