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

## == MAXIMUM number of CONCURRENT worker processes
* `npx playwright test`
  * check the logged message
### by default, MINIMUM(1/2 * CPU cores, NUMBER of tests)
* `npx playwright test`
  * check the logged message == 6 == [NUMBER of tests](tests) * NUMBER of specified browsers (3)

TODO:

## TODO:
