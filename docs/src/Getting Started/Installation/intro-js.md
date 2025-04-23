---
id: intro
title: "Installation"
---

## System requirements

- Node.js 18+
- Windows
  - Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL)
- macOS
  - macOS 13 Ventura, or macOS 14 Sonoma.
- Unix
  - Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

## How to install Playwright?

* ways
  * `npm init playwright@latest`
  * `yarn create playwright`
  * `pnpm create playwright`
* == create files + download required browsers
  * create files
    * 'playwright.config.ts'
    * 'package.json'
    * 'package-lock.json'
    * 'tests/example.spec.ts'
      * == BASIC example test
    * 'tests-examples/demo-todo-app.spec.ts'
      * == MORE detailed examples | TODO app
* _Example:_
  * [here](../../../../examples/initFromProjectRoot)
  * [another one](../../../../examples/initNewProject)

## How to run?

* by default,
  * tests run
    * | ALL 3 browsers
    * -- via -- 3 workers
    * headless mode
      * == ❌NO browser opened up ❌
      * -> tests' results & test logs | terminal
* if you want to customize -> configure [playwright.config file](./test-configuration.md)

* ways
  * `npx playwright test`
  * `yarn playwright test`
  * `pnpm exec playwright test`

![tests running in command line](https://github.com/microsoft/playwright/assets/13063165/981c1b2b-dc7e-4b85-b241-272b44da6628)

* _Example:_
  * [here](../../../../examples/initFromProjectRoot)
  * [another one](../../../../examples/initNewProject)

## HTML Test Reports

* HTML Test Reports
  * allows
    * filtering by
      * browsers,
      * passed tests,
      * failed tests,
      * skipped tests
      * flaky tests
    * exploring EACH test
  * by default,
    * if SOME test failed -> AUTOMATICALLY opened
* | AFTER completing the test,
  * generate an [HTML Reporter](./test-reporters.md#html-reporter)

* ways
  * `npx playwright show-report`
  * `yarn playwright show-report`
  * `pnpm exec playwright show-report`

![HTML Report](https://github.com/microsoft/playwright/assets/13063165/38ec17a7-9e61-4002-b137-a93812765501)

* _Example:_
  * [here](../../../../examples/initFromProjectRoot)
  * [another one](../../../../examples/initNewProject)

## How to run | UI Mode?

* allows
  * time travel debugging,
  * watch mode
* see [MORE HERE](./test-ui-mode.md)
* ways
  * `npx playwright test --ui`
  * `yarn playwright test --ui`
  * `pnpm exec playwright test --ui`

![UI Mode](https://github.com/microsoft/playwright/assets/13063165/c5b501cc-4f5d-485a-87cc-66044c651786)

* _Example:_
  * [here](../../../../examples/initFromProjectRoot)
  * [another one](../../../../examples/initNewProject)

## How to update to latest Playwright version?

* ways
  *
    ```bash
    npm install -D @playwright/test@latest
    # Also download new browser binaries and their dependencies:
    npx playwright install --with-deps
    ```
  *
    ```bash
    yarn add --dev @playwright/test@latest
    # Also download new browser binaries and their dependencies:
    yarn playwright install --with-deps
    ```
  *
    ```bash
    pnpm install --save-dev @playwright/test@latest
    # Also download new browser binaries and their dependencies:
    pnpm exec playwright install --with-deps
    ```

* _Example:_
  * [here](../../../../examples/initFromProjectRoot)
  * [another one](../../../../examples/initNewProject)

## How to check the CURRENT Playwright version?

* ways
  * `npx playwright --version`
  * `yarn playwright --version`
  * `pnpm exec playwright --version`

* _Example:_
  * [here](../../../../examples/initFromProjectRoot)
  * [another one](../../../../examples/initNewProject)

## What's next

- [Write tests using web first assertions, page fixtures and locators](../Writing%20tests)
- [Run single test, multiple tests, headed mode](../Running%20and%20debugging%20tests)
- [Generate tests -- via -- Codegen](../Generating%20tests/codegen-intro.md)
- [See a trace of your tests](../Trace%20viewer)
- [VS Code Extension](../../Getting%20Started%20VSCode/getting-started-vscode-js.md)
