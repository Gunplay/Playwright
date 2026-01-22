import { beforeEach, describe, expect, test } from '@playwright/test';

describe('Work with www.aliexpress.com', () => {
	let response;
	
	beforeEach(async ({ page }) => {
		response = await page.goto('https://www.aliexpress.com/', {
			waitUntil: 'networkidle'
		});
	});
	
	test('Status must be 200', async () => {
		expect(response?.status()).toBe(200);
	});
	
	test('Page should have title', async ({ page }) => {
		expect(await page.title()).toContain('AliExpress');
	});
	
	test('Search input should be visible', async ({ page }) => {
		await expect(page.getByPlaceholder('I\'m shopping for...')).toBeVisible();
	});
	
	test('Categories should be visible', async ({ page }) => {
		await expect(page.getByText('All Categories')).toBeVisible();
	});
});