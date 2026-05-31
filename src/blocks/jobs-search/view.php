<form <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'jobplace-jobs-search' ] ) ); ?> data-wp-on--submit="actions.submitSearch">
	<label class="screen-reader-text" for="jobplace-jobs-search-input"><?php esc_html_e( 'Search jobs', 'jobplace' ); ?></label>
	<input id="jobplace-jobs-search-input" class="jobplace-jobs-search__input" type="search" placeholder="<?php echo esc_attr( $attributes['placeholder'] ?? __( 'Search jobs…', 'jobplace' ) ); ?>" data-wp-bind--value="state.search" data-wp-on--keydown="actions.handleSearchKeydown" />
	<div class="wp-block-buttons">
		<div class="wp-block-button is-style-fill">
			<button type="submit" class="wp-block-button__link wp-element-button"><?php echo esc_html( $attributes['buttonText'] ?? __( 'Search', 'jobplace' ) ); ?></button>
		</div>
	</div>
</form>
