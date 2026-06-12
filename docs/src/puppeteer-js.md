---
id: puppeteer
title: "Migrating from Puppeteer"
---

## Migration Principles

* goal
  * migrate FROM Puppeteer -- to --
    * [Playwright Library](library-js.md)
    * [Playwright Test](intro-js.md)

* Playwright APIs vs Puppeteer APIs
  * SIMILAR
    * _Example:_ ALSO exist [ElementHandle](handles.md)
      * ALTHOUGH, recommended to use
        * [Locator](locators.md)
  * Playwright API
    * MORE possibilities -- for --
      * web testing
      * cross-browser automation

## Cheat Sheet

| Puppeteer                                                                      | Playwright Library                                                                            |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `await puppeteer.launch()`                                                     | `await playwright.chromium.launch()`                                                          |
| `puppeteer.launch({product: 'firefox'})`                                       | `await playwright.firefox.launch()`                                                           |
| ❌WebKit is NOT supported❌                                                      | `await playwright.webkit.launch()`                                                            |
| `await browser.createIncognitoBrowserContext(...)`                             | `await browser.newContext(...)`                                                               |
| `await page.setViewport(...)`                                                  | `await page.setViewportSize(...)`                                                             |
| `await page.waitForXPath(XPathSelector)`                                       | `await page.waitForSelector(XPathSelector)`                                                   |
| `await page.waitForNetworkIdle(...)`                                           | `await page.waitForLoadState('networkidle')`                                                  |
| `await page.$eval(...)`                                                        | [Assertions](./test-assertions) can often be used instead to verify text, attribute, class... |
| `await page.$(...)`                                                            | Discouraged, use [Locators](api/Classes/class-locator.md) instead                             |
| `await page.$x(xpath_selector)`                                                | Discouraged, use [Locators](api/Classes/class-locator.md) instead                             |
| No methods dedicated to checkbox or radio input                                | `await page.locator(selector).check()`<br/>`await page.locator(selector).uncheck()`           |
| `await page.click(selector)`                                                   | `await page.locator(selector).click()`                                                        |
| `await page.focus(selector)`                                                   | `await page.locator(selector).focus()`                                                        |
| `await page.hover(selector)`                                                   | `await page.locator(selector).hover()`                                                        |
| `await page.select(selector, values)`                                          | `await page.locator(selector).selectOption(values)`                                           |
| `await page.tap(selector)`                                                     | `await page.locator(selector).tap()`                                                          |
| `await page.type(selector, ...)`                                               | `await page.locator(selector).fill(...)`                                                      |
| `await page.waitForFileChooser(...)`<br/>`await elementHandle.uploadFile(...)` | `await page.locator(selector).setInputFiles(...)`                                             |
| `await page.cookies([...urls])`                                                | `await browserContext.cookies([urls])`                                                        |
| `await page.deleteCookie(...cookies)`                                          | `await browserContext.clearCookies()`                                                         |
| `await page.setCookie(...cookies)`                                             | `await browserContext.addCookies(cookies)`                                                    |
| `page.on(...)`                                                                 | `page.on(...)`<br/>In order to intercept and mutate requests, see [`method: Page.route`]      |
| `await page.waitForNavigation()`                                               | ❌\| MOST cases, NOT needed❌<br/> Reason:🧠-- due to -- [auto-waiting](actionability.md)🧠     |
| `await page.waitForSelector(selector)`                                         | ❌\| MOST cases, NOT needed❌<br/> Reason:🧠-- due to -- [auto-waiting](actionability.md)🧠  |

## Testing

TODO:
To improve testing, it is advised to use [Locators](api/Classes/class-locator.md) and web-first [Assertions](./test-assertions)
* See [Writing Tests](./writing-tests)

It is common with Puppeteer to use `page.evaluate()` or `page.$eval()` to inspect an [ElementHandle] and extract the value of text content, attribute, class..
* Web-first [Assertions](./test-assertions) offers several matchers for this purpose, it is more reliable and readable.

[Playwright Test](./intro.md) is our first-party recommended test runner to be used with Playwright
* It provides several features like Page Object Model, parallelism, fixtures or reporters.

## Playwright Test Super Powers

Once you're on Playwright Test, you get a lot!

- Full zero-configuration TypeScript support
- Run tests across **all web engines** (Chrome, Firefox, Safari) on **any popular operating system** (Windows, macOS, Ubuntu)
- Full support for multiple origins, [(i)frames](api/Classes/class-frame.md), [tabs and contexts](./pages)
- Run tests in isolation in parallel across multiple browsers
- Built-in test [artifact collection](./test-use-options.md#recording-options)

You also get all these ✨ awesome tools ✨ that come bundled with Playwright Test:
- [Playwright Inspector](./debug.md)
- [Playwright Test Code generation](Getting Started/Generating tests/codegen-intro.md)
- [Playwright Tracing](./trace-viewer.md) for post-mortem debugging
