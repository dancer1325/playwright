---
id: test-components
title: "Components (experimental)"
---

* goal
  * component testing

* [youtube](https://www.youtube.com/watch?v=keV2CIgtBlg)
  * TODO:

## How to get started

* goal
  * how to enable Playwright Test | React or Vue project?

### Step 1: Install Playwright Test for components | your respective framework

* ways
  * -- via -- npm

    ```bash
    npm init playwright@latest -- --ct
    ```
  * -- via -- yarn

    ```bash
    yarn create playwright --ct
    ```
  * -- via -- pnpm

    ```bash
    pnpm create playwright --ct
    ```

* creates several files | your workspace
  * _Example:_ "playwright/"
    * ⚠️requirements⚠️
      * `<div id="root"></div>`
        * == place | mount the components
      * link the script
        * ALLOWED formats: ".js", ".ts", ".jsx" or ".tsx"
    * uses
      * render components | testing

### Step 2. Create a test file `src/App.spec.{ts,tsx}`

### Step 3. Run the tests

```sh
npm run test-ct
```

## how does component testing work?

* tests run | Node.js
* components run | real browser

* ⚠️limitations⚠️
  * ❌you can NOT pass complex live objects -- to -- your component❌
    * you can ONLY pass plain JS objects + built-in types (strings, numbers, dates etc.)
  * ❌you can NOT pass data synchronously | a callback❌
  * SOLUTION: [test stories](#test-stories)

## Test stories

* *story* -- "*.story.{ts,tsx}" file --
  * == 👀component / written specifically -- for -- a test👀
    * == Storybook's term
    * == render the component | 1 concrete configuration
  * collect ALL wrappers

TODO:

Let's say you'd like to test following component:

```js title="input-media.tsx"
import React from 'react';

type InputMediaProps = {
  // Media is a complex browser object we can't send to Node while testing.
  onChange(media: Media): void;
};

export function InputMedia(props: InputMediaProps) {
  return <></> as any;
}
```

Create a story file for your component:

```js title="input-media.story.tsx"
import React from 'react';
import InputMedia from './import-media';

type InputMediaForTestProps = {
  onMediaChange(mediaName: string): void;
};

export function InputMediaForTest(props: InputMediaForTestProps) {
  // Instead of sending a complex `media` object to the test, send the media name.
  return <InputMedia onChange={media => props.onMediaChange(media.name)} />;
}
// Export more stories here.
```

Then test the component via testing the story:

```js title="input-media.spec.tsx"
import { test, expect } from '@playwright/experimental-ct-react';
import { InputMediaForTest } from './input-media.story.tsx';

test('changes the image', async ({ mount }) => {
  let mediaSelected: string | null = null;

  const component = await mount(
    <InputMediaForTest
      onMediaChange={mediaName => {
        mediaSelected = mediaName;
      }}
    />
  );
  await component
    .getByTestId('imageInput')
    .setInputFiles('src/assets/logo.png');

  await expect(component.getByAltText(/selected image/i)).toBeVisible();
  await expect.poll(() => mediaSelected).toBe('logo.png');
});
```

As a result, for every component you'll have a story file that exports all the stories that are actually tested.
These stories live in the browser and "convert" complex object into the simple objects that can be accessed in the test.

## Under the hood

Here is how component testing works:

- Once the tests are executed, Playwright creates a list of components that the tests need.
- It then compiles a bundle that includes these components and serves it using a local static web server.
- Upon the `mount` call within the test, Playwright navigates to the facade page `/playwright/index.html` of this bundle and tells it to render the component.
- Events are marshalled back to the Node.js environment to allow verification.

Playwright is using [Vite](https://vitejs.dev/) to create the components bundle and serve it.

## Best practices and pitfalls

Component tests are most reliable when they embrace the fact that the test runs in Node.js while the mounted component runs in the browser.

### Prefer mounting inside each test

Keep `mount()` close to the assertions that use it
* Mounting in `beforeEach` makes it harder to see which component state belongs to which test and tends to hide accidental coupling between tests.

```js
test('renders the product name', async ({ mount }) => {
  const component = await mount(<ProductCard name="Playwright" />);
  await expect(component).toContainText('Playwright');
});
```

### Module mocks do not cross the Node/browser boundary

Module-level mocks such as `vi.mock()` or `jest.mock()` run in the test process
* The component bundle runs in the browser, so those mocks do not automatically affect what the component imports at runtime
* Prefer passing test-specific behavior through [`hooksConfig`](#hooks) and configuring it in `playwright/index.{js,ts,jsx,tsx}` with `beforeMount`.

### Reset browser state when a component depends on globals

Component testing may reuse the browser `context` and `page` between tests as a performance optimization
* If a component depends on global browser state such as `localStorage`, cookies, singleton services, or router state, reset that state in your test setup or in [`beforeMount`](#hooks) so each test starts from a known baseline.

## API reference

### props

Provide props to a component when mounted.

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>

<TabItem value="react">

```js title="component.spec.tsx"
import { test } from '@playwright/experimental-ct-react';

test('props', async ({ mount }) => {
  const component = await mount(<Component msg="greetings" />);
});
```

</TabItem>
<TabItem value="vue">

```js title="component.spec.ts"
import { test } from '@playwright/experimental-ct-vue';

test('props', async ({ mount }) => {
  const component = await mount(Component, { props: { msg: 'greetings' } });
});
```

```js title="component.spec.tsx"
// Or alternatively, using the `jsx` style
import { test } from '@playwright/experimental-ct-vue';

test('props', async ({ mount }) => {
  const component = await mount(<Component msg="greetings" />);
});
```

</TabItem>

</Tabs>

### callbacks / events

Provide callbacks/events to a component when mounted.

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>

<TabItem value="react">

```js title="component.spec.tsx"
import { test } from '@playwright/experimental-ct-react';

test('callback', async ({ mount }) => {
  const component = await mount(<Component onClick={() => {}} />);
});
```

</TabItem>
<TabItem value="vue">

```js title="component.spec.ts"
import { test } from '@playwright/experimental-ct-vue';

test('event', async ({ mount }) => {
  const component = await mount(Component, { on: { click() {} } });
});
```

```js title="component.spec.tsx"
// Or alternatively, using the `jsx` style
import { test } from '@playwright/experimental-ct-vue';

test('event', async ({ mount }) => {
  const component = await mount(<Component v-on:click={() => {}} />);
});
```

</TabItem>

</Tabs>

### children / slots

Provide children/slots to a component when mounted.

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>

<TabItem value="react">

```js title="component.spec.tsx"
import { test } from '@playwright/experimental-ct-react';

test('children', async ({ mount }) => {
  const component = await mount(<Component>Child</Component>);
});
```

</TabItem>
<TabItem value="vue">

```js title="component.spec.ts"
import { test } from '@playwright/experimental-ct-vue';

test('slot', async ({ mount }) => {
  const component = await mount(Component, { slots: { default: 'Slot' } });
});
```

```js title="component.spec.tsx"
// Or alternatively, using the `jsx` style
import { test } from '@playwright/experimental-ct-vue';

test('children', async ({ mount }) => {
  const component = await mount(<Component>Child</Component>);
});
```

</TabItem>

</Tabs>

### hooks

You can use `beforeMount` and `afterMount` hooks to configure your app
* This lets you set up things like your app router, fake server etc
* giving you the flexibility you need
* You can also pass custom configuration from the `mount` call from a test, which is accessible from the `hooksConfig` fixture
* This includes any config that needs to be run before or after mounting the component
* An example of configuring a router is provided below:

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>
  <TabItem value="react">

  ```js title="playwright/index.tsx"
  import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';
  import { BrowserRouter } from 'react-router-dom';

  export type HooksConfig = {
    enableRouting?: boolean;
  }

  beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
    if (hooksConfig?.enableRouting)
      return <BrowserRouter><App /></BrowserRouter>;
  });
  ```

  ```js title="src/pages/ProductsPage.spec.tsx"
  import { test, expect } from '@playwright/experimental-ct-react';
  import type { HooksConfig } from '../playwright';
  import { ProductsPage } from './pages/ProductsPage';

  test('configure routing through hooks config', async ({ page, mount }) => {
    const component = await mount<HooksConfig>(<ProductsPage />, {
      hooksConfig: { enableRouting: true },
    });
    await expect(component.getByRole('link')).toHaveAttribute('href', '/products/42');
  });
  ```

  </TabItem>

  <TabItem value="vue">

  ```js title="playwright/index.ts"
  import { beforeMount, afterMount } from '@playwright/experimental-ct-vue/hooks';
  import { router } from '../src/router';

  export type HooksConfig = {
    enableRouting?: boolean;
  }

  beforeMount<HooksConfig>(async ({ app, hooksConfig }) => {
    if (hooksConfig?.enableRouting)
      app.use(router);
  });
  ```

  ```js title="src/pages/ProductsPage.spec.ts"
  import { test, expect } from '@playwright/experimental-ct-vue';
  import type { HooksConfig } from '../playwright';
  import ProductsPage from './pages/ProductsPage.vue';

  test('configure routing through hooks config', async ({ page, mount }) => {
    const component = await mount<HooksConfig>(ProductsPage, {
      hooksConfig: { enableRouting: true },
    });
    await expect(component.getByRole('link')).toHaveAttribute('href', '/products/42');
  });
  ```

  </TabItem>

</Tabs>

### unmount

Unmount the mounted component from the DOM
* This is useful for testing the component's behavior upon unmounting
* Use cases include testing an "Are you sure you want to leave?" modal or ensuring proper cleanup of event handlers to prevent memory leaks.

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>

<TabItem value="react">

```js title="component.spec.tsx"
import { test } from '@playwright/experimental-ct-react';

test('unmount', async ({ mount }) => {
  const component = await mount(<Component/>);
  await component.unmount();
});
```

</TabItem>
<TabItem value="vue">

```js title="component.spec.ts"
import { test } from '@playwright/experimental-ct-vue';

test('unmount', async ({ mount }) => {
  const component = await mount(Component);
  await component.unmount();
});
```

```js title="component.spec.tsx"
// Or alternatively, using the `jsx` style
import { test } from '@playwright/experimental-ct-vue';

test('unmount', async ({ mount }) => {
  const component = await mount(<Component/>);
  await component.unmount();
});
```
</TabItem>

</Tabs>

### update

Update props, slots/children, and/or events/callbacks of a mounted component
* These component inputs can change at any time and are typically provided by the parent component, but sometimes it is necessary to ensure that your components behave appropriately to new inputs.

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>

<TabItem value="react">

```js title="component.spec.tsx"
import { test } from '@playwright/experimental-ct-react';

test('update', async ({ mount }) => {
  const component = await mount(<Component/>);
  await component.update(
      <Component msg="greetings" onClick={() => {}}>Child</Component>
  );
});
```

</TabItem>
<TabItem value="vue">

```js title="component.spec.ts"
import { test } from '@playwright/experimental-ct-vue';

test('update', async ({ mount }) => {
  const component = await mount(Component);
  await component.update({
    props: { msg: 'greetings' },
    on: { click() {} },
    slots: { default: 'Child' }
  });
});
```

```js title="component.spec.tsx"
// Or alternatively, using the `jsx` style
import { test } from '@playwright/experimental-ct-vue';

test('update', async ({ mount }) => {
  const component = await mount(<Component/>);
  await component.update(
      <Component msg="greetings" v-on:click={() => {}}>Child</Component>
  );
});
```

</TabItem>

</Tabs>

### Handling network requests

Playwright provides an **experimental** `router` fixture to intercept and handle network requests. There are two ways to use the `router` fixture:
* Call `router.route(url, handler)` that behaves similarly to [`method: Page.route`]. See the [network mocking guide](./mock.md) for more details.
* Call `router.use(handlers)` and pass [MSW library](https://mswjs.io/) request handlers to it.

Here is an example of reusing your existing MSW handlers in the test.

```js
import { handlers } from '@src/mocks/handlers';

test.beforeEach(async ({ router }) => {
  // install common handlers before each test
  await router.use(...handlers);
});

test('example test', async ({ mount }) => {
  // test as usual, your handlers are active
  // ...
});
```

You can also introduce a one-off handler for a specific test.

```js
import { http, HttpResponse } from 'msw';

test('example test', async ({ mount, router }) => {
  await router.use(http.get('/data', async ({ request }) => {
    return HttpResponse.json({ value: 'mocked' });
  }));

  // test as usual, your handler is active
  // ...
});
```

## Frequently asked questions

### What's the difference BETWEEN [@playwright/test](../../packages/playwright-test) & `@playwright/experimental-ct-{react,vue}`?

* [@playwright/experimental-ct-vue](../../packages/playwright-ct-vue/README.md)
* [@playwright/experimental-ct-react](../../packages/playwright-ct-react/README.md)

<Tabs
  groupId="js-framework"
  defaultValue="react"
  values={[
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
  ]
}>
<TabItem value="react">

```js
import { test, expect } from '@playwright/experimental-ct-react';
import HelloWorld from './HelloWorld';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(<HelloWorld msg="greetings" />);
  await expect(component).toContainText('Greetings');
});
```

</TabItem>

<TabItem value="vue">

```js
import { test, expect } from '@playwright/experimental-ct-vue';
import HelloWorld from './HelloWorld.vue';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(HelloWorld, {
    props: {
      msg: 'Greetings',
    },
  });
  await expect(component).toContainText('Greetings');
});
```

</TabItem>

</Tabs>

Additionally, it adds some config options you can use in your `playwright-ct.config.{ts,js}`.

Finally, under the hood, each test re-uses the `context` and `page` fixture as a speed optimization for Component Testing.
It resets them in between each test so it should be functionally equivalent to `@playwright/test`'s guarantee that you get a new, isolated `context` and `page` fixture per-test.

### I have a project that already uses Vite. Can I reuse the config?

At this point, Playwright is bundler-agnostic, so it is not reusing your existing Vite config
* Your config might have a lot of things we won't be able to reuse
* So for now, you would copy your path mappings and other high level settings into the `ctViteConfig` property of Playwright config.

```js
import { defineConfig } from '@playwright/experimental-ct-react';

export default defineConfig({
  use: {
    ctViteConfig: {
      // ...
    },
  },
});
```

You can specify plugins via Vite config for testing settings
* Note that once you start specifying plugins, you are responsible for specifying the framework plugin as well, `vue()` in this case:

```js
import { defineConfig, devices } from '@playwright/experimental-ct-vue';

import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  testDir: './tests/component',
  use: {
    trace: 'on-first-retry',
    ctViteConfig: {
      plugins: [
        vue(),
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            '@vueuse/head',
            'pinia',
            {
              '@/store': ['useStore'],
            },
          ],
          dts: 'src/auto-imports.d.ts',
          eslintrc: {
            enabled: true,
          },
        }),
        Components({
          dirs: ['src/components'],
          extensions: ['vue'],
        }),
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
    },
  },
});
```

### How do I use CSS imports?

If you have a component that imports CSS, Vite will handle it automatically
* You can also use CSS pre-processors such as Sass, Less, or Stylus, and Vite will handle them as well without any additional configuration
* However, corresponding CSS pre-processor needs to be installed.

Vite has a hard requirement that all CSS Modules are named `*.module.[css extension]`
* If you have a custom build config for your project normally and have imports of the form `import styles from 'styles.css'` you must rename your files to properly indicate they are to be treated as modules
* You could also write a Vite plugin to handle this for you.

Check [Vite documentation](https://vite.dev/guide/features#css) for more details.

### How can I test components that uses Pinia?

Pinia needs to be initialized in `playwright/index.{js,ts,jsx,tsx}`
* If you do this inside a `beforeMount` hook, the `initialState` can be overwritten on a per-test basis:

```js title="playwright/index.ts"
import { beforeMount, afterMount } from '@playwright/experimental-ct-vue/hooks';
import { createTestingPinia } from '@pinia/testing';
import type { StoreState } from 'pinia';
import type { useStore } from '../src/store';

export type HooksConfig = {
  store?: StoreState<ReturnType<typeof useStore>>;
}

beforeMount<HooksConfig>(async ({ hooksConfig }) => {
  createTestingPinia({
    initialState: hooksConfig?.store,
    /**
     * Use http intercepting to mock api calls instead:
     * https://playwright.dev/docs/mock#mock-api-requests
     */
    stubActions: false,
    createSpy(args) {
      console.log('spy', args)
      return () => console.log('spy-returns')
    },
  });
});
```

```js title="src/pinia.spec.ts"
import { test, expect } from '@playwright/experimental-ct-vue';
import type { HooksConfig } from '../playwright';
import Store from './Store.vue';

test('override initialState ', async ({ mount }) => {
  const component = await mount<HooksConfig>(Store, {
    hooksConfig: {
      store: { name: 'override initialState' }
    }
  });
  await expect(component).toContainText('override initialState');
});
```

### How do I access the component's methods or its instance?

Accessing a component's internal methods or its instance within test code is neither recommended nor supported
* Instead, focus on observing and interacting with the component from a user's perspective, typically by clicking or verifying if something is visible on the page
* Tests become less fragile and more valuable when they avoid interacting with internal implementation details, such as the component instance or its methods
* Keep in mind that if a test fails when run from a user’s perspective, it likely means the automated test has uncovered a genuine bug in your code.
