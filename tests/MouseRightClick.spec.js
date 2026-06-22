const { test, expect } = require("@playwright/test");

test("Mouse Right Click", async ({ page }) => {
  await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");

  const button = page.locator('//span[normalize-space()="right click me"]');

  // Right click action
  await button.click({ button: "right" });

  await expect(page.locator(".context-menu-list")).toBeVisible();
  await page.waitForTimeout(5000);
});
