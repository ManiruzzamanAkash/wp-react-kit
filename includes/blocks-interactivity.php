<?php

use Akash\JobPlace\Blocks\JobsQuery;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register interactive blocks from build output.
 */
add_action(
	'init',
	function () {
		foreach ( glob( JOB_PLACE_PATH . '/build/blocks/**/block.json' ) as $file ) {
			$block_slug = basename( dirname( $file ) );

			// Legacy blocks register their own render callbacks elsewhere.
			if ( 'header' === $block_slug ) {
				continue;
			}

			register_block_type( dirname( $file ) );
		}
	}
);

/**
 * Controller render pattern for blocks with controller.php.
 */
add_filter(
	'block_type_metadata_settings',
	function ( $settings, $metadata ) {
		if ( empty( $metadata['file'] ) ) {
			return $settings;
		}

		$controller_path = wp_normalize_path(
			realpath(
				dirname( $metadata['file'] ) . '/' .
				remove_block_asset_path_prefix( 'file:./controller.php' )
			)
		);

		if ( ! $controller_path || ! file_exists( $controller_path ) ) {
			return $settings;
		}

		$settings['render_callback'] = static function ( $attributes, $content, $block ) use ( $controller_path, $metadata ) {
			$view = require $controller_path;

			if ( ! $view ) {
				return '';
			}

			$view_path = remove_block_asset_path_prefix( $view );
			if ( $view_path === $view ) {
				return $view;
			}

			$template_path = wp_normalize_path(
				realpath(
					dirname( $metadata['file'] ) . '/' . $view_path
				)
			);

			if ( ! $template_path ) {
				return '';
			}

			ob_start();
			require $template_path;
			return ob_get_clean();
		};

		return $settings;
	},
	11,
	2
);

/**
 * Register shared block styles.
 */
add_action(
	'init',
	function () {
		$css_files = glob( JOB_PLACE_PATH . '/build/styles/*.css' ) ?: [];

		foreach ( $css_files as $css_file ) {
			$handle = 'jobplace-' . basename( $css_file, '.css' );

			wp_register_style(
				$handle,
				JOB_PLACE_BUILD . '/styles/' . basename( $css_file ),
				[],
				filemtime( $css_file )
			);
		}
	}
);

/**
 * Register interactivity script modules.
 */
add_action(
	'init',
	function () {
		$build_path = JOB_PLACE_PATH . '/build/scripts/';

		if ( ! is_dir( $build_path ) ) {
			return;
		}

		$api_fetch_asset = include $build_path . 'api-fetch/index.asset.php';
		wp_register_script_module(
			'@jobplace/api-fetch',
			JOB_PLACE_BUILD . '/scripts/api-fetch/index.js',
			$api_fetch_asset['dependencies'],
			$api_fetch_asset['version']
		);

		add_action(
			'wp_footer',
			function () {
				?>
				<script>
					window.jobPlaceFetchData = <?php echo wp_json_encode(
						[
							'root_url' => esc_url_raw( rest_url() ),
							'nonce'    => ( wp_installing() && ! is_multisite() ) ? '' : wp_create_nonce( 'wp_rest' ),
						]
					); ?>;
				</script>
				<?php
			}
		);

		$jobs_service_asset = include $build_path . 'jobs-service/index.asset.php';
		wp_register_script_module(
			'@jobplace/jobs-service',
			JOB_PLACE_BUILD . '/scripts/jobs-service/index.js',
			[
				[
					'id'     => '@jobplace/api-fetch',
					'import' => 'dynamic',
				],
			],
			$jobs_service_asset['version']
		);

		$jobs_asset = include $build_path . 'jobs/index.asset.php';
		wp_register_script_module(
			'@jobplace/jobs',
			JOB_PLACE_BUILD . '/scripts/jobs/index.js',
			[
				[
					'id'     => '@wordpress/interactivity',
					'import' => 'dynamic',
				],
				[
					'id'     => '@jobplace/jobs-service',
					'import' => 'dynamic',
				],
			],
			$jobs_asset['version']
		);
	}
);

/**
 * Block category for jobs board blocks.
 */
add_filter(
	'block_categories_all',
	function ( $categories ) {
		$categories[] = [
			'slug'  => 'jobplace-jobs',
			'title' => __( 'Job Board', 'jobplace' ),
		];

		return $categories;
	}
);

/**
 * Pass preview job data to the block editor.
 */
add_action(
	'enqueue_block_editor_assets',
	function () {
		wp_register_script( 'jobplace-block-editor-data', false, [], JOB_PLACE_VERSION, true );
		wp_enqueue_script( 'jobplace-block-editor-data' );
		wp_add_inline_script(
			'jobplace-block-editor-data',
			'window.jobPlaceBlockData = ' . wp_json_encode( \Akash\JobPlace\Blocks\EditorData::get_editor_settings() ) . ';',
			'before'
		);
	}
);
