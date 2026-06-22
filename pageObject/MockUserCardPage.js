class MockUserCardPage {
  constructor(page) {
    this.page = page;

    // Локатор кнопки, яка запускає запит до API.
    this.loadUserButton = page.locator("#load-user");

    // Тут будемо бачити результат завантаження.
    this.result = page.locator("#result");
  }

  async openDemoPage() {
    // Створюємо навчальну сторінку прямо в тесті.
    // base href потрібен, щоб fetch("/api/user") мав коректну абсолютну адресу.
    await this.page.setContent(`
      <html>
        <head>
          <base href="http://localhost/">
        </head>
        <body>
          <h2>User card</h2>
          <button id="load-user">Load user</button>
          <div id="result">No user loaded</div>

          <script>
            document.getElementById("load-user").addEventListener("click", async () => {
              try {
                const response = await fetch("/api/user");

                if (!response.ok) {
                  throw new Error("Server error: " + response.status);
                }

                const user = await response.json();

                document.getElementById("result").textContent =
                  user.name + " | " + user.role + " | " + user.city;
              } catch (error) {
                document.getElementById("result").textContent = error.message;
              }
            });
          </script>
        </body>
      </html>
    `);
  }

  async clickLoadUser() {
    await this.loadUserButton.click();
  }
}

module.exports = { MockUserCardPage };

// Я зробив усі 3 пункти і додав робочі приклади в проєкт. Нові файли:
// Mocking.spec.js,
// MockStubSpy.spec.js,
// MockingPageObject.spec.js,
// MockUserCardPage.js

// Я також прогнав тести: 4 passed, плюс раніше Mocking.spec.js теж проходить.

// 1. page.route() по рядках
// Ось головний фрагмент:

// await page.route("**/api/user", async (route) => {
//   await route.fulfill({
//     status: 200,
//     contentType: "application/json",
//     body: JSON.stringify(mockedUser),
//   });
// });
// Що тут відбувається по кроках:

// await page.route(...)
// Ми кажемо Playwright: "почни слухати запити сторінки".

// "**/api/user"
// Це шаблон URL.
// ** означає "будь-який початок адреси".
// Тобто Playwright перехопить будь-який запит, що закінчується на /api/user.

// async (route) => { ... }
// Це функція, яка спрацює в момент запиту.
// route це спеціальний об’єкт керування цим запитом.

// route.fulfill(...)
// Це означає: "не відправляй запит на справжній сервер, а поверни ось цю відповідь".

// status: 200
// Імітуємо успішну відповідь сервера.

// contentType: "application/json"
// Кажемо браузеру, що повертаємо JSON.

// body: JSON.stringify(mockedUser)
// Перетворюємо JavaScript-об’єкт у JSON-рядок і віддаємо його як відповідь.

// Проста логіка така:

// сторінка хоче зробити fetch;
// Playwright ловить цей запит;
// справжній бекенд не викликається;
// ти сам вирішуєш, що повернути.
// 2. Різниця між mock, stub і spy
// Я виніс це в окремий файл: MockStubSpy.spec.js

// Mock
// Mock зазвичай означає повну підміну залежності або поведінки.

// Приклад:

// сторінка робить запит до /api/product
// ми не пускаємо її до реального сервера
// ми самі віддаємо товар з ціною 99
// Коли використовувати:

// коли хочеш повністю контролювати відповідь API;
// коли реальний сервер нестабільний;
// коли треба перевірити рідкі сценарії.
// Ключова ідея:
// "замість справжньої системи я даю штучну"

// Stub
// Stub це підміна функції так, щоб вона повернула конкретне значення.

// У моєму прикладі:

// є функція getDiscount()
// ми підміняємо її так, щоб вона повертала 25
// потім перевіряємо, що фінальна ціна стала 75
// Коли використовувати:

// коли неважливо, як саме працює функція всередині;
// коли тобі важливо лише, що вона поверне.
// Ключова ідея:
// "цю функцію зараз не тестуємо, просто змусимо її повернути потрібне значення"

// Spy
// Spy це коли ми спостерігаємо за викликом функції:

// чи викликалась;
// скільки разів;
// з якими аргументами.
// У прикладі:

// є функція saveUser(user)
// ми записуємо всі виклики в window.callLog
// після кліку перевіряємо, що функція була викликана 1 раз і отримала правильний об’єкт
// Коли використовувати:

// коли треба перевірити сам факт виклику;
// коли важливі параметри виклику.
// Ключова ідея:
// "мені важливо не тільки що повернулося, а й як саме функцію викликали"

// Коротко різниця:

// mock підміняє цілу поведінку або зовнішню залежність;
// stub повертає підготовлене значення;
// spy стежить за викликами.
// 3. Приклад мокання у стилі Page Object
// Я зробив це у файлах:
// MockingPageObject.spec.js
// і
// MockUserCardPage.js

// Навіщо це корисно:

// тест стає чистішим;
// локатори і дії зібрані в одному місці;
// якщо UI зміниться, правити буде легше.
// Що там відбувається:

// У pageObject ми зберігаємо локатори:
// кнопка Load user, блок result.
// Там же є метод openDemoPage(), який створює навчальну сторінку.
// У тесті ми налаштовуємо page.route() для /api/user.
// Далі викликаємо методи page object.
// Наприкінці перевіряємо, що UI показав саме мок-дані.
// Це вже дуже близько до того, як пишуть реальні автотести в проектах.

// Що раджу тобі запам’ятати

// Якщо треба підмінити бекенд або API, використовуй page.route().
// Якщо треба змусити функцію повертати конкретне значення, це stub.
// Якщо треба перевірити, чи була функція викликана і з чим, це spy.
// Для великих тестів краще переносити локатори та дії в pageObject.
// Запускати приклади можна так:

// npx playwright test tests/Mocking.spec.js
// npx playwright test tests/MockStubSpy.spec.js
// npx playwright test tests/MockingPageObject.spec.js
// Наступним повідомленням я можу ще зробити для тебе суперпросту шпаргалку:

// mock/stub/spy на 1 сторінку,
// або намалювати "схему в голові", як запит проходить через page.route().
