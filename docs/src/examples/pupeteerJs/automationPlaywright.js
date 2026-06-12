const { chromium } = require('playwright/docs/src/examples/pupeteerJs/automationPlaywright'); // 1

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage(); // 2
  await page.setViewportSize({ width: 1280, height: 800 }); // 3
  await page.goto('https://playwright.dev/', {
    waitUntil: 'networkidle', // 4
  });
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
