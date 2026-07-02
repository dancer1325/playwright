// Create a page.
Page page = context.newPage();

// Navigate explicitly, similar to entering a URL in the browser.
page.navigate("http://example.com");
// Fill an input.
page.locator("#search").fill("query");

// Navigate implicitly by clicking a link.
page.locator("#submit").click();
// Expect a new url.
System.out.println(page.url());

// 2. MULTIPLE pages
// Create two pages
Page pageOne = context.newPage();
Page pageTwo = context.newPage();

// Get pages of a browser context
List<Page> allPages = context.pages();

// 3.Handling NEW pages
// Get page after a specific action (e.g. clicking a link)
Page newPage = context.waitForPage(() -> {
  page.getByText("open new tab").click(); // Opens a new tab
});
// Interact with the new page normally
newPage.getByRole(AriaRole.BUTTON).click();
System.out.println(newPage.title());
