const { test, expect } = require("@playwright/test");

test("Drag And Drop", async ({ page }) => {
  await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");

  const draggable = page.locator("#draggable");
  const droppable = page.locator("#droppable");

  await draggable.dragTo(droppable);
  await expect(droppable).toContainText("Dropped!");
});
