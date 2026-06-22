class LogginForm {
  constructor(page) {
    this.page = page;
    // Button open form

    this.ButtonOpenLogginForm = page.locator("#login2");

    // Fill fields Loggin
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");

    // Locator for open modal
    this.modalLogginIsOpen = page.locator(
      "#div[id='logInModal'] div[role='document']",
    );
    // Button for IN

    this.LogIn = page.locator("button[onclick='logIn()']");
  }

  async navigate() {
    return await this.page.goto("https://www.demoblaze.com");
  }

  async openLoginForm() {
    await this.ButtonOpenLogginForm.click();
    // await this.modalLogginIsOpen.waitFor({ state: "visible" });
  }

  async loggin(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.LogIn.click();
  }
}

module.exports = { LogginForm };
