<?php
/**
 * Compact jobs board pattern.
 */
return [
	'title'       => __( 'Jobs Board (Compact)', 'jobplace' ),
	'description' => __( 'Minimal list rows with title, company, and apply action.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_jobs_list' ],
	'blockTypes'  => [ 'wrc/jobs-list' ],
	'priority'    => 2,
	'content'     => '<!-- wp:wrc/jobs-list {"align":"wide","style":{"spacing":{"blockGap":"1rem"}}} -->
<!-- wp:group {"className":"jobplace-jobs-toolbar","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
<div class="wp-block-group jobplace-jobs-toolbar"><!-- wp:wrc/jobs-count /-->

<!-- wp:wrc/jobs-search /--></div>
<!-- /wp:group -->

<!-- wp:wrc/jobs-template {"style":{"spacing":{"blockGap":"0.5rem"}}} -->
<!-- wp:group {"className":"jobplace-job-card jobplace-job-card--compact","style":{"spacing":{"padding":{"top":"0.75rem","bottom":"0.75rem"},"blockGap":"0.25rem"},"border":{"bottom":{"color":"#e0e0e0","width":"1px"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"}} -->
<div class="wp-block-group jobplace-job-card jobplace-job-card--compact" style="border-bottom-color:#e0e0e0;border-bottom-width:1px;padding-top:0.75rem;padding-bottom:0.75rem"><!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"1rem","fontWeight":"600"}}} /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-company /-->

<!-- wp:wrc/job-location /-->

<!-- wp:wrc/job-type /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:wrc/job-apply-button /--></div>
<!-- /wp:group -->
<!-- /wp:wrc/jobs-template -->

<!-- wp:wrc/jobs-no-results /-->

<!-- wp:wrc/jobs-pagination /-->
<!-- /wp:wrc/jobs-list -->',
];
