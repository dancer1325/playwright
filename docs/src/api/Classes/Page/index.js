const { webkit } = require('playwright');

// 1. Events
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


// 2. Methods -- getByRole() --
(async () => {
  // Launch the browser
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the local HTML file
  console.log(__dirname);
  const anotherPage = await page.goto('file://' + __dirname + '/index.html');
  console.log(anotherPage.content);

  // Check the heading
  const  headingLocator = await page.getByRole('heading', { name: 'Sign up' });
  const isH3 = await headingLocator.evaluate(node => node.tagName.toLowerCase() === 'h3');
  console.log(`Is the heading an h3 element? ${isH3}`);

  // Check the checkbox
  const checkBoxLocator = await page.getByRole('checkbox', { name: 'Subscribe' });
  const isInput = await checkBoxLocator.evaluate(node => node.tagName.toLowerCase() === 'input');
  console.log(`Is the checkBoxLocator an input element? ${isInput}`);

  // Click the submit button
  const buttonLocator = await page.getByRole('button', { name: /submit/i });
  const isButton = await buttonLocator.evaluate(node => node.tagName.toLowerCase() === 'button');
  console.log(`Is the buttonLocator an input element? ${isButton}`);

  // Close the browser
  await browser.close();
})();
