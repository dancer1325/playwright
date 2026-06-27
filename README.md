# 🎭 Playwright

* Playwright
  * == Web Testing & Automation platform
    * == [Playwright Test](#playwright-test) + [Playwright CLI](#playwright-cli) + [Playwright MCP](#playwright-mcp) + [Playwright Library](#playwright-library) + [VS Code Extension](#vs-code-extension)
  * allows
    * E2E testing
      * |
        * browsers
          * FULL browser isolation
          * AVAILABLE ones
            * [Chromium](https://www.chromium.org/Home)
              * ⚠️by default, use [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing)⚠️
                * ❌!= Google Chrome❌
            * [Firefox](https://www.mozilla.org/en-US/firefox/new/)
            * [WebKit](https://webkit.org/)
        * locally
        * CI
        * AI agents
      * -- via -- 1! API
    * web automation cross-browser
      * **ever-green**
      * **capable**
      * **reliable**
      * **fast**

|                         | Linux | macOS | Windows |
|-------------------------|-------|-------|---------|
| Chromium v149.0.7827.22 | ✅     | ✅     | ✅       |
| WebKit v26.4            | ✅     | ✅     | ✅       |
| Firefox v151.0          | ✅     | ✅     | ✅       |

## Playwright Test

* == E2E framework
  * == test runner + assertions + isolation + parallelization + rich tooling
  * allows
    * E2E testing
  * ways to install
    * `npm init playwright@latest`
    * add MANUALLY

## documentation

* [here](docs)
  * ⚠️SOME are language-specific⚠️
    * _Example:_ intro
      * | [JS/TS](docs/src/Getting%20Started/Installation/intro-js.md)
      * | [Python](docs/src/Getting%20Started/Installation/intro-python.md)
      * | [.NET](docs/src/Getting%20Started/Installation/intro-csharp.md)
      * | [Java](docs/src/Getting%20Started/Installation/intro-java.md)

### Key capabilities
#### **Auto-wait and web-first assertions.**
No artificial timeouts
* Playwright waits for elements to be actionable, and assertions automatically retry until conditions are met.

#### Any browser • Any platform • 1! API

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
    * default one
  * headed
    * == running WITH a GUI
* mobile emulation
  * for
    * Chrome for Android
    * Mobile Safari

#### Resilient • No flaky tests
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
#### **Locators.**
Find elements with resilient locators that mirror how users see the page:

```TypeScript
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')
page.getByPlaceholder('Search...')
page.getByTestId('login-form')
```

**Test isolation.** Each test runs in its own browser context — equivalent to a fresh browser profile
* Save authentication state once and reuse it across tests:

```TypeScript
// Save state after login
await page.context().storageState({ path: 'auth.json' });

// Reuse in other tests
test.use({ storageState: 'auth.json' });
```

#### No trade-offs • No limits
* tests are run out-of-process
  * **Note:** 👁️browsers run web content of different origins | different processes 👁️
* **Multiple scenarios | 1! test**
* **Trusted events** are produced
* Shadow DOM is adjusted

#### **Tracing.**
Capture execution traces, screenshots, and videos on failure
* Inspect every action, DOM snapshot, network request, and console message in the [Trace Viewer](https://playwright.dev/docs/trace-viewer):

```TypeScript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on-first-retry',
  },
});
```

```bash
npx playwright show-trace trace.zip
```

#### **Parallelism.** Tests run in parallel by default across all configured browsers.

[Full testing documentation](https://playwright.dev/docs/intro)

#### Full isolation • Fast execution
* **1 browser context / test**
  * ->
    * full test isolation
    * take ms
* **Log in 1!**
  * == authentication state of the context
    * can be saved &
    * reused it in ALL tests

#### Tooling
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


## [Playwright CLI](https://github.com/microsoft/playwright-cli)

* == CL interface
  * allows
    * automatizing the browser
      * _Examples:_ | browser,
        * navigate, click, fill, ...
  * uses
    * coding agents can run E2E tests

* vs Playwright MCP
  * MORE token-efficient
    * Reason:🧠avoid loading | model context,
      * large tool schemas
      * accessibility trees🧠

* ways to install
  * `npm install -g @playwright/cli@latest`
  * if you want richer agent integration -> install skills

    ```bash
    playwright-cli install --skills
    ```

### how to use?

* ways
  * point your coding agent -- at a -- task

    ```
    Test the "add todo" flow on https://demo.playwright.dev/todomvc using playwright-cli.
    Take screenshots for all successful and failing scenarios.
    ```
  * run commands DIRECTLY

    ```bash
    playwright-cli open https://demo.playwright.dev/todomvc/ --headed
    playwright-cli type "Buy groceries"
    playwright-cli press Enter
    playwright-cli screenshot
    ```

### session monitoring -- `playwright-cli show` --

* open a visual dashboard / has live screencast previews of ALL running browser sessions
* if you want to take remote control -> click any session

## [Playwright MCP](https://github.com/microsoft/playwright-mcp)

* gives AI agents -- , through [Model Context Protocol](https://modelcontextprotocol.io) + structured accessibility snapshots, -- FULL browser control
  * ❌NO requires❌
    * vision models
    * screenshots
  * _Examples:_ navigation, form filling, screenshots, network mocking, storage management, ...

### how to setup?

* steps
  * | your MCP client (VS Code, Cursor, Claude Desktop, Windsurf, etc.),
    * add

      ```json
      {
        "mcpServers": {
          "playwright": {
            "command": "npx",
            "args": ["@playwright/mcp@latest"]
          }
        }
      }
      ```
      * if you are using Claude Code -> `claude mcp add playwright npx @playwright/mcp@latest`

### how does it work?

* steps
  * Ask your AI assistant -- to -- interact with any web page

    ```
    Navigate to https://demo.playwright.dev/todomvc and add a few todo items.
    ```

  * agent sees the page -- , as a, -- structured accessibility tree

    ```
    - heading "todos" [level=1]
    - textbox "What needs to be done?" [ref=e5]
    - listitem:
      - checkbox "Toggle Todo" [ref=e10]
      - text: "Buy groceries"
    ```

## Playwright Library

* allows
  * browser automation scripts WITHOUT test runner
    * _Examples:_ web scraping, PDF generation, screenshot capture

* way to install
  * `npm i playwright`

Test authoring and debugging in VS Code | [Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) |

## VS Code Extension

* allows
  * | your editor,
    * test running,
    * debugging,
    * code generation

**Run and debug tests** from the editor with a single click
Set breakpoints, inspect variables, and step through test execution with a live browser view.

**Generate tests with CodeGen.** Click "Record new" to open a browser — navigate and interact with your app while Playwright writes the test code for you.

**Pick locators.** Hover over any element in the browser to see the best available locator, then click to copy it to your clipboard.

**Trace Viewer integration.** Enable "Show Trace Viewer" in the sidebar to get a full execution trace after each test run — DOM snapshots, network requests, console logs, and screenshots at every step.

* [how to install?](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
* [documentation](docs/src/Getting%20Started%20VSCode)

## Resources

* [Documentation](https://playwright.dev)
* [API reference](https://playwright.dev/docs/api/class-playwright)
* [MCP server](https://github.com/microsoft/playwright-mcp)
* [CLI for coding agents](https://github.com/microsoft/playwright-cli)
* [VS Code extension](https://github.com/microsoft/playwright-vscode)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)
* [Discord](https://aka.ms/playwright/discord)
