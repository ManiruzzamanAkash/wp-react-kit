<div
	<?php echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'class' => 'jobplace-jobs-template',
				'role'  => 'list',
			]
		)
	); ?>
>
	<template
		data-wp-each--job="state.jobs"
		data-wp-each-key="context.job.id"
	>
		<article class="jobplace-job-card" role="listitem">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</article>
	</template>
</div>
