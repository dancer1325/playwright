---
id: writing-tests
title: "Writing tests"
---
## Introduction

* Playwright tests
  * == perform actions + assert the state
    * perform actions
      * ❌NO need to wait for anything ❌
        * == ⚠️ONLY AUTOMATICALLY waits for wide range of [actionability](../../actionability.md) checks ⚠️
        * -> 💡NO flaky timeouts 💡
    * assertions
      * descriptive assertions
        * == describe the expectations
        * ❌NO need to deal with the race conditions ❌

## First test

* if you use JS & VSCode & want AUTOMATIC type checking -> add `// @ts-check` | EACH test file's start
* _Example:_ [here](/examples/initFromProjectRoot/tests/example.spec.ts)

## Actions

### Navigation

* == navigate -- to -- URL /
  * 👀PRIOR to moving forward, wait for page -- reach the -- load state 👀
* uses
  * 👀| MOST tests' start 👀
    * Reason: 🧠test will be -- able to interact with the -- page elements 🧠
* _Examples:_ [here](/examples/initFromProjectRoot/tests/example.spec.ts)
  * | JS,
  * | Python, TODO:
    ```python
    page.goto("https://playwright.dev/")
    ```
* see [`method: Page.goto`] options

### Interactions

* locate the elements
  * == Performing actions' start
  * -- via -- [Locators API](../../locators.md)
  * == 👀find element(s) | page | ANY moment👀
  * _Example:_ [here](/examples/initFromProjectRoot/tests/example.spec.ts)

### Basic actions

* MOST popular Playwright actions
* see [Locator API](../../api/class-locator.md)

| Action | Description |
| :- | :- |
| [`method: Locator.check`] | Check the input checkbox |
| [`method: Locator.click`] | Click the element |
| [`method: Locator.uncheck`] | Uncheck the input checkbox |
| [`method: Locator.hover`] | Hover mouse over the element |
| [`method: Locator.fill`] | Fill the form field, input text |
| [`method: Locator.focus`] | Focus the element |
| [`method: Locator.press`] | Press single key |
| [`method: Locator.setInputFiles`] | Pick files to upload |
| [`method: Locator.selectOption`] | Select option in the drop down |

## Assertions

* == `expect` function /
  * matchers
    * types
      * sync
      * async
        * -> tests
          * non-flaky
          * resilient
    * _Example:_ `toEqual`, `toContain`, `toBeTruthy`
* see [test assertions](./test-assertions.md)

* MOST popular async assertions

| Assertion | Description |
| :- | :- |
| [`method: LocatorAssertions.toBeChecked`] | Checkbox is checked |
| [`method: LocatorAssertions.toBeEnabled`] | Control is enabled |
| [`method: LocatorAssertions.toBeVisible`] | Element is visible |
| [`method: LocatorAssertions.toContainText`] | Element contains text |
| [`method: LocatorAssertions.toHaveAttribute`] | Element has attribute |
| [`method: LocatorAssertions.toHaveCount`] | List of elements has given length |
| [`method: LocatorAssertions.toHaveText`] | Element matches text |
| [`method: LocatorAssertions.toHaveValue`] | Input element has value |
| [`method: PageAssertions.toHaveTitle`] | Page has title |
| [`method: PageAssertions.toHaveURL`] | Page has URL |

### Test Isolation

* see [test fixtures](./test-fixtures.md) 👀
  * [built-in fixture, page](./test-fixtures.md#built-in)
* _Example:_ [here](/examples/initFromProjectRoot/tests/example.spec.ts)

### Using Test Hooks

* see [test hooks](./api/class-test.md)
  * `test.describe`
    * declare a group of tests
  * `test.beforeEach` & `test.afterEach`
    * executed BEFORE/AFTER EACH test
  * `test.beforeAll` & `test.afterAll`
    * executed 1! / worker BEFORE/AFTER ALL tests

* _Example:_ [here](/examples/initFromProjectRoot/tests/example.spec.ts)

## What's Next

- [Run single test, multiple tests, headed mode](./running-tests.md)
- [Generate tests with Codegen](../Generating%20tests/codegen-intro.md)
- [See a trace of your tests](./trace-viewer-intro.md)
- [Explore UI Mode](./test-ui-mode.md)
- [Run tests on CI with GitHub Actions](../CI%20GitHub%20Actions/ci-intro.md)

