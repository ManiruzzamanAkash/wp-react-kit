/**
 * External dependencies.
 */
import { register } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import JobStore from './jobs';
import JobCategoriesStore from './job-categories';
import CompaniesStore from './companies';

/**
 * Register stores.
 */
register( JobStore );
register( JobCategoriesStore );
register( CompaniesStore );
