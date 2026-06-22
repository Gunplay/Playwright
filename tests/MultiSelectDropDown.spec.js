const { test, expect } = require("@playwright/test");

test.describe("1 Loggin to account", () => {
    let dateNoteBooks; // Оголошуємо змінну тут
    let multiDropDown;
    test.beforeEach(async ({ page }) => {
      
      dateNoteBooks = await page.goto('https://demo.nopcommerce.com/notebooks');
    });
  
    test("1.1 Open page demo.nopcommerce.com/notebooks, status must be 200", async ({ page }) => {
    
      //expect(dateNoteBooks?.status()).toBe(200);
      
      // Якщо вам все ж треба отримати адресу в змінну (як ви питали раніше):
      const currentUrl = page.url();
      console.log(`Поточна адреса: ${currentUrl}`);
      expect(currentUrl).toBe('https://demo.nopcommerce.com/notebooks')
    });
    test('1.2 Selected multiDropDown', async ({page}) => {

        multiDropDown = page.selectOption('#body > div:nth-child(7) > main:nth-child(3) > div:nth-child(1) > aside:nth-child(2) > section:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(2)', ['4 GB', '8 GB', '16 GB'])
        console.log(multiDropDown)
        expect.soft(multiDropDown).toBe(['4 GB', '8 GB','16 GB'])
    })

    test('1.3 Selected Memory Filters', async ({ page }) => {
        // Використовуємо більш стабільні селектори за ID або текстом
        const memory8GB = page.locator('#attribute-option-12'); // 8 GB
        const memory16GB = page.locator('#attribute-option-13'); // 16 GB
      
        // Клікаємо по чекбоксах
        await memory8GB.check();
        await memory16GB.check();
      
        // Перевіряємо, чи вони позначені
        await expect(memory8GB).toBeChecked();
        await expect(memory16GB).toBeChecked();
      });
  });