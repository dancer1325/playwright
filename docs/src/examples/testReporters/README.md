# provides: FULL report (by browsers / passed tests / steps ...) of your tests
* | [here](sample)
  * `npx playwright test`

# by default
## list reporter
* | [here](sample)
  * `npx playwright test`
    * check
## | CI, `dot` reporter
TODO:

# 👀you can use >1 | SAME time👀
* | [here](sample/tests/example.spec.ts)
  * see `reporter`
  * `npx playwright test`
    * see
      * generated 'test-results.json'
      * listed | terminal

# Built-in reporters
## ⚠️MAIN DIFFERENCE: verbosity | SUCCESSFUL runs⚠️
TODO:
## list reporter
### prints a line / EACH test being run
* | [here](sample)
  * `npx playwright test -reporter=list`
    * check print a result test execution / EACH executed test
#### failures are listed | end
* check print a result test execution / EACH executed test
### ways to specify
#### -- via -- CL's flag
* `npx playwright test -reporter=list`
#### -- via -- Playwright configuration
* modify [playwright.config.ts](sample/playwright.config.ts)
* `npx playwright test`
  * check print a result test execution / EACH executed test
### if you want MORE detailed information -> | "playwright.config.ts",
#### set `printSteps: true`
#### `printFailuresInline: true`, AS SOON AS they are failures, print them
* `npx playwright test`
  * check print failure test lines WITHOUT waiting | end




## TODO:
