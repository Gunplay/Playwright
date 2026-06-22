import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.aliexpress.com/');
  await page.locator('.pop-close-btn').click();
  await page.getByText('Allow', { exact: true }).click();
  await page.getByRole('button', { name: 'You can register, sign in or' }).click();
  await page.getByRole('link', { name: 'My Orders' }).click();
  await page.getByRole('link', { name: 'Aliexpress', exact: true }).click();
  await page.locator('.pop-close-btn').click();
  await page.getByRole('button', { name: 'close', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Samsung 25W Super Fast' }).click();
  const page1 = await page1Promise;
});