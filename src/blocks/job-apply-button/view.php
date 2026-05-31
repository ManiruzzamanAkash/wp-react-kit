<?php
$settings    = \Akash\JobPlace\Common\Settings::get();
$apply_label = ! empty( $attributes['text'] )
	? $attributes['text']
	: $settings['default_apply_button_text'];
?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'jobplace-job-apply-button wp-block-buttons' ] ) ); ?><?php echo wp_kses_data( wp_interactivity_data_wp_context( [ 'applyLabel' => $apply_label, 'openInNewTab' => ! empty( $attributes['openInNewTab'] ) ? '_blank' : null ] ) ); ?>>
	<div class="wp-block-button <?php echo esc_attr( $attributes['buttonStyle'] ?? 'is-style-fill' ); ?>">
		<a class="wp-block-button__link wp-element-button" data-wp-bind--href="state.applyUrl" data-wp-bind--target="context.openInNewTab" data-wp-text="state.applyLabel"></a>
	</div>
</div>
