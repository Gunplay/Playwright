const { test, expect } = require("@playwright/test");

test.describe("Різниця між mock, stub і spy", () => {
  test("MOCK: повністю підміняємо API-відповідь", async ({ page }) => {
    // MOCK:
    // Ми не звертаємося до реального сервера взагалі.
    // Замість сервера самі вирішуємо, що повернути.
    await page.route("**/api/product", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          title: "Playwright Course",
          price: 99,
        }),
      });
    });

    await page.setContent(`
      <html>
        <head>
          <base href="http://localhost/">
        </head>
        <body>
          <button id="load-product">Load product</button>
          <div id="result">Empty</div>

          <script>
            document.getElementById("load-product").addEventListener("click", async () => {
              const response = await fetch("/api/product");
              const product = await response.json();
              document.getElementById("result").textContent =
                product.title + " costs " + product.price;
            });
          </script>
        </body>
      </html>
    `);

    await page.click("#load-product");
    await expect(page.locator("#result")).toHaveText("Playwright Course costs 99");
  });

  test("STUB: примушуємо функцію повернути конкретне значення", async ({ page }) => {
    // STUB:
    // Ми не стежимо за тим, скільки разів викликалась функція.
    // Наша ціль тут інша: сказати функції, що саме вона має повернути.
    await page.setContent(`
      <html>
        <body>
          <div id="result">Waiting...</div>

          <script>
            window.getDiscount = () => 0;

            function calculateFinalPrice(price) {
              return price - window.getDiscount();
            }

            document.getElementById("result").textContent = calculateFinalPrice(100);
          </script>
        </body>
      </html>
    `);

    // Підміняємо функцію до того, як сторінка перерахує значення ще раз.
    await page.evaluate(() => {
      window.getDiscount = () => 25;
      document.getElementById("result").textContent = 100 - window.getDiscount();
    });

    await expect(page.locator("#result")).toHaveText("75");
  });

  test("SPY: дивимось, чи функція була викликана і з якими даними", async ({ page }) => {
    // SPY:
    // Ми не лише підміняємо поведінку, а ще й збираємо інформацію про виклики.
    // Для наочності створюємо масив callLog і записуємо туди всі аргументи.
    await page.setContent(`
      <html>
        <body>
          <button id="save">Save</button>
          <div id="status">Not saved</div>

          <script>
            window.callLog = [];

            window.saveUser = (user) => {
              window.callLog.push(user);
              return "saved";
            };

            document.getElementById("save").addEventListener("click", () => {
              const result = window.saveUser({
                id: 10,
                name: "Danil",
              });

              document.getElementById("status").textContent = result;
            });
          </script>
        </body>
      </html>
    `);

    await page.click("#save");

    // Перевіряємо результат дії.
    await expect(page.locator("#status")).toHaveText("saved");

    // А тепер головна частина spy:
    // ми дивимося, чи була функція викликана і що саме в неї передали.
    const callLog = await page.evaluate(() => window.callLog);

    expect(callLog).toHaveLength(1);
    expect(callLog[0]).toEqual({
      id: 10,
      name: "Danil",
    });
  });
});
