# Adding and Modifying APIs

## Step 1: ⭐️Define API | Documentation⭐️

* define OR update API | "docs/src/api/class-xxx.md"

### Documentation Format

#### **Method definition:**
```markdown
## async method: Page.methodName
* since: v1.XX
- returns: <[null]|[Response]>

Description of the method.

### param: Page.methodName.paramName
* since: v1.XX
- `paramName` <[string]>

Description of the parameter.

### option: Page.methodName.optionName
* since: v1.XX
- `optionName` <[string]>

Description of the option.
```

**Key syntax rules:**
- `* since: v1.XX`
  - == version | package.json / ⚠️WITHOUT "-next"⚠️
- `* langs: js, python` — language filter (optional)
- `* langs: alias-java: navigate` — language-specific method name
- `* deprecated: v1.XX` — deprecation marker
- `<[TypeName]>` — type annotation: `<[string]>`, `<[int]>`, `<[float]>`, `<[boolean]>`
- `<[null]|[Response]>` — union type
- `<[Array]<[Locator]>>` — array type
- `<[Object]>` with indented `- \`field\` <[type]>` — object type
- `### param:` — required parameter
- `### option:` — optional parameter
- `= %%-placeholder-name-%%` — reuse shared param definition from `docs/src/api/params.md`

#### **Property definition:**
```markdown
## property: Page.propName
* since: v1.XX
- type: <[string]>

Description.
```

#### **Event definition:**
```markdown
## event: Page.eventName
* since: v1.XX
- argument: <[Dialog]>

Description.
```

Keep methods, events and property definitions sorted alphabetically within the file.

Watch will kick in and auto-generate:
- `packages/playwright-core/types/types.d.ts` — public API types
- `packages/playwright/types/test.d.ts` — test API types

## Step 2: Implement Client API

Implement the new API in `packages/playwright-core/src/client/xxx.ts`.

### Client Implementation Pattern

Client classes extend `ChannelOwner<XxxChannel>` and call through `this._channel`:

```typescript
// Direct channel call (most common)
async methodName(param: string, options: channels.FrameMethodNameOptions = {}): Promise<void> {
  await this._channel.methodName({ param, ...options, timeout: this._timeout(options) });
}

// Channel call with response wrapping
async goto(url: string, options: channels.FrameGotoOptions = {}): Promise<network.Response | null> {
  return network.Response.fromNullable(
    (await this._channel.goto({ url, ...options, timeout: this._timeout(options) })).response
  );
}
```

**Key patterns:**
- Parameters are assembled into a single object for the channel call
- Timeout is processed through `this._timeout(options)` or `this._navigationTimeout(options)`
- Return values from channel are unwrapped/converted: `Response.fromNullable()`, `ElementHandle.from()`, etc.
- Locator methods delegate to Frame: `return await this._frame.click(this._selector, { strict: true, ...options })`
- Page methods often delegate to `this._mainFrame`

## Step 3: Define Protocol Channel

Define (or update) channel for the API in `packages/protocol/src/protocol.yml` as needed.

### Protocol YAML Format

Methods are defined under `commands:` in the interface section:

```yaml
Page:
  type: interface
  extends: EventTarget

  commands:
    methodName:
      title: Short description for tracing
      parameters:
        url: string                    # required string
        timeout: float                 # required float
        referer: string?               # optional string (? suffix)
        waitUntil: LifecycleEvent?     # optional reference to another type
        button:                        # optional enum
          type: enum?
          literals:
          - left
          - right
          - middle
        modifiers:                     # optional array of enums
          type: array?
          items:
            type: enum
            literals:
            - Alt
            - Control
            - Meta
            - Shift
        position: Point?               # optional reference type
        viewportSize:                  # required inline object
          type: object
          properties:
            width: int
            height: int
      returns:
        response: Response?            # optional return value
      flags:
        slowMo: true
        snapshot: true
        pausesBeforeAction: true
```

**Type primitives:** `string`, `int`, `float`, `boolean`, `binary`, `json`
**Optional:** append `?` to any type: `string?`, `int?`, `object?`
**Arrays:** `type: array` with `items:` (or `type: array?` for optional)
**Enums:** `type: enum` with `literals:` list
**References:** use type name directly: `Response`, `Frame`, `Point`
**Flags:** `slowMo`, `snapshot`, `pausesBeforeAction`, `pausesBeforeInput`

Watch will kick in and auto-generate:
- `packages/protocol/src/channels.d.ts` — channel TypeScript interfaces
- `packages/playwright-core/src/protocol/validator.ts` — runtime validators
- `packages/playwright-core/src/utils/isomorphic/protocolMetainfo.ts` — method metadata

## Step 4: Implement Dispatcher

Implement dispatcher handler in `packages/playwright-core/src/server/dispatchers/xxxDispatcher.ts` as needed.

### Dispatcher Pattern

Dispatchers receive validated params and route to server objects:

```typescript
// Simple pass-through (most common)
async methodName(params: channels.PageMethodNameParams, progress: Progress): Promise<void> {
  await this._page.methodName(progress, params.value);
}

// With response wrapping
async goto(params: channels.FrameGotoParams, progress: Progress): Promise<channels.FrameGotoResult> {
  return { response: ResponseDispatcher.fromNullable(this._browserContextDispatcher,
    await this._frame.goto(progress, params.url, params)) };
}

// With dispatcher extraction (when params contain dispatcher references)
async expectScreenshot(params: channels.PageExpectScreenshotParams, progress: Progress): Promise<channels.PageExpectScreenshotResult> {
  const mask = (params.mask || []).map(({ frame, selector }) => ({
    frame: (frame as FrameDispatcher)._object,
    selector,
  }));
  return await this._page.expectScreenshot(progress, { ...params, mask });
}

// With array result wrapping
async querySelectorAll(params: channels.FrameQuerySelectorAllParams, progress: Progress): Promise<channels.FrameQuerySelectorAllResult> {
  const elements = await progress.race(this._frame.querySelectorAll(params.selector));
  return { elements: elements.map(e => ElementHandleDispatcher.from(this, e)) };
}
```

**Key patterns:**
- Method signature: `async method(params: channels.XxxMethodParams, progress: Progress): Promise<channels.XxxMethodResult>`
- Extract params: `params.url`, `params.selector`, etc.
- Convert dispatcher refs to server objects: `(params.frame as FrameDispatcher)._object`
- Wrap server objects as dispatchers in results: `ResponseDispatcher.fromNullable()`, `ElementHandleDispatcher.from()`
- All methods receive `Progress` for timeout/cancellation

## Step 5: Implement Server Logic

Handler should route the call into the corresponding method in `packages/playwright-core/src/server/xxx.ts`.

Server methods implement the actual browser interaction:

```typescript
// In packages/playwright-core/src/server/frames.ts
async goto(progress: Progress, url: string, options: types.GotoOptions = {}): Promise<network.Response | null> {
  // ... validation, URL construction ...
  // Delegates to browser-specific implementation:
  const result = await this._page.delegate.navigateFrame(this, url, referer);
  // ... wait for lifecycle events ...
  return response;
}
```

Browser-specific implementations live in:
- `packages/playwright-core/src/server/chromium/crPage.ts` — Chromium (uses CDP: `this._client.send('Page.navigate', { ... })`)
- `packages/playwright-core/src/server/firefox/ffPage.ts` — Firefox
- `packages/playwright-core/src/server/webkit/wkPage.ts` — WebKit

## Step 6: Write Tests

### Test Location
- Page-only tests: `tests/page/xxx.spec.ts` — use `page` fixture
- Context tests: `tests/library/xxx.spec.ts` — use `context` fixture

### Test Patterns

**Page test:**
```typescript
import { test as it, expect } from './pageTest';

it('should do something @smoke', async ({ page, server }) => {
  await page.goto(server.EMPTY_PAGE);
  // ... assertions ...
  expect(page.url()).toBe(server.EMPTY_PAGE);
});

it('should handle options', async ({ page, server, browserName, isAndroid }) => {
  it.skip(isAndroid, 'Not supported on Android');
  it.info().annotations.push({ type: 'issue', description: 'https://github.com/user/repo/issues/123' });
  // ...
});
```

**Library/context test:**
```typescript
import { contextTest as it, expect } from '../config/browserTest';

it('should work with context', async ({ context, server }) => {
  const page = await context.newPage();
  await page.goto(server.EMPTY_PAGE);
  // ...
});
```

### Available Fixtures
- `page` — isolated page instance
- `context` — browser context (library tests)
- `server` — HTTP test server (`server.EMPTY_PAGE`, `server.PREFIX`, `server.CROSS_PROCESS_PREFIX`)
- `httpsServer` — HTTPS test server
- `asset(name)` — path to test asset file
- `browserName` — `'chromium' | 'firefox' | 'webkit'`
- `channel` — browser channel string
- `isAndroid`, `isBidi`, `isElectron` — platform booleans
- `isWindows`, `isMac`, `isLinux` — OS booleans
- `mode` — test mode (`'default'`, `'service'`, etc.)

### Running Tests
```bash
npm run ctest tests/page/xxx.spec.ts          # Chromium only
npm run test tests/page/xxx.spec.ts           # All browsers
npm run ctest -- --grep "should do something" # Filter by name
```

## Architecture Overview

```
docs/src/api/class-xxx.md          (API documentation — source of truth for public types)
  → auto-generates → types.d.ts, test.d.ts

packages/protocol/src/protocol.yml  (RPC protocol definition)
  → auto-generates → channels.d.ts, validator.ts, protocolMetainfo.ts

Client call chain:
  user code → Page.method() → Frame.method() → this._channel.method(params)
    → Proxy validates & sends → Connection.sendMessageToServer()
    → [wire] →
  DispatcherConnection.dispatch() → XxxDispatcher.method(params, progress)
    → ServerObject.method(progress, ...) → BrowserDelegate (CDP/Firefox/WebKit)
```
