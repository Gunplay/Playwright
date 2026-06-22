const { test, expect } = require("@playwright/test");

test("handle dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Multiple ways to select option from the dropdown
     await page.locator("#country").selectOption({ label: "Germany" }); // label / visible text
    // await page.locator("#country").selectOption("India"); // visible text
    // await page.locator("#country").selectOption({ value: "uk" }); // by using value
    // await page.locator("#country").selectOption({ index: 1 }); // by using index

   // await page.selectOption("#country", "India"); // by text

    // Assertions
    // 1) check number of options in dropdown -Approach1
    // const options = await page.locator("#country option");
    //await expect(options).toHaveCount(10);

    // 2)  Check number of option in dropdown - Approach2
    const options = await page.$$('#country option')
    await expect(options.length).toBe(10);
    console.log('Number of options', options.length)

    // 3 Check presence of value in the dropdown - Approach3
    const content = await page.locator('#country').textContent() // return all content in locator

    await expect(content).toContain("Germany");
    await expect(content).not.toContain("Ukraine");

    

    // 4 Check presence of value in the dropdown  - Approach 2- using looping
    const AllOptions = await page.$$('#country option')

    // `AllOptions` is an array of <option> element handles from the dropdown.
    // `.entries()` gives [index, element] pairs, so:
    // - `i` is the option index (0, 1, 2, ...)
    // - `option` is the element handle for that <option>
    // `textContent()` reads the visible text inside the <option> (async, so we `await` it).
   

    let status = false;
    for (const [i, option] of AllOptions.entries()) {

        const text = ((await option.textContent()) || "").trim();

        // Ternary style: if text includes 'France' set status=true, else status stays false
        text.includes("France") ? (status = true) : (status = false);

        if (status) {
            console.log(i, text);
            break;
        }
        console.log(i, text);
    }

    await expect(status).toBeTruthy();

    await page.waitForTimeout(5000); // pausing code
});

