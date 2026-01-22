import { beforeEach, describe, expect, test } from '@playwright/test';

describe('1 Work with www.aliexpress.com', () => {
	let response;

	beforeEach(async ({ page }) => {

		response = await page.goto('https://www.aliexpress.com/', {
			waitUntil: 'networkidle',
			timeout: 60000,
		});
	});

	test('1.1 Status must be 200', async () => {
		expect(response?.status()).toBe(200);
	});

	test('1.2 Page should have title', async ({ page }) => {
		let title = await page.title();
		// console.log('Page Title: ' + title);
		expect(title).toContain('AliExpress');
	});

	test('1.3 Should be properly page URL', async ({ page }) => {
		let pageUrl = page.url();
		expect(pageUrl).toBe('https://www.aliexpress.com/');
	});
	// test('1.3 Search input should be visible', async ({ page }) => {
	// 	await expect(page.getByPlaceholder("I'm shopping for...")).toBeVisible();
	// });

	// test('1.4 Categories should be visible', async ({ page }) => {
	// 	await expect(page.getByText('All Categorie')).toBeVisible();
	// });
	test('click element', async ({ page }) => {
		await page.goto('https://www.aliexpress.com/');

		// Вариант 1: XPath (если нет других вариантов)
		await page
			.locator(
				'xpath=//*[@id="_full_container_header_23_"]/div[2]/div/div[2]/div[4]'
			)
			.click();

		// Или ищи ID напрямую (если это div с ID)
		await page
			.locator('#_full_container_header_23_')
			.locator('div:nth-child(2)')
			.locator('div')
			.locator('div:nth-child(2)')
			.locator('div:nth-child(4)')
			.click();

		console.log('Element clicked!');
		await page.close();
	});
});
