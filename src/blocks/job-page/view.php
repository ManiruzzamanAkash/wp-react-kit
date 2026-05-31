<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'class' => 'jobplace-job-page',
			]
		)
	);
	echo wp_kses_data(
		wp_interactivity_data_wp_context(
			[
				'job' => $job,
			]
		)
	);
	?>
	data-wp-interactive='{ "namespace": "jobplace/jobs" }'
>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
