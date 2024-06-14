# 🎭 Playwright

[![npm version](https://img.shields.io/npm/v/playwright.svg)](https://www.npmjs.com/package/playwright) <!-- GEN:chromium-version-badge -->[![Chromium version](https://img.shields.io/badge/chromium-127.0.6533.5-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)<!-- GEN:stop --> <!-- GEN:firefox-version-badge -->[![Firefox version](https://img.shields.io/badge/firefox-127.0-blue.svg?logo=firefoxbrowser)](https://www.mozilla.org/en-US/firefox/new/)<!-- GEN:stop --> <!-- GEN:webkit-version-badge -->[![WebKit version](https://img.shields.io/badge/webkit-17.4-blue.svg?logo=safari)](https://webkit.org/)<!-- GEN:stop -->

## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

Playwright is a framework for Web Testing and Automation
* allows
  * testing [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [WebKit](https://webkit.org/)
    * -- via -- 1! API
  * web automation cross-browser
    * **ever-green**
    * **capable**
    * **reliable**
    * **fast**

|          | Linux | macOS | Windows |
|   :---   | :---: | :---: | :---:   |
| Chromium <!-- GEN:chromium-version -->127.0.6533.5<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| WebKit <!-- GEN:webkit-version -->17.4<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Firefox <!-- GEN:firefox-version -->127.0<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |

* [system requirements](https://playwright.dev/docs/intro#system-requirements)
* dedicated documentation / language
  * [JS/TS](https://playwright.dev/docs/intro) -- default --cf
  * [Python](https://playwright.dev/python/docs/intro)
  * [.NET](https://playwright.dev/dotnet/docs/intro)
  * [Java](https://playwright.dev/java/docs/intro)

---

## Installation

* Playwright Test
  * := own test runner for end-to-end tests
  * [Installation configuration](https://playwright.dev/docs/installation)

### Via init command
* it creates
  * configuration file -- 'playwright.config.ts' --
  * optionally
    * examples -- 'tests/' --
    * GitHub Action workflow
    * first test example.spec.ts -- 'tests/' --
* Check '/examples/initFromProjectRoot'
* Check '/examples/initNewProject'


### Via Manually
* Check '/examples/skeletonNPMProject'

---

## Capabilities

### Any browser • Any platform • One API
* 1! API
* cross-
  * browser
    * == ALL modern rendering engines
      * *Example:* Chromium, WebKit, Firefox
  * platform
    * == OS
  * language
    * == 1! API / ALL languages
      * *Example:* [TypeScript & Js](https://playwright.dev/docs/intro), [Python](https://playwright.dev/python/docs/intro), [.Net](https://playwright.dev/dotnet/docs/intro) & [Java](https://playwright.dev/java/docs/intro)
        * **Note:** 👁️Previous links are different / — linked to — different program languages 👁️
* headless & headed
  * headless
    * == running WITHOUT a GUI
  * headed
    * == running WITH a GUI
* mobile emulation
  * for
    * Chrome for Android
    * Mobile Safari

### Resilient • No flaky tests
* **Auto-wait** == NO artificial timeouts
  * via
    * waiting elements / being actionable
    * introspection events
* **Web-first assertions**
  * assertions — created specifically for the — dynamic web (❓)
  * checks — are retried automatically — until necessary conditions are met
* **Tracing**
  * — via configuration of —
    * test retry strategy
    * capturing
      * execution trace
      * videos
      * screenshots

### No trade-offs • No limits
* tests are run out-of-process
  * **Note:** 👁️browsers run web content of different origins | different processes 👁️
* **Multiple scenarios | 1! test**
* **Trusted events** are produced
* Shadow DOM is adjusted

### Full isolation • Fast execution
* **1 browser context / test**
  * ->
    * full test isolation
    * take ms
* **Log in 1!**
  * == authentication state of the context
    * can be saved &
    * reused it in ALL tests

### Tooling
* **[Codegen](https://playwright.dev/docs/codegen)**
  * allows
    * record your actions
      * on any language
      * — & then → generate tests
* **[Playwright inspector](https://playwright.dev/docs/inspector)**
  * allows
    * inspecting page
    * generating selectors
    * stepping through test execution
    * seeing click points
    * exploring execution logs
* **[Trace Viewer](https://playwright.dev/docs/trace-viewer)**
  * capture information →
    * test execution screencast
    * live DOM snapshots
    * action explorer
    * to investigate

---

## Resources

* [Documentation](https://playwright.dev/docs/intro)
* [API reference](https://playwright.dev/docs/api/class-playwright/)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)
