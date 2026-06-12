# Automation
TODO:

Migration highlights (see inline comments in the Playwright code snippet):

1. Each Playwright Library file has explicit import of `chromium`
  * Other browsers `webkit` or `firefox` can be used.
1. For browser state isolation, consider [browser contexts](./browser-contexts.md)
1. `setViewport` becomes `setViewportSize`
1. `networkidle2` becomes `networkidle`
* Please note that in most cases it is not useful, thanks to auto-waiting.

# Test
TODO:

1. Each Playwright Test file has explicit import of the `test` and `expect` functions
1. Test function is marked with `async`
1. Playwright Test is given a `page` as one of its parameters. This is one of the many [useful fixtures](./api/class-fixtures) in Playwright Test.
   Playwright Test creates an isolated [Page] object for each test. However, if you'd like to reuse a single [Page] object between multiple tests, you can create your own in [`method: Test.beforeAll`] and close it in [`method: Test.afterAll`].
1. Locator creation with [`method: Page.locator`] is one of the few methods that is sync.
1. Use [assertions](./test-assertions) to verify the state instead of `page.$eval()`.
