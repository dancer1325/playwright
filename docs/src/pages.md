---
id: pages
title: "Pages"
---

## Pages

* Page
  * == 1! tab OR popup window | browser context
  * uses
    * navigate -- to -- URLs
    * interact -- with the -- page content

## Multiple pages

* there can be >1 pages / EACH [BrowserContext]
  * if you want to use ANY page -> you do NOT need to bring the page | front
  * pages | browser context, respect
    * context-level emulation (_Example:_ viewport sizes)
    * custom network routes
    * browser locale

## Handling NEW pages

* browser contexts's `page` event
  * uses
    * get NEW pages / are created | context
      * _Example:_ handle NEW pages / opened -- by -- `target="_blank"` links
      * if the action / triggers the NEW page is UNKNOWN -> use the pattern: `context.on` | `page.waitForLoadState()`

TODO: add | respective examples
If the action that triggers the new page is unknown, the following pattern can be used.

```js
// Get all new pages (including popups) in the context
context.on('page', async page => {
  await page.waitForLoadState();
  console.log(await page.title());
});
```

```java
// Get all new pages (including popups) in the context
context.onPage(page -> {
  page.waitForLoadState();
  System.out.println(page.title());
});
```

```python async
# Get all new pages (including popups) in the context
async def handle_page(page):
    await page.wait_for_load_state()
    print(await page.title())

context.on("page", handle_page)
```

```python sync
# Get all new pages (including popups) in the context
def handle_page(page):
    page.wait_for_load_state()
    print(page.title())

context.on("page", handle_page)
```

```csharp
// Get all new pages (including popups) in the context
context.Page += async  (_, page) => {
    await page.WaitForLoadStateAsync();
    Console.WriteLine(await page.TitleAsync());
};
```

## Handling popups

If the page opens a pop-up (e.g. pages opened by `target="_blank"` links),
you can get a reference to it by listening to the `popup` event on the page.

This event is emitted in addition to the `browserContext.on('page')` event,
but only for popups relevant to this page.

```js
// Start waiting for popup before clicking. Note no await.
const popupPromise = page.waitForEvent('popup');
await page.getByText('open the popup').click();
const popup = await popupPromise;
// Interact with the new popup normally.
await popup.getByRole('button').click();
console.log(await popup.title());
```

```java
// Get popup after a specific action (e.g., click)
Page popup = page.waitForPopup(() -> {
  page.getByText("open the popup").click();
});
// Interact with the popup normally
popup.getByRole(AriaRole.BUTTON).click();
System.out.println(popup.title());
```

```python async
# Get popup after a specific action (e.g., click)
async with page.expect_popup() as popup_info:
    await page.get_by_text("open the popup").click()
popup = await popup_info.value

# Interact with the popup normally
await popup.get_by_role("button").click()
print(await popup.title())
```

```python sync
# Get popup after a specific action (e.g., click)
with page.expect_popup() as popup_info:
    page.get_by_text("open the popup").click()
popup = popup_info.value

# Interact with the popup normally
popup.get_by_role("button").click()
print(popup.title())
```

```csharp
// Get popup after a specific action (e.g., click)
var popup = await page.RunAndWaitForPopupAsync(async () =>
{
    await page.GetByText("open the popup").ClickAsync();
});
// Interact with the popup normally
await popup.GetByRole(AriaRole.Button).ClickAsync();
Console.WriteLine(await popup.TitleAsync());
```

If the action that triggers the popup is unknown, the following pattern can be used.

```js
// Get all popups when they open
page.on('popup', async popup => {
  await popup.waitForLoadState();
  console.log(await popup.title());
});
```

```java
// Get all popups when they open
page.onPopup(popup -> {
  popup.waitForLoadState();
  System.out.println(popup.title());
});
```

```python async
# Get all popups when they open
async def handle_popup(popup):
    await popup.wait_for_load_state()
    print(await popup.title())

page.on("popup", handle_popup)
```

```python sync
# Get all popups when they open
def handle_popup(popup):
    popup.wait_for_load_state()
    print(popup.title())

page.on("popup", handle_popup)
```

```csharp
// Get all popups when they open
page.Popup += async  (_, popup) => {
    await popup.WaitForLoadStateAsync();
    Console.WriteLine(await page.TitleAsync());
};
```
