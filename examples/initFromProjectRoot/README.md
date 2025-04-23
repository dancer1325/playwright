## System requirements
* Node.js v18+
* OS
  * [Windows] Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL)
  * [MacOs] MacOS 12 Monterey, MacOS 13 Ventura, or MacOS 14 Sonoma
  * [Linux] Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.

## How has it been created?
* `npm init playwright@latest`

## How to run?
* `npx playwright test`
  * == headless mode
    * == ❌NO browser open up❌
* `npx playwright test --ui`
  * == headed mode

## How to use reporters?
* `npx playwright show-report`
  * open LAST test run

## Notes
* if you want to update ->
  * `npm install -D @playwright/test@latest`
    * update Playwright to latest version
  * `npx playwright install --with-deps`
    * download new browser binaries & their dependencies
* `npx playwright --version`
  * check Playwright version / running
