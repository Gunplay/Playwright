class LinksOfDemoBlaze {
      constructor(page) {
        this.page = page;
        this.baseURL = process.env.BASE_URL || 'https://www.demoblaze.com/index.html';
    }

    async openDemoBlaze() {
        await this.page.goto(this.baseURL);
    await this.page.waitForLoadState('domcontentloaded');
    }

async getAllLinksOfDemoBlaze() {
    // Отримуємо тільки посилання з назвами товарів
   const products = await this.page.locator("//a[normalize-space()='Samsung galaxy s6").all();
    // const products = await this.page.waitForSelectorAll("//a[normalize-space()='Samsung galaxy s6']");
     console.log(products);
        // for (const product of products) {
        //     const productName = await product.textContent();
        //     console.log(productName);
        // }
        
        // return products;
    }


    // async getLinksCount() {
    //     return await this.page.locator('a').count();
    // }

    
    // // 🎯 Селектори як геттери
    // get myAccountMenu() {
    //     return this.page.locator('[data-testid="my-account-menu"]')
    //         .or(this.page.getByRole('button', { name: 'My Account' }));
    // }

    // get signInButton() {
    //     return this.page.locator('[data-testid="sign-in-button"]')
    //         .or(this.page.getByRole('button', { name: /sign in/i }));
    // }

    // get emailOrPhoneInput() {
    //     return this.page.locator('[data-testid="email-or-phone-input"]')
    //         .or(this.page.getByPlaceholder(/email or phone/i))
    //         .or(this.page.locator('input[type="text"]').first());
    // }

    // get passwordInput() {
    //     return this.page.locator('[data-testid="password-input"]')
    //         .or(this.page.getByPlaceholder(/password/i));
    // }

    // get submitButton() {
    //     return this.page.locator('[data-testid="submit-login"]')
    //         .or(this.page.getByRole('button', { name: /continue|submit/i }));
    // }

    // get errorMessage() {
    //     return this.page.locator('[data-testid="error-message"]')
    //         .or(this.page.locator('.error-message, .alert-error'));
    // }

    // get userAvatar() {
    //     return this.page.locator('[data-testid="user-avatar"]')
    //         .or(this.page.locator('.user-avatar'));
    // }

    // // 🚀 Базові дії
    // async open() {
    //     await this.page.goto(this.baseURL, {
    //         waitUntil: 'domcontentloaded', // швидше ніж networkidle
    //         timeout: 30000,
    //     });
    //     // Чекаємо поки головні елементи завантажаться
    //     await this.myAccountMenu.waitFor({ state: 'visible', timeout: 10000 });
    // }

    // async clickMyAccount() {
    //     await this.myAccountMenu.waitFor({ state: 'visible' });
    //     await this.myAccountMenu.click();
    // }

    // async clickSignIn() {
    //     await this.signInButton.waitFor({ state: 'visible' });
    //     await this.signInButton.click();
    // }

    // async fillEmailOrPhone(value) {
    //     await this.emailOrPhoneInput.waitFor({ state: 'visible' });
    //     await this.emailOrPhoneInput.fill(value);
    // }

    // async fillPassword(value) {
    //     await this.passwordInput.waitFor({ state: 'visible' });
    //     await this.passwordInput.fill(value);
    // }

    // async submitLogin() {
    //     await this.submitButton.click();
    // }

    // // 🎭 Комплексні сценарії
    // async startSignIn(email) {
    //     await this.clickMyAccount();
    //     await this.clickSignIn();
    //     await this.fillEmailOrPhone(email);
    // }

    // async login(email, password) {
    //     await this.clickMyAccount();
    //     await this.clickSignIn();
    //     await this.fillEmailOrPhone(email);
    //     await this.fillPassword(password);
    //     await this.submitLogin();
    //     // Чекаємо на успішний логін
    //     await this.userAvatar.waitFor({ state: 'visible', timeout: 10000 });
    // }

    // // ✅ Перевірки (assertions можна винести, але іноді корисно мати тут)
    // async isLoggedIn() {
    //     return await this.userAvatar.isVisible();
    // }

    // async getErrorMessage() {
    //     await this.errorMessage.waitFor({ state: 'visible' });
    //     return await this.errorMessage.textContent();
    // }

    // async hasError() {
    //     try {
    //         await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
    //         return true;
    //     } catch {
    //         return false;
    //     }
    // }
}

module.exports = LinksOfDemoBlaze;