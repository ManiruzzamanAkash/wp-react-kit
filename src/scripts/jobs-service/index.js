/**
 * REST helpers for the jobs board interactivity store.
 */
import apiFetch from '@jobplace/api-fetch';

const { addQueryArgs } = wp.url;

export const basePath = 'job-place/v1/jobs';

export const buildQuery = ( query = {} ) => {
	const params = {
		page: query.page || 1,
		per_page: query.perPage || 10,
		orderby: query.orderby || 'id',
		order: query.order || 'desc',
		status: query.status || 'published',
	};

	if ( query.search?.trim?.() ) {
		params.search = query.search.trim();
	}

	[ 'is_featured', 'is_remote', 'is_negotiable' ].forEach( ( flag ) => {
		if ( undefined !== query[ flag ] && '' !== query[ flag ] ) {
			params[ flag ] = query[ flag ];
		}
	} );

	[ 'job_type_id', 'job_category_id', 'company_id' ].forEach( ( idField ) => {
		if ( query[ idField ] ) {
			params[ idField ] = query[ idField ];
		}
	} );

	if ( query.experience_level ) {
		params.experience_level = query.experience_level;
	}

	return params;
};

export async function fetchJobs( query = {} ) {
	const params = buildQuery( query );

	return apiFetch( {
		path: addQueryArgs( basePath, params ),
		parse: false,
	} );
}

export async function parseJobsResponse( response ) {
	const total = parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 );
	const totalPages = parseInt(
		response.headers.get( 'X-WP-TotalPages' ) || '0',
		10
	);
	const jobs = await response.json();

	return {
		jobs,
		total,
		totalPages,
	};
}
