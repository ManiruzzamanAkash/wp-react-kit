<?php
/**
 * Split job detail pattern.
 */
return [
	'title'       => __( 'Job Detail (Split)', 'jobplace' ),
	'description' => __( 'Two-column layout with summary sidebar and description.', 'jobplace' ),
	'categories'  => [ 'jobplace_jobs', 'jobplace_job_detail' ],
	'blockTypes'  => [ 'wrc/job-page' ],
	'priority'    => 2,
	'content'     => '<!-- wp:wrc/job-page {"align":"wide","style":{"spacing":{"blockGap":"1.5rem"}}} -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
<div class="wp-block-columns"><!-- wp:column {"width":"66.66%"} -->
<div class="wp-block-column" style="flex-basis:66.66%"><!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group"><!-- wp:wrc/job-featured-badge /-->

<!-- wp:wrc/job-remote-badge /--></div>
<!-- /wp:group -->

<!-- wp:wrc/job-title {"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} /-->

<!-- wp:group {"className":"jobplace-job-card__meta","layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group jobplace-job-card__meta"><!-- wp:wrc/job-company /-->

<!-- wp:wrc/job-location /-->

<!-- wp:wrc/job-type /-->

<!-- wp:wrc/job-category /--></div>
<!-- /wp:group -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:wrc/job-description {"excerptLength":0} /--></div>
<!-- /wp:column -->

<!-- wp:column {"width":"33.33%"} -->
<div class="wp-block-column" style="flex-basis:33.33%"><!-- wp:group {"className":"jobplace-job-detail__sidebar","style":{"spacing":{"padding":{"top":"1.25rem","right":"1.25rem","bottom":"1.25rem","left":"1.25rem"},"blockGap":"0.75rem"},"border":{"radius":"8px","width":"1px"},"color":{"background":"#f6f7f7"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group jobplace-job-detail__sidebar has-background" style="border-radius:8px;border-width:1px;background-color:#f6f7f7;padding-top:1.25rem;padding-right:1.25rem;padding-bottom:1.25rem;padding-left:1.25rem"><!-- wp:wrc/job-apply-button /-->

<!-- wp:wrc/job-salary /-->

<!-- wp:wrc/job-experience-level /-->

<!-- wp:wrc/job-deadline /-->

<!-- wp:wrc/job-vacancies /--></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
<!-- /wp:wrc/job-page -->',
];
