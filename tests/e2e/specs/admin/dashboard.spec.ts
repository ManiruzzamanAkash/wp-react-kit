/**
 * External dependencies.
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

/**
 * Internal dependencies.
 */
import { jobplaceAdminUrl } from '../../request-utils/admin-pages';

test.describe( 'Job Manager Dashboard', () => {
	test( 'Should render dashboard with stats and actions', async ( { page } ) => {
		await page.goto( jobplaceAdminUrl() );

		const app = page.locator( '#jobplace' );
		await expect( app ).toBeVisible();
		await expect(
			app.getByRole( 'heading', { name: 'Dashboard' } )
		).toBeVisible();
		await expect(
			app.getByRole( 'button', { name: 'Add Job' } )
		).toBeVisible();
		await expect( app.getByText( 'Total jobs' ) ).toBeVisible();
		await expect( app.getByText( 'Companies' ) ).toBeVisible();
	} );
} );
