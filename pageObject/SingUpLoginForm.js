class SingUpForm {
  constructor(page) {
    this.page = page;
    // Button open form
    this.ButtonOpenSingUpLink = page.locator("#signin2");

    // Fill fields SINGUP
    this.SignUsernameInput = page.locator("#sign-username");
    this.SignPasswordInput = page.locator("#sign-password");

    // Locator if modal sign up form is open
    this.modalSignUpForm = page.locator("div[id='signInModal'] div[class='modal-header']");

    // Button for IN
    this.ButtonForSignUp = page.locator("button[onclick='register()']");
  }

  async navigate() {
    return await this.page.goto("https://www.demoblaze.com");
  }

  async openSignUpForm() {
    await this.ButtonOpenSingUpLink.click();
    // await this.modalSignUpForm.waitFor({ state: "visible" });
  }

  async fillCredentialsAndSingUp(username, password) {
    await this.SignUsernameInput.fill(username);
    await this.SignPasswordInput.fill(password);
    await this.ButtonForSignUp.click();
  }
}

module.exports = { SingUpForm };
