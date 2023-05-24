import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe('Environment Setup Test', () => {
    test('Should load properly', async ({ page }) => {
        page.goto('/wp-admin');
        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('div.wrap > h1')).toHaveText(
            'Dashboard'
        );
    });
});
