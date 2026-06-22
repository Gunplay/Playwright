const { test, expect } = require("@playwright/test");
const { SingUpForm } = require("../pageObject/SingUpLoginForm");


test.describe("1 SingUp to account", () => {
  let SignUpForm;
  let resSignUpForm;
  test.beforeEach(async ({ page }) => {
    SignUpForm = new SingUpForm(page);
    resSignUpForm = await SignUpForm.navigate();
  
  });

  test("1.1 Open page demoblaze.com, status must be 200", async ({ page }) => {
    // await SignUpForm.openSignUpForm();
    // await expect(SignUpForm.modalSignUpForm).toBeVisible();
    expect(resSignUpForm?.status()).toBe(200);  
  });

  test("1.2 Page should have title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("STORE");
  });

  test("1.3 Should be properly page URL", async ({ page }) => {
    const pageUrl = page.url();
    expect(pageUrl).toBe("https://www.demoblaze.com/");
  });

  test("1.4 Should open Sign up form", async ({ page }) => {
    await SignUpForm.openSignUpForm();
    await expect(SignUpForm.modalSignUpForm).toBeVisible();
  });

  // test("1.5 Should fill credentials and sign up", async ({ page }) => {
  //   await SignUpForm.openSignUpForm();
  //   await SignUpForm.fillCredentialsAndSingUp("1234rffr", "1234rffr");
  //   await expect(SignUpForm.modalSignUpForm).toBeVisible();
  // });

  test("1.5 After sign up, backend receives correct credentials", async ({ page }) => {
    await SignUpForm.openSignUpForm();

    const username = "1234rffra";
    const password = "1234rffra";

    const [signupResponse, dialog] = await Promise.all([
      page.waitForResponse((res) =>
        res.url().includes("signup") && res.request().method() === "POST",
      ),
      (async () => {
        const dialogPromise = page.waitForEvent("dialog");
        await SignUpForm.fillCredentialsAndSingUp(username, password);
        return dialogPromise;
      })(),
    ]);

    // Check HTTP status
    expect(signupResponse.status()).toBe(200);

    // Check request payload contains the same username/password
    const requestPostData = signupResponse.request().postDataJSON();
    expect(requestPostData).toMatchObject({ username, password });

    // Check success dialog text
    expect(dialog.message()).toContain("Sign up successful.");
    await dialog.accept();
  });
  
});
