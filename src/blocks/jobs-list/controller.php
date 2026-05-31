<?php

use Akash\JobPlace\Blocks\JobsQuery;

$query_result = JobsQuery::query( $block );
$list_id      = JobsQuery::unique_list_id();

wp_interactivity_state(
	'jobplace/jobs',
	[
		'jobs'       => $query_result['jobs'],
		'total'      => $query_result['total'],
		'totalPages' => $query_result['totalPages'],
		'page'       => $query_result['page'],
		'loading'    => false,
		'search'     => $attributes['query']['search'] ?? '',
	]
);

return 'file:./view.php';
