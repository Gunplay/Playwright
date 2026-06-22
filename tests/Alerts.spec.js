const { test, expect } = require("@playwright/test");

test.skip("Alert with OK", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Handle the alert dialog and validate its contents.
  page.on("dialog", async (dialog) => {
    await expect(dialog.type()).toContain("alert");
    await expect(dialog.message()).toContain("I am an alert box!");
    await dialog.accept();
  });

  await page.click('//button[normalize-space()="Alert"]');
});

test("Confrimation Dialod-Aler", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const dialogHandled = page.waitForEvent("dialog").then(async (dialog) => {
    await expect(dialog.type()).toContain("confirm");
    await expect(dialog.message()).toContain("Press a button!");
    await dialog.dismiss();
  });

  await page.locator("#confirmBtn").click();
  await dialogHandled;

  await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
});

test("Prompt Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //Enabling dialog window handler
  page.on("dialog", async (dialog) => {
    await expect(dialog.type()).toContain("prompt");
    await expect(dialog.message()).toContain("Please enter your name:");
    await expect(dialog.defaultValue()).toContain("Harry Potter");
    await dialog.accept("John");
  });

  await page.click("#promptBtn");
  await expect(page.locator('//p[@id="demo"]')).toHaveText(
    "Hello John! How are you today?",
  );

  await page.waitForTimeout(5000);
});
