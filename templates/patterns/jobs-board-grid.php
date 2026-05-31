<?php
/**
 * Grid jobs board pattern.
 */
return [
	'title'       => __( 'Jobs Board (Grid)', 'jobplace' ),
	'description' => __( 'Job cards in a responsive grid with search and pagination.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_jobs_list' ],
	'blockTypes'  => [ 'wrc/jobs-list' ],
	'priority'    => 1,
	'content'     => '<!-- wp:wrc/jobs-list {"align":"wide","style":{"spacing":{"blockGap":"1.5rem"}}} -->
<!-- wp:group {"className":"jobplace-jobs-toolbar","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group jobplace-jobs-toolbar"><!-- wp:wrc/jobs-count /-->

<!-- wp:wrc/jobs-search /--></div>
<!-- /wp:group -->

<!-- wp:wrc/jobs-template {"style":{"spacing":{"blockGap":"1.25rem"}},"layout":{"type":"grid","columnCount":2,"minimumColumnWidth":"280px"}} -->
<!-- wp:group {"className":"jobplace-job-card","style":{"spacing":{"padding":{"top":"1rem","right":"1rem","bottom":"1rem","left":"1rem"},"blockGap":"0.5rem"},"border":{"radius":"8px","width":"1px"},"color":{"background":"#f6f7f7"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group jobplace-job-card has-background" style="border-radius:8px;border-width:1px;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;background-color:#f6f7f7"><!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"1.125rem","fontWeight":"600"}}} /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-company /-->

<!-- wp:wrc/job-location /--></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:wrc/job-featured-badge /-->

<!-- wp:wrc/job-remote-badge /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-salary /-->

<!-- wp:wrc/job-description /-->

<!-- wp:wrc/job-apply-button /--></div>
<!-- /wp:group -->
<!-- /wp:wrc/jobs-template -->

<!-- wp:wrc/jobs-no-results /-->

<!-- wp:wrc/jobs-pagination /-->
<!-- /wp:wrc/jobs-list -->',
];
