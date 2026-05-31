<?php
/**
 * Featured-first jobs board pattern.
 */
return [
	'title'       => __( 'Jobs Board (Featured)', 'jobplace' ),
	'description' => __( 'Highlights featured and remote badges above job details.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_jobs_list' ],
	'blockTypes'  => [ 'wrc/jobs-list' ],
	'priority'    => 3,
	'content'     => '<!-- wp:wrc/jobs-list {"align":"wide","style":{"spacing":{"blockGap":"1.5rem"}}} -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">' . esc_html__( 'Open positions', 'jobplace' ) . '</h2>
<!-- /wp:heading -->

<!-- wp:group {"className":"jobplace-jobs-toolbar","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group jobplace-jobs-toolbar"><!-- wp:wrc/jobs-count /-->

<!-- wp:wrc/jobs-search /--></div>
<!-- /wp:group -->

<!-- wp:wrc/jobs-template {"style":{"spacing":{"blockGap":"1.25rem"}}} -->
<!-- wp:group {"className":"jobplace-job-card","style":{"spacing":{"padding":{"top":"1.25rem","right":"1.25rem","bottom":"1.25rem","left":"1.25rem"},"blockGap":"0.75rem"},"border":{"radius":"12px","width":"1px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group jobplace-job-card" style="border-radius:12px;border-width:1px;padding-top:1.25rem;padding-right:1.25rem;padding-bottom:1.25rem;padding-left:1.25rem"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:wrc/job-featured-badge /-->

<!-- wp:wrc/job-remote-badge /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-apply-button /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"1.25rem","fontWeight":"700"}}} /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-company /-->

<!-- wp:wrc/job-location /-->

<!-- wp:wrc/job-type /-->

<!-- wp:wrc/job-category /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-salary /-->

<!-- wp:wrc/job-description /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-experience-level /-->

<!-- wp:wrc/job-deadline /-->

<!-- wp:wrc/job-vacancies /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
<!-- /wp:wrc/jobs-template -->

<!-- wp:wrc/jobs-no-results /-->

<!-- wp:wrc/jobs-pagination /-->
<!-- /wp:wrc/jobs-list -->',
];
