# 🎭 Playwright

* := framework -- for -- Web Testing & Automation

* allows
  * E2E testing | [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/), [WebKit](https://webkit.org/), locally, CI & mobile emulations
    * -- via -- 1! API
  * web automation cross-browser
    * **ever-green**
    * **capable**
    * **reliable**
    * **fast**

|          | Linux | macOS | Windows |
|   :---   | :---: | :---: | :---:   |
| Chromium <!-- GEN:chromium-version -->127.0.6533.5<!-- GEN:stop --> | ✅ | ✅ | ✅ |
| WebKit <!-- GEN:webkit-version -->17.4<!-- GEN:stop --> | ✅ | ✅ | ✅ |
| Firefox <!-- GEN:firefox-version -->127.0<!-- GEN:stop --> | ✅ | ✅ | ✅ |

* 👀dedicated documentation / language 👀
  * [JS/TS](https://playwright.dev/docs/intro)
  * [Python](https://playwright.dev/python/docs/intro)
  * [.NET](https://playwright.dev/dotnet/docs/intro)
  * [Java](https://playwright.dev/java/docs/intro)
* [system requirements](https://playwright.dev/docs/intro#system-requirements)
  * ALSO / language

---

## How to install?

* Playwright Test
  * := 👀OWN test runner -- for -- E2E tests 👀
  * [Installation configuration](docs/src/Getting%20Started/Installation)

### Via init command
* creates
  * configuration file -- 'playwright.config.ts' --
  * OPTIONALLY
    * examples -- 'tests/' --
    * GitHub Action workflow
    * first test example.spec.ts -- 'tests/' --
* _Examples:_
  * [/examples/initFromProjectRoot](examples/initFromProjectRoot)
  * [/examples/initNewProject](examples/initNewProject)

### Via Manually
* _Example:_ [/examples/skeletonNPMProject](/examples/skeletonNPMProject)

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
