---
id: extensibility
title: "Extensibility"
---
## Custom selector engines

* requirements
  * register the selector engines
    * -- via -- [`method: Selectors.register`] /
      * 's properties
        * `query` function
          * query FIRST element / match `selector` -- relative to the -- `root`
        * `queryAll` function
          * query ALL elements / match `selector` -- relative to the -- `root`
    * BEFORE creating the page

* selector engine,
  * by default, run DIRECTLY | the frame's JavaScript context
    * -> can call an application-defined function
    * if you want to isolate the engine -- from -- any frame's JavaScript & leave access to the DOM -> register the engine -- via -- `{contentScript: true}` option
  * run == content scripts run
    * ❌if you use selector engine + custom engines -> NOT guaranteed❌

* Content script engine
  * vs selector engine
    * safer
      * Reason:🧠protected -- from -- ANY tampering with the global objects🧠
        * _Example:_ alter `Node.prototype` methods


TODO:

An example of registering selector engine that queries elements based on a tag name:


```java
// Must be a script that evaluates to a selector engine instance.  The script is evaluated in the page context.
String createTagNameEngine = "{\n" +
  "  // Returns the first element matching given selector in the root's subtree.\n" +
  "  query(root, selector) {\n" +
  "    return root.querySelector(selector);\n" +
  "  },\n" +
  "\n" +
  "  // Returns all elements matching given selector in the root's subtree.\n" +
  "  queryAll(root, selector) {\n" +
  "    return Array.from(root.querySelectorAll(selector));\n" +
  "  }\n" +
  "}";

// Register the engine. Selectors will be prefixed with "tag=".
playwright.selectors().register("tag", createTagNameEngine);

// Now we can use "tag=" selectors.
Locator button = page.locator("tag=button");
button.click();

// We can combine it with built-in locators.
page.locator("tag=div").getByText("Click me").click();

// We can use it in any methods supporting selectors.
int buttonCount = (int) page.locator("tag=button").count();
```

```python async
tag_selector = """
    // Must evaluate to a selector engine instance.
    {
      // Returns the first element matching given selector in the root's subtree.
      query(root, selector) {
        return root.querySelector(selector);
      },

      // Returns all elements matching given selector in the root's subtree.
      queryAll(root, selector) {
        return Array.from(root.querySelectorAll(selector));
      }
    }"""

# register the engine. selectors will be prefixed with "tag=".
await playwright.selectors.register("tag", tag_selector)

# now we can use "tag=" selectors.
button = page.locator("tag=button")
await button.click()

# we can combine it with built-in locators.
await page.locator("tag=div").get_by_text("click me").click()

# we can use it in any methods supporting selectors.
button_count = await page.locator("tag=button").count()
```

```python sync
tag_selector = """
    // Must evaluate to a selector engine instance.
    {
      // Returns the first element matching given selector in the root's subtree.
      query(root, selector) {
        return root.querySelector(selector);
      },

      // Returns all elements matching given selector in the root's subtree.
      queryAll(root, selector) {
        return Array.from(root.querySelectorAll(selector));
      }
    }"""

# register the engine. selectors will be prefixed with "tag=".
playwright.selectors.register("tag", tag_selector)

# now we can use "tag=" selectors.
button = page.locator("tag=button")
button.click()

# we can combine it with built-in locators.
page.locator("tag=div").get_by_text("click me").click()

# we can use it in any methods supporting selectors.
button_count = page.locator("tag=button").count()
```

```csharp
// Register the engine. Selectors will be prefixed with "tag=".
// The script is evaluated in the page context.
await playwright.Selectors.Register("tag", new() {
  Script = @"
  // Must evaluate to a selector engine instance.
  {
    // Returns the first element matching given selector in the root's subtree.
    query(root, selector) {
      return root.querySelector(selector);
    },

    // Returns all elements matching given selector in the root's subtree.
    queryAll(root, selector) {
      return Array.from(root.querySelectorAll(selector));
    }
  }"
});

// Now we can use "tag=" selectors.
await page.Locator("tag=button").ClickAsync();

// We can combine it with built-in locators.
await page.Locator("tag=div").GetByText("Click me").ClickAsync();
```
