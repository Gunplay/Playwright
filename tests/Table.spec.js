const { test, expect } = require("@playwright/test");

test.describe("Table", () => {
  test("handling table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = page.locator("#productTable");
    const columns = table.locator("thead tr th");
    const rows = table.locator("tbody tr");

    console.log("Number of columns:", await columns.count());
    console.log("Number of rows:", await rows.count());

    await expect(columns).toHaveCount(4);
    await expect(rows).toHaveCount(5);

    // 2) select check box for product
    // const matchedRow = rows.filter({
    //   has: page.locator("td"),
    //   hasText: "Smartwatch",
    // });
    // await matchedRow.locator("input").check();
    // await page.waitForTimeout(5000);

    // 3) select multiple products by re-usable function
    await selectedProduct(rows, page, "Tablet");
    await selectedProduct(rows, page, "Smartwatch");
    await selectedProduct(rows, page, "Wireless Earbuds");

    // 4) print all product details using loop
    // for (let i = 0; i < (await rows.count()); i++) {
    //   const row = rows.nth(i);
    //   const tds = row.locator("td");

    //   for (let j = 0; j < (await tds.count()) - 1; j++) {
    //     console.log(await tds.nth(j).textContent());
    //   }
    // }

    // 5 read data from all the pages i the table)

    const pages = page.locator(".pagination li a");
    console.log("Number of pages in the table:", await pages.count());

    for (let p = 0; p < (await pages.count()); p++) {
      // This loop goes through each pagination link by index.
      // `p = 0` is the first page, `p = 1` is the second page, and so on.
      if (p > 0) {
        await pages.nth(p).click(); // Skip clicking page 1 because the table is already opened there.
      }

      for (let i = 0; i < (await rows.count()); i++) {
        const row = rows.nth(i);
        const tds = row.locator("td");

        for (let j = 0; j < (await tds.count()) - 1; j++) {
          console.log(await tds.nth(j).textContent());
        }
      }
      await page.waitForTimeout(3000);
    }

    await page.waitForTimeout(3000);

    // functiom selectedProd
    async function selectedProduct(rows, page, name) {
      const matchedRow = rows.filter({
        has: page.locator("td"),
        hasText: name,
      });
      await matchedRow.locator("input").check();
      await page.waitForTimeout(5000);
    }
  });
});
