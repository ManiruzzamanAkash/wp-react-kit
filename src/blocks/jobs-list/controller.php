<?php

use Akash\JobPlace\Blocks\JobsQuery;

$url_query = [];

if ( isset( $_GET['search'] ) ) {
	$url_query['search'] = sanitize_text_field( wp_unslash( $_GET['search'] ) );
}

if ( isset( $_GET['page'] ) ) {
	$url_query['page'] = max( 1, (int) $_GET['page'] );
}

$query_result = JobsQuery::query( $block, $url_query );
$list_id      = JobsQuery::unique_list_id();
$board_query  = wp_parse_args( $url_query, $attributes['query'] ?? [] );

wp_interactivity_state(
	'jobplace/jobs',
	[
		'jobs'       => $query_result['jobs'],
		'total'      => $query_result['total'],
		'totalPages' => $query_result['totalPages'],
		'page'       => $query_result['page'],
		'loading'    => false,
		'search'     => $board_query['search'] ?? '',
	]
);

return 'file:./view.php';
