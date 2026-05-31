<?php
/**
 * Default job detail pattern.
 */
return [
	'title'       => __( 'Job Detail (Default)', 'jobplace' ),
	'description' => __( 'Single job layout with title, meta, description, and apply button.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_job_detail' ],
	'blockTypes'  => [ 'wrc/job-page' ],
	'priority'    => 0,
	'content'     => '<!-- wp:wrc/job-page {"align":"wide","style":{"spacing":{"blockGap":"1.5rem"}}} -->
<!-- wp:group {"className":"jobplace-job-detail__header","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group jobplace-job-detail__header"><!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:wrc/job-featured-badge /-->

<!-- wp:wrc/job-remote-badge /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-company /-->

<!-- wp:wrc/job-location /-->

<!-- wp:wrc/job-type /-->

<!-- wp:wrc/job-category /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:wrc/job-apply-button /--></div>
<!-- /wp:group -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:group {"className":"jobplace-job-detail__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-detail__meta"><!-- wp:wrc/job-salary /-->

<!-- wp:wrc/job-experience-level /-->

<!-- wp:wrc/job-deadline /-->

<!-- wp:wrc/job-vacancies /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-description {"excerptLength":0} /-->
<!-- /wp:wrc/job-page -->',
];
