---
id: test-configuration
title: "Test configuration"
---

## Introduction

* test runner options
  * ⚠️| **top-level** ⚠️
    * ❌NOT | `use` section❌

## Basic Configuration

* MOST common configuration options

| Option | Description                                                                                                                                                                                                                                       |
| :- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`property: TestConfig.forbidOnly`] | if SOME test marked as `test.only` -> exit -- with an -- error  <br/> uses \| CI                                                                                                                                                                  |
| [`property: TestConfig.fullyParallel`] | ALL files' tests run in parallel <br/> see [Parallelism](./test-parallel) & [Sharding](./test-sharding)                                                                                                                                           |
| [`property: TestConfig.projects`] | Run tests in multiple configurations or on multiple browsers                                                                                                                                                                                      |
| [`property: TestConfig.reporter`] | Reporter to use. See [Test Reporters](/test-reporters.md) to learn more about which reporters are available.                                                                                                                                      |
| [`property: TestConfig.retries`] | The maximum number of retry attempts per test. See [Test Retries](/test-retries.md) to learn more about retries.                                                                                                                                  |
| [`property: TestConfig.testDir`] | Directory with the test files.                                                                                                                                                                                                                    |
| [`property: TestConfig.use`]  | Options with `use{}`                                                                                                                                                                                                                              |
| [`property: TestConfig.webServer`] | To launch a server during the tests, use the `webServer` option                                                                                                                                                                                   |
| [`property: TestConfig.workers`] | ALLOWED values -- for -- parallelizing tests <br/> &nbsp;&nbsp; MAXIMUM number of CONCURRENT worker processes / used  <br/> &nbsp;&nbsp; logical CPU cores' percentage <br/> see [Parallelism](./test-parallel) & [Sharding](./test-sharding) |

* _Example:_ [here](/examples/initFromProjectRoot/playwright.config.ts)

## Filtering Tests

| Option | Description                                                                                                                                                                                                                                                           |
| :- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`property: TestConfig.testIgnore`] | == which one -- to -- ignore <br/> ALLOWED values <br/> &nbsp;&nbsp; Glob patterns or <br/> &nbsp;&nbsp; regular expressions <br/>  _Example:_ `'*test-assets'`                                                                                                       |
| [`property: TestConfig.testMatch`] | == which one -- to -- test <br/> ALLOWED values <br/> &nbsp;&nbsp; Glob patterns or <br/> &nbsp;&nbsp; regular expressions <br/> _Example:_ `'*todo-tests/*.spec.ts'` <br/> by default, Playwright runs <code>.*(test&#124;spec)\.(js&#124;ts&#124;mjs)</code> files. |


* _Example:_. TODO: ADD | project
```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '*test-assets',

  // Glob patterns or regular expressions that match test files.
  testMatch: '*todo-tests/*.spec.ts',
});
```

## Advanced Configuration

* TODO:

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',

  // path to the global setup files.
  globalSetup: require.resolve('./global-setup'),

  // path to the global teardown files.
  globalTeardown: require.resolve('./global-teardown'),

  // Each test is given 30 seconds.
  timeout: 30000,

});
```

| Option | Description |
| :- | :- |
| [`property: TestConfig.globalSetup`] | Path to the global setup file. This file will be required and run before all the tests. It must export a single function. |
| [`property: TestConfig.globalTeardown`] |Path to the global teardown file. This file will be required and run after all the tests. It must export a single function. |
| [`property: TestConfig.outputDir`] | Folder for test artifacts such as screenshots, videos, traces, etc. |
| [`property: TestConfig.timeout`] | Playwright enforces a [timeout](./test-timeouts.md) for each test, 30 seconds by default. Time spent by the test function, fixtures, beforeEach and afterEach hooks is included in the test timeout. |

## Expect Options

Configuration for the expect assertion library.

```js title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

});
```

| Option | Description |
| :- | :- |
| [`property: TestConfig.expect`] | [Web first assertions](./test-assertions.md) like `expect(locator).toHaveText()` have a separate timeout of 5 seconds by default. This is the maximum time the `expect()` should wait for the condition to be met. Learn more about [test and expect timeouts](./test-timeouts.md) and how to set them for a single test. |
| [`method: PageAssertions.toHaveScreenshot#1`] | Configuration for the `expect(locator).toHaveScreenshot()` method. |
| [`method: SnapshotAssertions.toMatchSnapshot#1`]| Configuration for the `expect(locator).toMatchSnapshot()` method.|

