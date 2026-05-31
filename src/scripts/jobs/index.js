/**
 * Jobs board interactivity store.
 */
import { store, getContext, getElement, withSyncEvent } from '@wordpress/interactivity';

const { __, sprintf, _n } = wp.i18n;

const formatSalary = ( job ) => {
	if ( ! job ) {
		return '';
	}

	if ( job.is_negotiable ) {
		return __( 'Negotiable', 'jobplace' );
	}

	const currency = job.salary_currency || 'USD';
	const periodLabels = {
		hourly: __( 'hour', 'jobplace' ),
		monthly: __( 'month', 'jobplace' ),
		yearly: __( 'year', 'jobplace' ),
	};
	const period = periodLabels[ job.salary_period ] || job.salary_period;

	const formatter = new Intl.NumberFormat( undefined, {
		style: 'currency',
		currency,
		maximumFractionDigits: 0,
	} );

	if ( job.salary_min && job.salary_max ) {
		return sprintf(
			/* translators: 1: minimum salary, 2: maximum salary, 3: period */
			__( '%1$s – %2$s / %3$s', 'jobplace' ),
			formatter.format( job.salary_min ),
			formatter.format( job.salary_max ),
			period
		);
	}

	if ( job.salary_min ) {
		return sprintf(
			/* translators: 1: salary amount, 2: period */
			__( 'From %1$s / %2$s', 'jobplace' ),
			formatter.format( job.salary_min ),
			period
		);
	}

	if ( job.salary_max ) {
		return sprintf(
			/* translators: 1: salary amount, 2: period */
			__( 'Up to %1$s / %2$s', 'jobplace' ),
			formatter.format( job.salary_max ),
			period
		);
	}

	return '';
};

const formatDeadline = ( value ) => {
	if ( ! value ) {
		return '';
	}

	const date = new Date( value );
	if ( Number.isNaN( date.getTime() ) ) {
		return value;
	}

	return date.toLocaleDateString();
};

const formatExperience = ( level ) => {
	const labels = {
		entry: __( 'Entry level', 'jobplace' ),
		mid: __( 'Mid level', 'jobplace' ),
		senior: __( 'Senior level', 'jobplace' ),
		lead: __( 'Lead', 'jobplace' ),
	};

	return labels[ level ] || level || '';
};

const stripHtml = ( value ) => ( value || '' ).replace( /<[^>]+>/g, ' ' ).trim();

const truncateText = ( text, length ) => {
	if ( ! length || length <= 0 ) {
		return text;
	}

	if ( text.length <= length ) {
		return text;
	}

	return `${ text.slice( 0, Math.max( 0, length - 1 ) ) }…`;
};

const buildPaginationLinks = ( page, totalPages ) => {
	const links = [];

	for ( let index = 1; index <= totalPages; index += 1 ) {
		links.push( {
			page: index,
			label: String( index ),
			current: index === page,
		} );
	}

	return links;
};

const { state, actions } = store( 'jobplace/jobs', {
	state: {
		jobs: [],
		total: 0,
		totalPages: 0,
		page: 1,
		loading: false,
		error: null,
		search: '',

		get hasJobs() {
			return ( state.jobs?.length || 0 ) > 0;
		},

		get jobsCountLabel() {
			return sprintf(
				/* translators: %d: number of jobs */
				_n( '%d job', '%d jobs', state.total, 'jobplace' ),
				state.total
			);
		},

		get hasPreviousPage() {
			return state.page > 1;
		},

		get hasNextPage() {
			return state.page < state.totalPages;
		},

		get paginationLinks() {
			if ( state.totalPages < 2 ) {
				return [];
			}

			return buildPaginationLinks( state.page, state.totalPages );
		},

		get jobTitle() {
			return getContext()?.job?.title || '';
		},

		get jobCompanyName() {
			return getContext()?.job?.company?.name || '';
		},

		get jobLocationText() {
			const job = getContext()?.job;
			if ( ! job ) {
				return '';
			}

			if ( job.is_remote ) {
				return job.location
					? sprintf(
							/* translators: 1: location, 2: remote label */
							__( '%1$s (Remote)', 'jobplace' ),
							job.location
					  )
					: __( 'Remote', 'jobplace' );
			}

			return job.location || '';
		},

		get jobTypeName() {
			return getContext()?.job?.job_type?.name || '';
		},

		get jobCategoryName() {
			return (
				getContext()?.job?.job_category?.name ||
				getContext()?.job?.category ||
				''
			);
		},

		get jobSalaryText() {
			return formatSalary( getContext()?.job );
		},

		get jobDescriptionExcerpt() {
			const description = getContext()?.job?.description || '';
			const text = stripHtml( description );
			const length = getContext()?.excerptLength ?? 180;

			return truncateText( text, length );
		},

		get jobDeadlineText() {
			return formatDeadline( getContext()?.job?.application_deadline );
		},

		get jobExperienceText() {
			return formatExperience( getContext()?.job?.experience_level );
		},

		get jobVacanciesText() {
			const vacancies = getContext()?.job?.vacancies || 0;
			if ( vacancies <= 1 ) {
				return '';
			}

			return sprintf(
				/* translators: %d: number of vacancies */
				__( '%d openings', 'jobplace' ),
				vacancies
			);
		},

		get isFeaturedJob() {
			return !! getContext()?.job?.is_featured;
		},

		get isRemoteJob() {
			return !! getContext()?.job?.is_remote;
		},

		get jobDetailUrl() {
			const job = getContext()?.job;
			if ( ! job ) {
				return '#';
			}

			return job.permalink || '#';
		},

		get applyUrl() {
			const job = getContext()?.job;
			if ( ! job ) {
				return '#';
			}

			if ( job.apply_url ) {
				return job.apply_url;
			}

			if ( job.apply_email ) {
				return `mailto:${ job.apply_email }?subject=${ encodeURIComponent(
					job.title
				) }`;
			}

			return '#';
		},

		get applyLabel() {
			return getContext()?.applyLabel || __( 'Apply now', 'jobplace' );
		},

		get featuredBadgeLabel() {
			return getContext()?.featuredLabel || __( 'Featured', 'jobplace' );
		},

		get remoteBadgeLabel() {
			return getContext()?.remoteLabel || __( 'Remote', 'jobplace' );
		},

		get noResultsLabel() {
			return getContext()?.noResultsLabel || __( 'No jobs found.', 'jobplace' );
		},

		get paginationSummary() {
			if ( ! state.totalPages ) {
				return '';
			}

			return sprintf(
				/* translators: 1: current page, 2: total pages */
				__( 'Page %1$d of %2$d', 'jobplace' ),
				state.page,
				state.totalPages
			);
		},
	},

	callbacks: {
		*init() {
			const context = getContext();
			if ( context?.jobs?.length ) {
				state.jobs = context.jobs;
				state.total = context.total || context.jobs.length;
				state.totalPages = context.totalPages || 1;
				state.page = context.page || 1;
				state.search = context.query?.search || '';
			} else {
				yield actions.refreshJobs();
			}
		},

		*onChangeJobs() {
			// Reserved for analytics or future side effects.
		},
	},

	actions: {
		*refreshJobs( query = {} ) {
			state.loading = true;
			state.error = null;

			try {
				const { fetchJobs, parseJobsResponse } = yield import(
					/* webpackIgnore: true */ '@jobplace/jobs-service'
				);

				const context = getContext();
				const response = yield fetchJobs( {
					...( context?.query || {} ),
					...query,
					page: query.page || state.page,
					search: query.search ?? state.search,
				} );

				const parsed = yield parseJobsResponse( response );
				state.jobs = parsed.jobs;
				state.total = parsed.total;
				state.totalPages = parsed.totalPages;
				state.page = query.page || state.page;
			} catch ( error ) {
				state.error = error?.message || __( 'Unable to load jobs.', 'jobplace' );
			} finally {
				state.loading = false;
			}
		},

		*goToPreviousPage() {
			if ( ! state.hasPreviousPage ) {
				return;
			}

			yield actions.refreshJobs( { page: state.page - 1 } );
		},

		*goToNextPage() {
			if ( ! state.hasNextPage ) {
				return;
			}

			yield actions.refreshJobs( { page: state.page + 1 } );
		},

		*goToPage( event ) {
			const page = parseInt( event?.target?.dataset?.page, 10 );

			if ( ! page || page === state.page ) {
				return;
			}

			yield actions.refreshJobs( { page } );
		},

		*submitSearch( event ) {
			event?.preventDefault?.();
			const { ref } = getElement();
			const input = ref?.querySelector?.( 'input[type="search"]' );
			state.search = input?.value || '';
			state.page = 1;
			yield actions.refreshJobs( { page: 1, search: state.search } );
		},

		*clearSearch() {
			state.search = '';
			state.page = 1;
			yield actions.refreshJobs( { page: 1, search: '' } );
		},

		handleSearchKeydown: withSyncEvent( function* ( event ) {
			if ( event.key === 'Enter' ) {
				yield actions.submitSearch( event );
			}
		} ),
	},
} );
