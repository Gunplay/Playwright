import { beforeEach, describe, expect, test } from '@playwright/test';

describe('Work with www.aliexpress.com -> status: 200', () => {
	let response;
	
	beforeEach(async ({ page, browser }) => {
		// Добавляем параметры для обхода блокировки
		await page.addInitScript(() => {
			Object.defineProperty(navigator, 'webdriver', {
				get: () => false,
			});
		});
		
		// Добавляем User-Agent
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
		);
		
		// Переходим на страницу
		response = await page.goto('https://www.aliexpress.com/', {
			waitUntil: 'networkidle'
		});
		
		console.log('Response status:', response?.status(), response);
	});
	
	test('Status must be -> 200', async () => {
		expect(response?.status()).toBe(200);
	});
});