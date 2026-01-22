import { describe, test, expect, beforeEach } from '@playwright/test';


describe('Work with www.aliexpress.com -> status: 200', () => {
  let response
	beforeEach(async ({ page }) => {
    response = await page.goto('https://www.aliexpress.com/')
    console.log('Response status:', response.status(), response);
});
