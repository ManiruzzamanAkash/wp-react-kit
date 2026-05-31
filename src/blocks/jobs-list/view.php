<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'class' => 'jobplace-jobs-board',
			]
		)
	);
	echo wp_kses_data(
		wp_interactivity_data_wp_context(
			[
				'listId'     => $list_id,
				'query'      => $attributes['query'] ?? [],
				'jobs'       => $query_result['jobs'],
				'total'      => $query_result['total'],
				'totalPages' => $query_result['totalPages'],
				'page'       => $query_result['page'],
			]
		)
	);
	?>
	data-wp-interactive='{ "namespace": "jobplace/jobs" }'
	data-wp-init="callbacks.init"
	data-wp-watch="callbacks.onChangeJobs"
>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<div class="jobplace-block-ui" data-wp-bind--hidden="!state.loading" hidden></div>
</div>
