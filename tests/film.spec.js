import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uaserials.com/1306-vtecha-z-vyaznici.html');
  await page.locator('iframe').nth(1).contentFrame().locator('pjsdiv:nth-child(18) > pjsdiv > pjsdiv').first().click();
  await page.locator('iframe').nth(1).contentFrame().locator('pjsdiv:nth-child(29) > pjsdiv:nth-child(5)').click();
  await page.locator('iframe').nth(1).contentFrame().getByText('Пропустити через').click();
  await page.waitForTimeout(18000);
  await page.locator('iframe').nth(1).contentFrame().getByText('Пропустити через').click();
  await page.waitForTimeout(18000);
  await page.locator('iframe').nth(1).contentFrame().locator('pjsdiv:nth-child(17) > pjsdiv:nth-child(3)').click();
  await page.locator('iframe').nth(1).contentFrame().locator('video').click();
});