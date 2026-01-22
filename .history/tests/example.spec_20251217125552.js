import { beforeEach, describe, expect, test } from '@playwright/test';

describe('Work with www.aliexpress.com -> status: 200', () => {
	let response;
	beforeEach(async ({ page, browser }) => {
		response = await page.goto('https://www.aliexpress.com/');
		console.log('Response status:', response.status(), response);
	});
	test('Status must be -> 200', async () => {
		expect(response.status()).toBe(200);
	});
});
