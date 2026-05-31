/**
 * External dependencies
 */
import type { Filter, View } from '@wordpress/dataviews/wp';

/**
 * Internal dependencies
 */
import { IJobFilter } from '../interfaces';

const DEFAULT_PER_PAGE = 10;

const BOOLEAN_FILTER_FIELDS = [
	'is_featured',
	'is_remote',
	'is_negotiable',
] as const;

const ID_FILTER_FIELDS: Record< string, keyof IJobFilter > = {
	job_type: 'job_type_id',
	job_category: 'job_category_id',
	company: 'company_id',
};

type DashboardFilterPreset = {
	status?: 'published' | 'draft';
	is_featured?: 0 | 1;
	is_remote?: 0 | 1;
	is_negotiable?: 0 | 1;
};

export const DASHBOARD_JOB_FILTER_PRESETS: Record<
	string,
	DashboardFilterPreset
> = {
	total: {},
	published: { status: 'published' },
	draft: { status: 'draft' },
	featured: { is_featured: 1 },
	remote: { is_remote: 1 },
	negotiable: { is_negotiable: 1 },
};

export const createDefaultJobsView = (): View => ( {
	type: 'table',
	search: '',
	page: 1,
	perPage: DEFAULT_PER_PAGE,
	fields: [
		'job_type',
		'job_category',
		'company',
		'location',
		'salary',
		'vacancies',
		'posted',
		'status',
	],
	titleField: 'title',
	filters: [],
	sort: {},
	layout: {},
} );

const normalizeBooleanFilterValue = ( value: unknown ): boolean => {
	if ( typeof value === 'boolean' ) {
		return value;
	}

	if ( value === 1 || value === '1' ) {
		return true;
	}

	return false;
};

export const filtersToApiParams = (
	view: Pick< View, 'page' | 'perPage' | 'search' | 'filters' >
): IJobFilter => {
	const params: IJobFilter = {
		page: view.page ?? 1,
		per_page: view.perPage ?? DEFAULT_PER_PAGE,
	};

	if ( view.search ) {
		params.search = view.search;
	}

	for ( const filter of view.filters ?? [] ) {
		if ( filter.operator !== 'is' || filter.value === undefined ) {
			continue;
		}

		if ( filter.field === 'status' ) {
			params.status = filter.value;
			continue;
		}

		if ( filter.field === 'experience_level' ) {
			params.experience_level = String( filter.value );
			continue;
		}

		if (
			BOOLEAN_FILTER_FIELDS.includes(
				filter.field as ( typeof BOOLEAN_FILTER_FIELDS )[ number ]
			)
		) {
			params[ filter.field as 'is_featured' | 'is_remote' | 'is_negotiable' ] =
				normalizeBooleanFilterValue( filter.value ) ? 1 : 0;
			continue;
		}

		const apiField = ID_FILTER_FIELDS[ filter.field ];

		if ( apiField && filter.value !== '' ) {
			params[ apiField ] = Number( filter.value );
		}
	}

	return params;
};

export const apiParamsToFilters = ( params: IJobFilter ): Filter[] => {
	const filters: Filter[] = [];

	if ( params.status ) {
		filters.push( {
			field: 'status',
			operator: 'is',
			value: params.status,
		} );
	}

	for ( const field of BOOLEAN_FILTER_FIELDS ) {
		if ( params[ field ] === 0 || params[ field ] === 1 ) {
			filters.push( {
				field,
				operator: 'is',
				value: params[ field ] === 1,
			} );
		}
	}

	for ( const [ field, apiField ] of Object.entries( ID_FILTER_FIELDS ) ) {
		const value = params[ apiField ];

		if ( value ) {
			filters.push( {
				field,
				operator: 'is',
				value: String( value ),
			} );
		}
	}

	if ( params.experience_level ) {
		filters.push( {
			field: 'experience_level',
			operator: 'is',
			value: params.experience_level,
		} );
	}

	return filters;
};

export const apiParamsFromSearchParams = (
	searchParams: URLSearchParams
): IJobFilter => {
	const params: IJobFilter = {};

	const page = Number( searchParams.get( 'page' ) );
	const perPage = Number( searchParams.get( 'per_page' ) );
	const search = searchParams.get( 'search' );

	if ( page > 0 ) {
		params.page = page;
	}

	if ( perPage > 0 ) {
		params.per_page = perPage;
	}

	if ( search ) {
		params.search = search;
	}

	const status = searchParams.get( 'status' );

	if ( status === 'published' || status === 'draft' ) {
		params.status = status;
	}

	for ( const field of BOOLEAN_FILTER_FIELDS ) {
		const value = searchParams.get( field );

		if ( value === '0' || value === '1' ) {
			params[ field ] = Number( value ) as 0 | 1;
		}
	}

	for ( const apiField of Object.values( ID_FILTER_FIELDS ) ) {
		const value = Number( searchParams.get( apiField ) );

		if ( value > 0 ) {
			params[ apiField ] = value;
		}
	}

	const experienceLevel = searchParams.get( 'experience_level' );

	if ( experienceLevel ) {
		params.experience_level = experienceLevel;
	}

	return params;
};

export const viewFromSearchParams = ( searchParams: URLSearchParams ): View => {
	const apiParams = apiParamsFromSearchParams( searchParams );

	return {
		...createDefaultJobsView(),
		search: apiParams.search ?? '',
		page: apiParams.page ?? 1,
		perPage: apiParams.per_page ?? DEFAULT_PER_PAGE,
		filters: apiParamsToFilters( apiParams ),
	};
};

export const searchParamsFromView = ( view: View ): URLSearchParams => {
	const params = filtersToApiParams( view );
	const searchParams = new URLSearchParams();

	if ( params.search ) {
		searchParams.set( 'search', params.search );
	}

	if ( params.page && params.page > 1 ) {
		searchParams.set( 'page', String( params.page ) );
	}

	if ( params.per_page && params.per_page !== DEFAULT_PER_PAGE ) {
		searchParams.set( 'per_page', String( params.per_page ) );
	}

	if ( params.status ) {
		searchParams.set( 'status', params.status );
	}

	for ( const field of BOOLEAN_FILTER_FIELDS ) {
		if ( params[ field ] === 0 || params[ field ] === 1 ) {
			searchParams.set( field, String( params[ field ] ) );
		}
	}

	for ( const apiField of Object.values( ID_FILTER_FIELDS ) ) {
		if ( params[ apiField ] ) {
			searchParams.set( apiField, String( params[ apiField ] ) );
		}
	}

	if ( params.experience_level ) {
		searchParams.set( 'experience_level', params.experience_level );
	}

	return searchParams;
};

export const buildJobsListPath = ( presetKey: string ): string => {
	const preset = DASHBOARD_JOB_FILTER_PRESETS[ presetKey ] ?? {};
	const searchParams = new URLSearchParams();

	if ( preset.status ) {
		searchParams.set( 'status', preset.status );
	}

	for ( const field of BOOLEAN_FILTER_FIELDS ) {
		if ( preset[ field ] === 0 || preset[ field ] === 1 ) {
			searchParams.set( field, String( preset[ field ] ) );
		}
	}

	const query = searchParams.toString();

	return query ? `/jobs?${ query }` : '/jobs';
};
