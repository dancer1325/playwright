const { webkit } = require('playwright');

// Execute async function
(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();   // Create a page

  page.once('load', () => console.log('Page loaded! -- Previous to navigate'));
  page.on('request', logRequest);
  await page.goto('https://example.com');   // Navigate to URL
  await page.screenshot({ path: 'screenshot.png' });  // Save a screenshot

  // NOT displayed, because the browser is closed immediately
  page.once('load', () => console.log('Page loaded! -- Previous to close the browser'));

  // Remove the listener on request event -> next time request is fired, NOT logRequest()
  page.removeListener('request', logRequest);
  await page.goto('https://playwright.dev/');

  // if you do NOT close it -> process stays forever
  await browser.close();

  // NOT displayed, because the browser is already closed
  //page.once('load', () => console.log('Page loaded!'));
})();

function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
