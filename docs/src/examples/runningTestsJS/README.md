# Running tests
## by default
### parallelism -- BETWEEN -- files
* [here](../testParallel)
### headless
* [here](#-headed-mode)
### MINIMUM(1/2 * CPU cores, NUMBER of tests)
* [here](../../test-api/examples/testConfig)
### 0 retries
* [here](../testRetries)
### TODO:
TODO:
## CL
### ways
#### `npx playwright test`
* | [here](sampleJS),
  * `npx playwright test`
#### `yarn playwright test`
* | [here](sampleJS),
  * `yarn playwright test`
#### `pnpm exec playwright test`
* | [here](sampleJS),
  * `pnpm exec playwright test`
## | UI mode
* [here](../testUIModeJs)
## | headed mode
### ways to specify
#### `npx playwright test`
* | [here](sampleJS)
  * `npx playwright test`
#### `.launch({ headless: false });`
* [here](../debug)
### by default, tests run browsers | headless mode
#### == ❌NO browser opened up ❌
* check | PREVIOUS command execution / NO opened up a browser
#### tests' results & test logs | terminal
* check | PREVIOUS command execution, the terminal
### provides: visually see how Playwright interacts -- with -- the website
* | [here](sampleJS)
  * `npx playwright test`
    * see SUPER FAST how browsers are opened up & interaction with the website
## | DIFFERENT browsers
* | [here](sampleJS)
  * `npx playwright test --project webkit`
  * `npx playwright test --project webkit --project firefox`
## specific tests
* | [here](sampleJS)
  * `npx playwright test example1.spec.ts`
    * -- by -- <TEST_FILE_NAME>
  * `npx playwright test example1.spec.ts example2.spec.ts`
    * MULTIPLE tests
  * `npx playwright test 2.spec`
    * -- by -- <KEYWORD_MATCHING_TEST_FILE_NAME>
  * `npx playwright test tests/foldered`
    * --  by -- folder's tests
  * `npx playwright test -g "is defined"`
    * -- by -- test's title


# TODO:
TODO:
