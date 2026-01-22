import { beforeEach, describe, expect, test } from '@playwright/test';

describe('Work with www.aliexpress.com -> status: 200', () => {
	let response;
	
	beforeEach(async ({ page }) => {
	// Отключить headless режим (видно окно браузера)
	// это делается в конфиге, но для теста:
	
	await page.setExtraHTTPHeaders({
		'Accept-Language': 'en-US,en;q=0.9',
	});
	
	response = await page.goto('https://www.aliexpress.com/', {
		waitUntil: 'domcontentloaded', // Или networkidle
		timeout: 60000 // Больше времени на загрузку
	});
});
	
	test('Status must be -> 200', async () => {
		expect(response?.status()).toBe(200);
	});
});