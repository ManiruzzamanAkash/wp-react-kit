<?php
/**
 * Default jobs board pattern.
 */
return [
	'title'       => __( 'Jobs Board (Default)', 'jobplace' ),
	'description' => __( 'Interactive job listings with search, cards, and pagination.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_jobs_list' ],
	'blockTypes'  => [ 'wrc/jobs-list' ],
	'priority'    => 0,
	'content'     => '<!-- wp:wrc/jobs-list {"align":"wide","style":{"spacing":{"blockGap":"1.5rem"}}} -->
<!-- wp:group {"className":"jobplace-jobs-toolbar","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group jobplace-jobs-toolbar"><!-- wp:wrc/jobs-count /-->

<!-- wp:wrc/jobs-search /--></div>
<!-- /wp:group -->

<!-- wp:wrc/jobs-template {"style":{"spacing":{"blockGap":"1.25rem"}}} -->
<!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"1.125rem","fontWeight":"600"}}} /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-company /-->

<!-- wp:wrc/job-location /-->

<!-- wp:wrc/job-type /-->

<!-- wp:wrc/job-category /--></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:wrc/job-featured-badge /-->

<!-- wp:wrc/job-remote-badge /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-salary /-->

<!-- wp:wrc/job-description /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-experience-level /-->

<!-- wp:wrc/job-deadline /-->

<!-- wp:wrc/job-vacancies /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-apply-button {"style":{"spacing":{"margin":{"top":"1rem"}}}} /-->
<!-- /wp:wrc/jobs-template -->

<!-- wp:wrc/jobs-no-results /-->

<!-- wp:wrc/jobs-pagination /-->
<!-- /wp:wrc/jobs-list -->',
];
