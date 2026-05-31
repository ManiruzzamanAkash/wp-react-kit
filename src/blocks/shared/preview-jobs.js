/**
 * Editor preview helpers for jobs board blocks.
 */

const getBlockData = () => window.jobPlaceBlockData || {};

const matchesQuery = ( job, query = {} ) => {
	if ( query.status === 'published' && job.is_active === false ) {
		return false;
	}

	if ( query.status === 'draft' && job.is_active !== false ) {
		return false;
	}

	if (
		undefined !== query.is_featured &&
		null !== query.is_featured &&
		'' !== query.is_featured &&
		!! job.is_featured !== !! parseInt( query.is_featured, 10 )
	) {
		return false;
	}

	if (
		undefined !== query.is_remote &&
		null !== query.is_remote &&
		'' !== query.is_remote &&
		!! job.is_remote !== !! parseInt( query.is_remote, 10 )
	) {
		return false;
	}

	if (
		undefined !== query.is_negotiable &&
		null !== query.is_negotiable &&
		'' !== query.is_negotiable &&
		!! job.is_negotiable !== !! parseInt( query.is_negotiable, 10 )
	) {
		return false;
	}

	if (
		query.experience_level &&
		job.experience_level !== query.experience_level
	) {
		return false;
	}

	if (
		query.job_type_id &&
		parseInt( job.job_type_id, 10 ) !== parseInt( query.job_type_id, 10 )
	) {
		return false;
	}

	if (
		query.job_category_id &&
		parseInt( job.job_category_id, 10 ) !== parseInt( query.job_category_id, 10 )
	) {
		return false;
	}

	if (
		query.company_id &&
		parseInt( job.company_id, 10 ) !== parseInt( query.company_id, 10 )
	) {
		return false;
	}

	return true;
};

const filterJobs = ( jobs, query = {} ) =>
	jobs.filter( ( job ) => matchesQuery( job, query ) );

/**
 * Resolve jobs to show in the block editor preview.
 *
 * @param {Object} query Block query attributes from parent context.
 * @return {{ jobs: Array, total: number, usingPlaceholders: boolean }}
 */
export function getEditorPreviewJobs( query = {} ) {
	const data = getBlockData();
	const perPage = Math.max( 1, parseInt( query?.perPage, 10 ) || 3 );

	if ( ! data.usingPlaceholders ) {
		const pool = filterJobs( data.previewPool || data.previewJobs || [], query );
		return {
			jobs: pool.slice( 0, perPage ),
			total: pool.length,
			usingPlaceholders: false,
		};
	}

	const placeholders = filterJobs( data.placeholderJobs || [], query );
	return {
		jobs: placeholders.slice( 0, perPage ),
		total: placeholders.length,
		usingPlaceholders: true,
	};
}

/**
 * Build block editor context objects for TemplateListEdit.
 *
 * @param {Object} query Block query attributes.
 * @return {Array}
 */
export function getEditorJobContexts( query = {} ) {
	const { jobs } = getEditorPreviewJobs( query );

	return jobs.map( ( job ) => ( {
		...job,
		id: job.id,
		job,
	} ) );
}

/**
 * Human-readable jobs count label for editor previews.
 *
 * @param {Object} query Block query attributes.
 * @return {string}
 */
export function getEditorJobsCountLabel( query = {} ) {
	const { total } = getEditorPreviewJobs( query );
	const count = total || 0;

	if ( count === 1 ) {
		return '1 job';
	}

	return `${ count } jobs`;
}

/**
 * Resolve a preview job for the job page block editor.
 *
 * @param {number} jobId Selected preview job id.
 * @return {Object|null}
 */
export function getEditorPreviewJob( jobId = 0 ) {
	const data = getBlockData();
	const pool = data.usingPlaceholders
		? data.placeholderJobs || []
		: data.previewPool || data.previewJobs || [];

	if ( jobId ) {
		return pool.find( ( job ) => job.id === jobId ) || pool[ 0 ] || null;
	}

	return pool[ 0 ] || null;
}
