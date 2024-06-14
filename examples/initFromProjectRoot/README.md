## System requirements
* Node.js v18+
* OS
  * [Windows] Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL)
  * [MacOs] MacOS 12 Monterey, MacOS 13 Ventura, or MacOS 14 Sonoma
  * [Linux] Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.

## How has it been created?
* `npm init playwright@latest`
  * alternatives
    * `yarn create playwright`
    * `pnpm create playwright`
  * what does it make?
    * download the browsers ❓
    * create files
      * 'playwright.config.ts'
        * Check '../Playwright Test/Test configuration'
      * 'package.json'
      * 'package-lock.json'
      * 'tests/example.spec.ts'
        * basic example test
      * 'tests-examples/demo-todo-app.spec.ts'
        * tests written to test a TODO app

## How to run?
* `npx playwright test`
  * run in headless mode
    * == if you run the tests -> NO browser open up
  * `npx playwright test --ui`
    * run in headed mode
    * Check '../Playwright Test/UI Mode'

## How to use reporters?
* `npx playwright show-report`
  * open LAST test run

## Notes
* `npm install -D @playwright/test@latest`
  * update Playwright to latest version
* `npx playwright install --with-deps`
  * download new browser binaries & their dependencies
* `npx playwright --version`
  * check Playwright version / running
