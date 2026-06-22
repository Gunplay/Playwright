const { test, expect } = require("@playwright/test");

test.describe("Hidden options dropdown", () => {
  test("should select an option from the PIM hidden dropdown", async ({
    page,
  }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    await page.locator("[name='username']").fill("Admin");
    await page.locator("[name='password']").fill("admin123");
    await page.locator("[type='submit']").click();

    await page.locator("//span[normalize-space()='PIM']").click();

    const DropDownJobTitle = await page.locator(
      "div:nth-child(6) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)",
    );

    await DropDownJobTitle.click();

    await page.waitForTimeout(3000);

    const options = await page.$$("//div[@role='listbox']//span");

    // for (let i = 0; i < options.length; i++) {
    //   console.log(options[i]);

    //   const option = await options[i].textContent();
    //   console.log(option);
    // }

    let selectedJobTitle = "";

    for (let option of options) {
      const textJobTitle = await option.textContent();
      console.log(textJobTitle);
      if (textJobTitle && textJobTitle.includes("Software Engineer")) {
        selectedJobTitle = textJobTitle.trim();
        await option.click();
        break;
      }
    }

    expect(selectedJobTitle).not.toBe("");
    expect(selectedJobTitle).toContain("Software Engineer");
  });
});
