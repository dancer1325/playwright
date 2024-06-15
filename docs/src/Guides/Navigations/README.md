* allows
  * navigate to URLs &
    * Wait the page fires the [window.load event](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) !!
      * if the page makes a client-side redirect before `load` -> waits redirected page fire `load`
      * modern pages perform numerous activities after `load` -> Playwright waits for the target elements become [actionable](https://playwright.dev/docs/actionability) !!
    * _Example:_
      ```
      await page.goto('https://example.com');
      # Wait the page fires the load event
      ```
      ```
      # Navigate and click element
      # Click will auto-wait for the element == when it's visible
      await page.goto('https://example.com');
      await page.getByText('Example Domain').click();
      ```
  * handle navigations -- triggered by -- page interactions

* Hydration
  * TODO:

## Notes
* Playwright == very fast user
  * == as soon as target is actionable -> performs the action

## Examples
* Check '../examples/initFromProjectRoot'
