const { test, expect } = require("@playwright/test");

test("handle radio button", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2Fcart");

    // Radio button — male (option2)
    await page.locator("#gender-male").check();
 

     await expect.soft(await page.locator("#gender-males")).toBeChecked();
     //await expect(await page.locator("//input[@value='option2']").isChecked()).toBeTruthy(); // male

     await expect(await page.locator("#gender-female").isChecked()).toBeFalsy(); // female

     //await page.waitForTimeout(5000); // pausing code
});
