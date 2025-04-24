import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch();
      BrowserContext context = browser.newContext();
      Page page = context.newPage();
      page.navigate("https://example.com");
      page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("screenshot.png")));

      // TODO: Check if it's right placed
      page.onLoad(p -> System.out.println("Page loaded!"));

      // 3. .removeListener
      // TODO: Check if it's right placed
      Consumer<Request> logRequest = interceptedRequest -> {
        System.out.println("A request was made: " + interceptedRequest.url());
      };
      page.onRequest(logRequest);
      // Sometime later...
      page.offRequest(logRequest);

      browser.close();
    }
  }
}
