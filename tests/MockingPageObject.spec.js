const { test, expect } = require("@playwright/test");
const { MockUserCardPage } = require("../pageObject/MockUserCardPage");

test("Мокання API у стилі Page Object", async ({ page }) => {
  // КРОК 1.
  // Створюємо екземпляр page object.
  // Він сховає всередині локатори та дії зі сторінкою.
  const userCardPage = new MockUserCardPage(page);

  // КРОК 2.
  // Готуємо фейкову відповідь сервера.
  const mockedUser = {
    name: "Danil",
    role: "Automation QA",
    city: "Kyiv",
  };

  // КРОК 3.
  // Перехоплюємо запит і повертаємо свої дані.
  await page.route("**/api/user", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedUser),
    });
  });

  // КРОК 4.
  // Відкриваємо навчальну сторінку через page object.
  await userCardPage.openDemoPage();

  // КРОК 5.
  // Перевіряємо стартовий стан.
  await expect(userCardPage.result).toHaveText("No user loaded");

  // КРОК 6.
  // Виконуємо дію користувача теж через page object.
  await userCardPage.clickLoadUser();

  // КРОК 7.
  // Перевіряємо кінцевий результат.
  await expect(userCardPage.result).toHaveText(
    `${mockedUser.name} | ${mockedUser.role} | ${mockedUser.city}`
  );
});
