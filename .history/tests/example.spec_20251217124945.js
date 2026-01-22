import { describe, test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

describe('Work with www.aliexpress.com -> status: 200', () => {
	beforeEach(async ({ page }) => {
    await page.goto('https://www.aliexpress.com/')
});
})
