/**
 * REST helpers for the jobs board interactivity store.
 */
import apiFetch from '@jobplace/api-fetch';
import { getContext } from '@wordpress/interactivity';

const { addQueryArgs } = wp.url;

export const basePath = 'job-place/v1/jobs';

export const buildQuery = ( query = {} ) => {
	const context = getContext();
	const merged = {
		...( context?.query || {} ),
		...query,
	};

	const params = {
		page: merged.page || 1,
		per_page: merged.perPage || 10,
		orderby: merged.orderby || 'id',
		order: merged.order || 'desc',
	};

	if ( merged.search ) {
		params.search = merged.search;
	}

	if ( merged.status ) {
		params.status = merged.status;
	}

	[ 'is_featured', 'is_remote', 'is_negotiable' ].forEach( ( flag ) => {
		if ( undefined !== merged[ flag ] && '' !== merged[ flag ] ) {
			params[ flag ] = merged[ flag ];
		}
	} );

	[ 'job_type_id', 'job_category_id', 'company_id' ].forEach( ( idField ) => {
		if ( merged[ idField ] ) {
			params[ idField ] = merged[ idField ];
		}
	} );

	if ( merged.experience_level ) {
		params.experience_level = merged.experience_level;
	}

	return params;
};

export function* fetchJobs( query = {} ) {
	const params = buildQuery( query );

	return yield apiFetch( {
		path: addQueryArgs( basePath, params ),
		parse: false,
	} );
}

export function* parseJobsResponse( response ) {
	const total = parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 );
	const totalPages = parseInt(
		response.headers.get( 'X-WP-TotalPages' ) || '0',
		10
	);
	const jobs = yield response.json();

	return {
		jobs,
		total,
		totalPages,
	};
}
