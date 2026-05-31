<?php

namespace Akash\JobPlace\Blocks;

/**
 * Builds card-level classes/styles for the jobs template block.
 *
 * Layout and block gap stay on the outer list wrapper; colors, borders,
 * and padding apply to each repeated job card.
 */
class TemplateItemAttributes {

	/**
	 * Get article wrapper attributes for a single job card.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 *
	 * @return array{class: string, style: string}
	 */
	public static function get( array $attributes ): array {
		$classes = array( 'jobplace-job-card' );
		$styles  = array();

		if ( ! empty( $attributes['backgroundColor'] ) ) {
			$classes[] = 'has-background';
			$classes[] = 'has-' . sanitize_html_class( $attributes['backgroundColor'] ) . '-background-color';
		}

		if ( ! empty( $attributes['textColor'] ) ) {
			$classes[] = 'has-text-color';
			$classes[] = 'has-' . sanitize_html_class( $attributes['textColor'] ) . '-color';
		}

		if ( ! empty( $attributes['borderColor'] ) ) {
			$classes[] = 'has-border-color';
			$classes[] = 'has-' . sanitize_html_class( $attributes['borderColor'] ) . '-border-color';
		}

		if ( ! empty( $attributes['style'] ) && function_exists( 'wp_style_engine_get_styles' ) ) {
			$style_input = array();

			if ( ! empty( $attributes['style']['color'] ) ) {
				$style_input['color'] = $attributes['style']['color'];
			}

			if ( ! empty( $attributes['style']['border'] ) ) {
				$style_input['border'] = $attributes['style']['border'];
			}

			if ( ! empty( $attributes['style']['spacing']['padding'] ) ) {
				$style_input['spacing'] = array(
					'padding' => $attributes['style']['spacing']['padding'],
				);
			}

			if ( ! empty( $style_input ) ) {
				$engine_styles = wp_style_engine_get_styles( $style_input );

				if ( ! empty( $engine_styles['classnames'] ) ) {
					$classes[] = $engine_styles['classnames'];
				}

				if ( ! empty( $engine_styles['css'] ) ) {
					$styles[] = $engine_styles['css'];
				}
			}
		}

		return array(
			'class' => implode( ' ', array_filter( $classes ) ),
			'style' => implode( ' ', $styles ),
		);
	}

	/**
	 * Get outer list wrapper classes and inline styles.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 *
	 * @return array{class: string, style: string}
	 */
	public static function get_list_wrapper( array $attributes ): array {
		$classes = array( 'jobplace-jobs-template' );
		$styles  = array();
		$layout  = $attributes['layout'] ?? array();

		if ( ! empty( $layout['type'] ) ) {
			$classes[] = 'is-layout-' . sanitize_html_class( $layout['type'] );

			if ( 'grid' === $layout['type'] && ! empty( $layout['columnCount'] ) ) {
				$classes[] = 'columns-' . (int) $layout['columnCount'];
			}
		}

		if (
			! empty( $attributes['style']['spacing']['blockGap'] ) &&
			function_exists( 'wp_style_engine_get_styles' )
		) {
			$gap_styles = wp_style_engine_get_styles(
				array(
					'spacing' => array(
						'blockGap' => $attributes['style']['spacing']['blockGap'],
					),
				)
			);

			if ( ! empty( $gap_styles['css'] ) ) {
				$styles[] = $gap_styles['css'];
			}
		}

		return array(
			'class' => implode( ' ', array_filter( $classes ) ),
			'style' => implode( ' ', $styles ),
		);
	}
}
