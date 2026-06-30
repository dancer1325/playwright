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
  * create -- from the -- scratch
    * ways
      * `npm init playwright@latest`
      * `yarn create playwright`
      * `pnpm create playwright`
    * | prompt
      * by default TS
    * == create files + download required browsers
      * create files
        * ['playwright.config.ts'](test-configuration-js.md)
        * 'package.json'
        * 'package-lock.json'
        * 'tests/example.spec.ts'
          * == BASIC example test
        * 'tests-examples/demo-todo-app.spec.ts'
          * == MORE detailed examples | TODO app
  * | EXISTING project, install Playwright
    * ways
      * `npm install @playwright/test`
      * `yarn create @playwright/test`
      * `pnpm create @playwright/test`
    * FURTHER steps
      * MANUAL [configuration](test-configuration-js.md)
        * Reason:🧠NOT created by default🧠

## How to run Playwright testS?

* [here](running-tests-js.md#running-tests)

## HTML Test Reports

* [here](test-reporters-js.md#html-reporter)

## How to run | UI Mode?

* [here](test-ui-mode-js.md)

## How to update to latest Playwright version?

* ways
  *
  ```bash
  npm install -D @playwright/test@latest

  # then you need to download NEW browser binaries + their dependencies
  npx playwright install --with-deps
  ```
  *
  ```bash
  yarn add --dev @playwright/test@latest

  # then you need to download NEW browser binaries + their dependencies
  yarn playwright install --with-deps
  ```
  *
  ```bash
  pnpm install --save-dev @playwright/test@latest

  # then you need to download NEW browser binaries + their dependencies
  pnpm exec playwright install --with-deps
  ```

## How to check the CURRENT Playwright version?

* ways
  * `npx playwright --version`
  * `yarn playwright --version`
  * `pnpm exec playwright --version`
