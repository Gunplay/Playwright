const { test, expect } = require("@playwright/test");

test("handle inputbox", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2Fcart");

    const firstName = page.locator("//input[@id='FirstName']");
    const lastName = page.locator("//input[@id='LastName']");

    await expect(firstName).toBeVisible();
    await expect.soft(firstName).toBeEmpty();
    await expect(firstName).toBeEditable();
    await expect(firstName).toBeEnabled();

    await firstName.fill("John");
    await lastName.fill("Pitterson");

    await expect(firstName).toHaveValue("John");
    await expect(lastName).toHaveValue("Pitterson");

    await page.waitForTimeout(5000); // pausing code 
});
