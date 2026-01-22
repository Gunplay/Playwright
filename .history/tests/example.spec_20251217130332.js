import { beforeEach, describe, expect, test } from '@playwright/test';

describe('Work with www.aliexpress.com -> status: 200', () => {
	let response;
	
	beforeEach(async ({ page }) => {
		response = await page.goto('https://www.aliexpress.com/', {
			waitUntil: 'networkidle'
		});
		console.log('Response status:', response?.status());
	});
	
	test('Status must be -> 200', async () => {
		expect(response?.status()).toBe(200);
	});
});