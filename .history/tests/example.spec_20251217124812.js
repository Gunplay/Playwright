import { describe, test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

describe('Open www.aliexpress.com -> status: 200', fixtures => {
	beforeEach(async ({ page }) => {
    await page.goto('https://www.aliexpress.com/')
});
})
