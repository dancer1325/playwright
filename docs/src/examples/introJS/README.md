# System requirements
## Node.js 18+
* `nvm install v16.20.2`
* `nvm use v16.20.2`
* | [nodeJSNotSupported](nodeJSNotSupported),
  * `npm init playwright@latest`
  * `npx playwright test`
    * 's return: "You are running Node.js 16.20.2. Playwright requires Node.js 18 or higher. Please update your version of Node.js."
## Windows
TODO:
## macOS
TODO:
## Unix
TODO:

# How to install Playwright?
## ways
### create -- from the -- scratch
* [here](initNewProject)
### | EXISTING project, install Playwright
* [here](onExistingProject)
* "playwright.config.ts"
  * NOT exist

# How to update to latest Playwright version?
## ways
* | [here](initFromProjectRoot)
  * `npm install -D @playwright/test@latest`
    * `git diff` & check the version differences

# How to check the CURRENT Playwright version?
## ways
### `npx playwright --version`
* | [here](initFromProjectRoot)
  * `npx playwright --version`
    * see the output version
