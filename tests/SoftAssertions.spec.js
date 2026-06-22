const { test, expect } = require("@playwright/test");

/**
 * Hard vs soft assertions (Playwright)
 *
 * Hard assertion — `expect(...)`:
 *   Stops the current test on the first failure. Later lines in that test do not run.
 *   Use when the rest of the test only makes sense if the check passed (e.g. click only if element exists).
 *
 * Soft assertion — `expect.soft(...)`:
 *   Does not stop the test immediately. Playwright runs the rest of the test, collects all soft failures,
 *   and fails the test at the end if any soft assertion failed. You see every failed check in one run.
 *   Use when you want a full “report” of multiple independent checks on the same page or step.
 *
 * Same matchers work with both `expect` and `expect.soft`; only the behavior on failure differs.
 *
 * Each `test(...)` title below describes which soft matcher variants it demonstrates (only the main suite uses test.describe).
 */

test.describe("SoftAssertions", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demo.nopcommerce.com/register?returnUrl=%2F/");
    });

    test("Page object — expect.soft(page): toHaveURL (string or RegExp), toHaveTitle (string or RegExp)", async ({ page }) => {
        await expect.soft(page).toHaveURL(/register/);
        await expect.soft(page).toHaveURL("https://demo.nopcommerce.com/register?returnUrl=%2F/");
        await expect.soft(page).toHaveTitle(/nopCommerce demo store/i);
    });

    test("Locator visibility & presence — toBeVisible, toBeAttached, toBeInViewport, toBeHidden", async ({ page }) => {
        const logo = page.locator(".header-logo");
        await expect.soft(logo).toBeVisible();
        await expect.soft(logo).toBeAttached();
        await expect.soft(logo).toBeInViewport();
        const hiddenField = page.locator('form input[type="hidden"]').first();
        await expect.soft(hiddenField).toBeHidden();
    });

    test("Interaction state — toBeEnabled, toBeEditable, toBeEmpty, toBeFocused", async ({ page }) => {
        const search = page.locator("#small-searchterms");
        const email = page.locator("#Email");
        await expect.soft(search).toBeEnabled();
        await expect.soft(email).toBeEditable();
        await expect.soft(email).toBeEmpty();
        await expect.soft(email).not.toBeFocused();
        await email.focus();
        await expect.soft(email).toBeFocused();
    });

    test("Checked state — toBeChecked; not.toBeChecked (negated soft assertion)", async ({ page }) => {
        const male = page.locator("#gender-male");
        const newsletter = page.locator("#newsletter");
        await expect.soft(male).not.toBeChecked();
        await expect.soft(newsletter).toBeChecked();
    });

    test("Text — toHaveText (exact or options), toContainText (substring or RegExp)", async ({ page }) => {
        const heading = page.locator(".page-title h1");
        await expect.soft(heading).toHaveText("Register");
        await expect.soft(heading).toContainText("Reg");
        await expect.soft(heading).toContainText(/reg/i);
    });

    test("Attributes, identity, styling — toHaveAttribute, toHaveId, toHaveClass, toHaveCSS, toHaveRole", async ({ page }) => {
        const registerBtn = page.locator("#register-button");
        await expect.soft(registerBtn).toHaveAttribute("type", "submit");
        await expect.soft(registerBtn).toHaveId("register-button");
        await expect.soft(registerBtn).toHaveClass(/button-/);
        await expect.soft(registerBtn).toHaveCSS("display", "inline-block");
        await expect.soft(registerBtn).toHaveRole("button");
    });

    test("Accessibility — toHaveAccessibleName (toHaveAccessibleDescription when exposed)", async ({ page }) => {
        const registerBtn = page.locator("#register-button");
        await expect.soft(registerBtn).toHaveAccessibleName(/register/i);
    });

    test("Values — toHaveValue (toHaveValues for multi-select uses the same expect.soft pattern)", async ({ page }) => {
        const email = page.locator("#Email");
        await email.fill("soft@test.com");
        await expect.soft(email).toHaveValue("soft@test.com");
    });

    test("Count & lists — toHaveCount", async ({ page }) => {
        const months = page.locator('select[name="DateOfBirthDayMounth"] option');
        await expect.soft(months).toHaveCount(12);
    });

    test("JavaScript property — toHaveJSProperty(name, value)", async ({ page }) => {
        const email = page.locator("#Email");
        await expect.soft(email).toHaveJSProperty("tagName", "INPUT");
    });

    test("Negation — .not with any matcher (e.g. not.toHaveText, not.toBeChecked)", async ({ page }) => {
        await expect.soft(page.locator(".page-title h1")).not.toHaveText("Login");
        await expect.soft(page.locator("#gender-female")).not.toBeChecked();
    });

    test.skip("Optional: toHaveScreenshot / toMatchAriaSnapshot with expect.soft — enable when baselines exist", async ({ page }) => {
        await expect.soft(page).toHaveScreenshot({ maxDiffPixels: 50 });
    });
});
