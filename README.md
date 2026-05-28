# 🎭 Playwright

* Playwright
  * := framework -- for -- Web Testing & Automation
  * allows
    * E2E testing | [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/), [WebKit](https://webkit.org/), locally, CI & mobile emulations
      * -- via -- 1! API
    * web automation cross-browser
      * **ever-green**
      * **capable**
      * **reliable**
      * **fast**

| Browser                | Linux | macOS | Windows |
|------------------------|:-----:|:-----:|:-------:|
| Chromium 127.0.6533.5v | ✅    | ✅    | ✅      |
| WebKit 17.4v           | ✅    | ✅    | ✅      |
| Firefox 127.0v         | ✅    | ✅    | ✅      |

* Playwright Test
  * := 👀OWN test runner -- for -- E2E tests 👀

## documentation

* [here](docs)
  * ⚠️SOME are language-specific⚠️
    * _Example:_ intro
      * | [JS/TS](docs/src/Getting%20Started/Installation/intro-js.md)
      * | [Python](docs/src/Getting%20Started/Installation/intro-python.md)
      * | [.NET](docs/src/Getting%20Started/Installation/intro-csharp.md)
      * | [Java](docs/src/Getting%20Started/Installation/intro-java.md)

## Capabilities

### Any browser • Any platform • 1! API

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
* **[Codegen](docs/src/codegen)**
  * allows
    * record your actions
      * | any language
      * — & then → generate tests
* **[Playwright inspector](docs/src/inspector.md)**
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
