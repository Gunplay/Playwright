
const { test, expect } = require("@playwright/test");

test.describe("1 Loggin to account", () => {
    // BootstrapDropdown.spec.js
    
    // 3 select options from dropdown
    test('3 select options from dropdown ', async ({page}) =>  {
// await page.locator('ul>li label').filter({ hasText: /Angular|Java/ }).click();
        const options = await page.$$('ul>li label')
        for(let option of options)
        {
            const value = await option.textContent();
            //console.log("value is", value)
            if(value.includes('Angular') || value.includes('Java'))
            {
                await option.click()
            }
        }
        
        await page.waitForTimeout(5000);
    })
   
  });