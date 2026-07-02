page = await context.new_page()

# Navigate explicitly, similar to entering a URL in the browser.
await page.goto('http://example.com')
# Fill an input.
await page.locator('#search').fill('query')

# Navigate implicitly by clicking a link.
await page.locator('#submit').click()
# Expect a new url.
print(page.url)

# 2. MULTIPLE pages
# create two pages
page_one = await context.new_page()
page_two = await context.new_page()

# get pages of a browser context
all_pages = context.pages

# 3.Handling NEW pages
# Get page after a specific action (e.g. clicking a link)
async with context.expect_page() as new_page_info:
    await page.get_by_text("open new tab").click() # Opens a new tab
new_page = await new_page_info.value

# Interact with the new page normally
await new_page.get_by_role("button").click()
print(await new_page.title())
