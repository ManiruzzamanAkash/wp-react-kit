<?php
/**
 * Compact job detail pattern.
 */
return [
	'title'       => __( 'Job Detail (Compact)', 'jobplace' ),
	'description' => __( 'Stacked single-column layout focused on essentials.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_job_detail' ],
	'blockTypes'  => [ 'wrc/job-page' ],
	'priority'    => 1,
	'content'     => '<!-- wp:wrc/job-page {"align":"wide","style":{"spacing":{"blockGap":"1rem"}}} -->
<!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"1.75rem","fontWeight":"700"}}} /-->

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

<!-- wp:group {"className":"jobplace-job-detail__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-detail__meta"><!-- wp:wrc/job-salary /-->

<!-- wp:wrc/job-experience-level /-->

<!-- wp:wrc/job-deadline /-->

<!-- wp:wrc/job-vacancies /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-description {"excerptLength":0} /-->

<!-- wp:wrc/job-apply-button /-->
<!-- /wp:wrc/job-page -->',
];
