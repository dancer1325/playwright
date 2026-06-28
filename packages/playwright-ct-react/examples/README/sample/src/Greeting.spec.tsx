import { test, expect } from '@playwright/experimental-ct-react';
import Greeting from './Greeting';

// `mount` arrives as a FIXTURE — injected by destructuring, exactly like `page`
// in end-to-end tests. It is provided by @playwright/experimental-ct-react.

test('mount renders the component with its props', async ({ mount }) => {
  // The test runs in Node.js; the component runs in a real browser.
  const component = await mount(<Greeting name="Playwright" />);

  // `mount` returns a Locator, so the usual web-first assertions apply.
  await expect(component).toContainText('Hello Playwright');
});

test('mount wires events back from the browser to Node', async ({ mount }) => {
  let greeted = false;

  const component = await mount(
    <Greeting
      name="World"
      // The callback lives in Node; the click happens in the browser.
      // Playwright marshals the event back so this closure runs.
      onGreet={() => {
        greeted = true;
      }}
    />
  );

  await component.click();
  expect(greeted).toBe(true);
});

test('mount returns a Locator that supports update() and unmount()', async ({ mount }) => {
  const component = await mount(<Greeting name="One" />);
  await expect(component).toContainText('Hello One');

  // Re-render the same mounted component with new props.
  await component.update(<Greeting name="Two" />);
  await expect(component).toContainText('Hello Two');

  // Tear the component down explicitly.
  await component.unmount();
});
