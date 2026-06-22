const { test, expect } = require("@playwright/test");

test.describe("Assertions", () => {
    let page;
    test.beforeEach(async ({ page }) => {
        page = await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2F/");
    });

    test("1.1 Should be properly page URL", async ({ page }) => { 
        expect(page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F/');
    })

    test("1.2 Must visible logo", async ({page}) => {
        const logo = page.locator(".header-logo");
        await expect(logo).toBeVisible();
    })
   
    test("1.3 Must be Available serchInput", async ({page}) => {
        const searchInput = page.locator("#small-searchterms");
        await expect(searchInput).toBeEnabled();    
    })
// radio button
    test("1.4 Shoud be checked Gender Male", async ({page}) => {
        const idleGenderMale = await page.locator("#gender-male");
    await expect(idleGenderMale).not.toBeChecked();
    const isChekedGenderMale = await idleGenderMale.click();  
        await expect(isChekedGenderMale).toBeChecked();
    })
// checkBox
    test("1.5 Shoud be checked NewsLetter", async ({page}) => {
        const NewsLetterCheckBox = await page.locator("#newsletter");
    await expect(NewsLetterCheckBox).toBeChecked();
    })
   // expect(locator).toHaveAttribute()	Element has attribute
   test("1.6 Shoud be have attribute type=checkbox", async ({page}) => {
   
    const buttonRegisterAttribute = await page.locator("#register-button");
    await expect(buttonRegisterAttribute).toHaveAttribute("type", "submit");
    await expect(buttonRegisterAttribute).toHaveText("Register");
    })

    

    test("1.7 Shoud be have text Register", async ({page}) => {
        // expect(locator).toHaveText()	Element matches text
        await expect(await page.locator('.page-title h1')).toHaveText("Register"); // full text

        // expect(locator).toContaintext()	Element matches text
   
        await expect(await page.locator('.page-title h1')).toContainText("Register"); // partial text    
    })

    // expect(locator).toHaveValue()	Element has value
    test("1.8 Should be text inside email input", async ({page}) => {
    const emailInput = await page.locator("#mail");
    await emailInput.fill("test@test.com");
    await expect(emailInput).toHaveValue("test@test.com");
    })

    // expect = await page.locator('select[name="DateOfBirthDayMounth"] option:nth-child(1)')
    // Lost of elements has given length
    test("1.9 Should be count calendar of month", async ({page}) => {
        const calendarOfMonth = await page.locator('select[name="DateOfBirthDayMounth"] option');
        await expect(calendarOfMonth).toHaveCount(12);
    })

    // expect(locator).not.toHaveURL()	Element does not have URL

    // expect(locator).not.toHaveCount()	Element does not have count
 })