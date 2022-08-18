// Load utilities from the e2e-test-utils package.
import { visitAdminPage } from '@wordpress/e2e-test-utils';

describe('Environment Setup Test', () => {
    it('Should load properly', async () => {
        try {
            // Navigate the admin and performs tasks
            // Use Puppeteer APIs to interact with mouse, keyboard...
            await visitAdminPage('/', '');
        } catch (error) {}

        // Assertions
        const nodes = await page.$x(
            '//h2[contains(text(), "Welcome to WordPress!")]'
        );

        expect(nodes.length).not.toEqual(0);
    });
});
