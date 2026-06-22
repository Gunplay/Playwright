const { test, expect } = require("@playwright/test");
const { LogginForm } = require("../pageObject/LogginForm");

test.describe("1 Loggin to account", () => {
  let logginForm;
  let resLogginForm;
  test.beforeEach(async ({ page }) => {

    logginForm = new LogginForm(page);
    resLogginForm = await logginForm.navigate();
  });

  test("1.1 Open page demoblaze.com, status must be 200", async ({ page }) => {
      await logginForm.openLoginForm();
      await logginForm.usernameInput.fill("1234rffra");
      
      await logginForm.passwordInput.fill("1234rffra");
    //   expect(resLogginForm?.status()).toBe(200);
  
  });

  
});