const { test } = require("@playwright/test");

test("Mouse hover", async ({ page }) => {
  await page.goto("https://demo.opencart.com/");

  const desktops = page.locator('//a[normalize-space()="Desktops"]');
  const macbook = page.locator('//a[normalize-space()="Mac (1)"]');

  // Mouse hover
  await desktops.hover();
  await macbook.hover();

  await page.waitForTimeout(5000);
});
