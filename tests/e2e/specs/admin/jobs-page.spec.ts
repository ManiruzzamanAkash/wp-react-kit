/**
 * External dependencies.
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies.
 */
import { jobplaceAdminUrl } from '../../request-utils/admin-pages';

test.describe( 'Jobs Admin Page', () => {
	test( 'Should render jobs list with seeded data', async ( { page } ) => {
		await page.goto( jobplaceAdminUrl( '/jobs' ) );

		const app = page.locator( '#jobplace' );
		await expect( app ).toBeVisible();
		await expect(
			app.getByRole( 'heading', { name: 'Jobs', exact: true } )
		).toBeVisible();
		await expect(
			app.getByRole( 'button', { name: 'Add Job' } )
		).toBeVisible();
	} );
} );
