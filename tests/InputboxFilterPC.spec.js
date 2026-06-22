const { test, expect } = require("@playwright/test");

const arrayOfMemoryCheckboxLocators = [
    "#attribute-option-11",
    "#attribute-option-12",
    "#attribute-option-13",
];

test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/notebooks");

    const memoryFilter = page.locator("//ul[2]//li[1]");
    await expect(memoryFilter).toBeVisible();
    await expect(memoryFilter).toContainText("Memory");
});

test("check memory filter checkboxes", async ({ page }) => {
    for (let i = 0; i < arrayOfMemoryCheckboxLocators.length; i++) {
        await page.locator(arrayOfMemoryCheckboxLocators[i]).check();
    }
});

test("uncheck memory filter checkboxes", async ({ page }) => {
    for (let i = 0; i < arrayOfMemoryCheckboxLocators.length; i++) {
        await page.locator(arrayOfMemoryCheckboxLocators[i]).check();
        
    }

    for (let i = 0; i < arrayOfMemoryCheckboxLocators.length; i++) {
        const loc = page.locator(arrayOfMemoryCheckboxLocators[i]);
        if (await loc.isChecked()) {
            await loc.uncheck();
        }
    }
});
