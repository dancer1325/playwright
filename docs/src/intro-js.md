---
id: intro
title: "Installation"
---


TODO:
Tips:

- Run a single project/browser: `--project=chromium`.
- Run one file: `npx playwright test tests/example.spec.ts`.
- Open testing UI: `--ui`.

filtering, headed mode, sharding and retries.

## HTML Test Reports

After a test run, the [HTML Reporter](./test-reporters.md#html-reporter) provides a dashboard filterable by the browser, passed, failed, skipped, flaky and more. Click a test to inspect errors, attachments and steps. It auto-opens only when failures occur; open manually with the command below.

<Tabs
  groupId="js-package-manager"
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'}
  ]
}>
<TabItem value="npm">

```bash
npx playwright show-report
```

</TabItem>

<TabItem value="yarn">

```bash
yarn playwright show-report
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm exec playwright show-report
```

</TabItem>

</Tabs>

![HTML Report](./images/getting-started/html-report-basic.png)

## Running the Example Test in UI Mode

Run tests with [UI Mode](./test-ui-mode.md) for watch mode, live step view, time travel debugging and more.

<Tabs
  groupId="js-package-manager"
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'}
  ]
}>

<TabItem value="npm">

```bash
npx playwright test --ui
```

</TabItem>

<TabItem value="yarn">

```bash
yarn playwright test --ui
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm exec playwright test --ui
```

</TabItem>

</Tabs>

![UI Mode](./images/getting-started/ui-mode.png)

See the [detailed guide on UI Mode](./test-ui-mode.md) for watch filters, step details and trace integration.

## Updating Playwright

Update Playwright and download new browser binaries and their dependencies:

<Tabs
  groupId="js-package-manager"
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'}
  ]
}>

<TabItem value="npm">

```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add --dev @playwright/test@latest
yarn playwright install --with-deps
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm install --save-dev @playwright/test@latest
pnpm exec playwright install --with-deps
```

</TabItem>

</Tabs>

Check your installed version:

<Tabs
  groupId="js-package-manager"
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'}
  ]
}>

<TabItem value="npm">

```bash
npx playwright --version
```

</TabItem>

<TabItem value="yarn">

```bash
yarn playwright --version
```

</TabItem>

<TabItem value="pnpm">

```bash
pnpm exec playwright --version
```

</TabItem>

</Tabs>

## System requirements

- Node.js 18+
- Windows
  - Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL)
- macOS
  - macOS 13 Ventura, or macOS 14 Sonoma.
- Unix
  - Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

## How to install Playwright?

* steps
  * | create -- from -- scratch
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

## How to run Playwright testS?

* [here](running-tests-js.md#running-tests)

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


