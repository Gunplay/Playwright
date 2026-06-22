const { test, expect } = require("@playwright/test");

test("Приклад мокання API відповіді в Playwright", async ({ page }) => {
  // КРОК 1.
  // Готуємо "фейкові" дані, які буде повертати наш мок.
  // У реальному житті такі дані часто приходять з бекенду.
  const mockedUser = {
    id: 7,
    name: "Danil",
    role: "QA Engineer",
    city: "Kyiv",
  };

  // КРОК 2.
  // Налаштовуємо перехоплення запиту.
  // Коли сторінка звернеться до /api/user, Playwright НЕ пустить запит у справжню мережу,
  // а поверне нашу підготовлену відповідь.
  await page.route("**/api/user", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedUser),
    });
  });

  // КРОК 3.
  // Створюємо просту HTML-сторінку прямо всередині тесту.
  // На цій сторінці є кнопка, яка робить fetch до /api/user,
  // а потім показує дані користувача на екрані.
  await page.setContent(`
    <html>
      <head>
        <base href="http://localhost/">
      </head>
      <body>
        <h1>Mocking demo</h1>
        <button id="load-user">Load user</button>
        <div id="result">No data yet</div>

        <script>
          document.getElementById("load-user").addEventListener("click", async () => {
            const response = await fetch("/api/user");
            const user = await response.json();

            document.getElementById("result").textContent =
              user.name + " | " + user.role + " | " + user.city;
          });
        </script>
      </body>
    </html>
  `);

  // КРОК 4.
  // Перевіряємо стартовий стан до натискання кнопки.
  await expect(page.locator("#result")).toHaveText("No data yet");

  // КРОК 5.
  // Виконуємо дію користувача: натискаємо кнопку.
  // Саме після цього сторінка зробить fetch, який ми вже замокали вище.
  await page.click("#load-user");

  // КРОК 6.
  // Перевіряємо, що замість реального API використались наші мок-дані.
  // Якщо текст з'явився правильний, значить мок спрацював.
  await expect(page.locator("#result")).toHaveText(
    `${mockedUser.name} | ${mockedUser.role} | ${mockedUser.city}`
  );
});

test("Приклад мокання помилки сервера", async ({ page }) => {
  // КРОК 1.
  // Тут ми показуємо інший сценарій:
  // сервер нібито падає і повертає помилку 500.
  await page.route("**/api/user", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    });
  });

  // КРОК 2.
  // Робимо сторінку, яка вміє показувати текст помилки.
  await page.setContent(`
    <html>
      <head>
        <base href="http://localhost/">
      </head>
      <body>
        <button id="load-user">Load user</button>
        <div id="result">Waiting...</div>

        <script>
          document.getElementById("load-user").addEventListener("click", async () => {
            try {
              const response = await fetch("/api/user");

              if (!response.ok) {
                throw new Error("Server error: " + response.status);
              }

              const user = await response.json();
              document.getElementById("result").textContent = user.name;
            } catch (error) {
              document.getElementById("result").textContent = error.message;
            }
          });
        </script>
      </body>
    </html>
  `);

  // КРОК 3.
  // Запускаємо сценарій.
  await page.click("#load-user");

  // КРОК 4.
  // Перевіряємо, що UI правильно обробив помилку.
  await expect(page.locator("#result")).toHaveText("Server error: 500");
});
