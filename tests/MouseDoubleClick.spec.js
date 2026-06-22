const { test, expect } = require("@playwright/test");

test("Mouse Double Click", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const btnCopy = page.locator('//button[normalize-space()="Copy Text"]');

  // Double click
  await btnCopy.dblclick();

  const f2 = page.locator("#field2");

  await expect(f2).toHaveValue("Hello World!");
  await page.waitForTimeout(5000);
});
