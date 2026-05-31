<nav <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'jobplace-jobs-pagination' ] ) ); ?> data-wp-bind--hidden="!state.totalPages" hidden aria-label="<?php esc_attr_e( 'Jobs pagination', 'jobplace' ); ?>">
	<span class="jobplace-jobs-pagination__summary" data-wp-text="state.paginationSummary"></span>
	<div class="jobplace-jobs-pagination__controls">
		<div class="wp-block-buttons">
			<div class="wp-block-button is-style-outline">
				<button type="button" class="wp-block-button__link wp-element-button" data-wp-on--click="actions.goToPreviousPage" data-wp-bind--disabled="!state.hasPreviousPage"><?php esc_html_e( 'Previous', 'jobplace' ); ?></button>
			</div>
		</div>
		<div class="jobplace-jobs-pagination__numbers">
			<template data-wp-each="state.paginationLinks" data-wp-each-key="context.page">
				<button type="button" class="jobplace-jobs-pagination__number" data-wp-on--click="actions.goToPage" data-wp-bind--data-page="context.page" data-wp-bind--disabled="context.current" data-wp-class--is-current="context.current" data-wp-text="context.label"></button>
			</template>
		</div>
		<div class="wp-block-buttons">
			<div class="wp-block-button is-style-outline">
				<button type="button" class="wp-block-button__link wp-element-button" data-wp-on--click="actions.goToNextPage" data-wp-bind--disabled="!state.hasNextPage"><?php esc_html_e( 'Next', 'jobplace' ); ?></button>
			</div>
		</div>
	</div>
</nav>
