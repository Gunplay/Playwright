const { test, expect } = require("@playwright/test");

test.describe("Date Picker", () => {
  test("Pick Date", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const year = "2027";
    const month = "March";
    const date = "15";
    const monthIndex = "2";
    const expectedValue = "03/15/2027";
    const datePickerPopup = page.locator("#ui-datepicker-div");

    await page.click("#datepicker");

    let currentYear;
    let currentMonth;

    while (true) {
      currentYear = await datePickerPopup
        .locator(".ui-datepicker-year")
        .textContent();
      currentMonth = await datePickerPopup
        .locator(".ui-datepicker-month")
        .textContent();

      if (currentYear === year && currentMonth === month) {
        break;
      }

      await datePickerPopup.locator('[title="Next"]').click();
      await page.waitForTimeout(200);
    }

    // Date selection with loop:
    // const dates = await datePickerPopup.locator("td").all();
    // let clickedTargetDate = false;
    //
    // for (let i = 0; i < dates.length; i++) {
    //   const currentDate = (await dates[i].textContent())?.trim();
    //   const currentDateYear = await dates[i].getAttribute("data-year");
    //   const currentDateMonth = await dates[i].getAttribute("data-month");
    //
    //   if (
    //     currentYear === year &&
    //     currentMonth === month &&
    //     currentDateYear === year &&
    //     currentDateMonth === monthIndex &&
    //     currentDate === date
    //   ) {
    //     await dates[i].locator("a").click();
    //     clickedTargetDate = true;
    //     break;
    //   }
    // }
    //
    // expect(clickedTargetDate).toBeTruthy();

    // Date selection without loop:
    await datePickerPopup.locator(`//a[@class='ui-state-default'][text()='${date}']`).click();

    const selectedDate = await page.locator("#datepicker").inputValue();
    const [selectedMonth, selectedDay, selectedYear] = selectedDate.split("/");

    expect(selectedMonth).toBe("03");
    expect(selectedDay).toBe(date);
    expect(selectedYear).toBe(year);
    await expect(page.locator("#datepicker")).toHaveValue(expectedValue);
    await page.waitForTimeout(3000);
  });
});
