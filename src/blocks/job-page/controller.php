<?php

use Akash\JobPlace\Blocks\EditorData;
use Akash\JobPlace\Routing\JobDetailRouter;

$job = JobDetailRouter::get_current_job();

if ( empty( $job ) && ! empty( $attributes['jobId'] ) ) {
	$row = wp_react_kit()->jobs->get(
		[
			'key'   => 'id',
			'value' => (int) $attributes['jobId'],
		]
	);

	if ( $row ) {
		$job = \Akash\JobPlace\Jobs\Job::to_array( $row );
	}
}

if ( empty( $job ) ) {
	$preview = EditorData::resolve_preview( [ 'perPage' => 1 ] );
	$job     = $preview['jobs'][0] ?? null;
}

if ( empty( $job ) ) {
	return '';
}

wp_interactivity_state(
	'jobplace/jobs',
	[
		'jobs'  => [ $job ],
		'total' => 1,
	]
);

return 'file:./view.php';
