// @ts-check
import { expect, test } from '@playwright/test';
import { describe } from 'node:test';
describe('My first test suite', fixtures => {
	const { page, browser, context } = fixtures;

	test('has title', async fixtures => {
		console.log(fixtures);
		await page.goto('https://playwright.dev/');

		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Playwright/);
	});

	test('get started link', async ({ page }) => {
		await page.goto('https://playwright.dev/');

		// Click the get started link.
		await page.getByRole('link', { name: 'Get started' }).click();

		// Expects page to have a heading with the name of Installation.
		await expect(
			page.getByRole('heading', { name: 'Installation' })
		).toBeVisible();
	});
});
