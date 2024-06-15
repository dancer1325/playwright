* extends [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)
* 1+ Page instances can exist / 1 Browser

## Methods
* allows
  * -- interacting with --
    * 1! tab in a [Browser](https://playwright.dev/docs/api/class-browser)
    * [extended background page in Chromium](https://developer.chrome.com/docs/extensions/mv2/background-pages)
* TODO:
* `getByRole()`
  * allows
    * locating elements by
      * [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles)
      * [ARIA attributes](https://www.w3.org/TR/wai-aria-1.2/#aria-attributes)
      * [accessible name](https://w3c.github.io/accname/#dfn-accessible-name)

## Properties
* TODO:

## Events
* can be handled -- via -- [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)'s methods
  * _Example:_ `on`, `once`, `removeListener`
* TODO:

## Examples
* How has it been created?
  * `npm init` & `npm install playwright`
* How to run?
  * `node index.js` OR `npm run main`
