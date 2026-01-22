import { beforeEach, describe, expect, test } from '@playwright/test';

describe('1 Work with www.aliexpress.com', () => {
	let response;

	beforeEach(async ({ page }) => {
		response = await page.goto('https://www.aliexpress.com/', {
			waitUntil: 'networkidle',
		});
	});

	test('1.1 Status must be 200', async () => {
		expect(response?.status()).toBe(200);
	});

	test('1.2 Page should have title', async ({ page }) => {
		expect(await page.title()).toContain('AliExpress');
	});

	test('1.3 Search input should be visible', async ({ page }) => {
		await expect(page.getByPlaceholder("I'm shopping for...")).toBeVisible();
	});

	test('1.4 Categories should be visible', async ({ page }) => {
		await expect(page.getByText('All Categorie')).toBeVisible();
	});
});
