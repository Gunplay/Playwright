const { test, expect } = require("@playwright/test");

test("Mock API simple example", async ({ page }) => {
  // Step 1.
  // Create fake data that we want to receive from the API.
  const mockedUser = {
    name: "Danil",
    job: "QA Engineer",
    city: "Kyiv",
  };

  // Step 2.
  // Intercept the request to /api/user
  // and return our fake response instead of a real server response.
  await page.route("**/api/user", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedUser),
    });
  });

  // Step 3.
  // Open a small demo page directly inside the test.
  await page.setContent(`
    <html>
      <head>
        <base href="http://localhost/">
      </head>
      <body>
        <button id="load-user">Load user</button>
        <div id="result">No data yet</div>

        <script>
          document.getElementById("load-user").addEventListener("click", async () => {
            const response = await fetch("/api/user");
            const user = await response.json();

            document.getElementById("result").textContent =
              user.name + " | " + user.job + " | " + user.city;
          });
        </script>
      </body>
    </html>
  `);

  // Step 4.
  // Click the button to trigger the API request.
  await page.click("#load-user");

  // Step 5.
  // Verify that the UI shows mocked data.
  await expect(page.locator("#result")).toHaveText(
    "Danil | QA Engineer | Kyiv"
  );
});
