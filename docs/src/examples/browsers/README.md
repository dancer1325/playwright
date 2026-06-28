# ⚠️specific browser version / EACH Playwright version⚠️
* ways to check
  * [browsers.json](../../../../packages/playwright-core/browsers.json)
  * install Playwright & `npx playwright install --dry-run`

# install browsers
## -- via -- CLI
### install supported default browsers
* `playwright install --list`
  * check installed ones
### specify browser -- vía -- argument
* `npx playwright install chromium-tip-of-tree`
* `npx playwright install --list`
### ❌you can NOT specify the browser version❌
* `npx playwright install webkit-26.4`
  * trigger an error
## -- via -- API
TODO:

# Install OS dependencies
## | MacOs, ❌NOTHING specific❌
* `playwright install-deps --dry-run`
  * return empty
## can get installed AUTOMATICALLY
* requirements
  * OS == Linux OR Windows
TODO:
### if you want to install | 1! browser -> pass it -- as an -- argument
TODO:
### if you want to install browser + OS dependencies | 1! command -> use `install --with-deps`
TODO:

## TODO:

# TODO:
