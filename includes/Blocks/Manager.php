<?php

namespace Akash\JobPlace\Blocks;

/**
 * Block Manager class.
 *
 * Responsible for managing all the blocks.
 */
class Manager {

	/**
	 * Constructor.
	 *
	 * @since 0.7.0
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_all_blocks' ] );
	}

	/**
	 * Register all blocks.
	 *
	 * @since 0.7.0
	 *
	 * @return void
	 */
	public function register_all_blocks(): void {
		global $wp_version;

		$is_pre_wp_6 = version_compare( $wp_version, '6.0', '<' );

		if ( $is_pre_wp_6 ) {
			// Filter the plugins URL to allow us to have blocks in themes with linked assets.
			add_filter( 'plugins_url', [ $this, 'filter_plugins_url' ], 10, 2 );
		}

        $this->register_block_metas();

		if ( $is_pre_wp_6 ) {
			// Remove the filter after we register the blocks
			remove_filter( 'plugins_url', [ $this, 'filter_plugins_url' ], 10, 2 );
		}
	}

    /**
     * Register all block by block jsons.
     *
     * @since 0.7.0
     *
     * @return void
     */
    protected function register_block_metas(): void {
        $blocks = [
            'header/',
        ];

        foreach ( $blocks as $block ) {
            $block_folder    = JOB_PLACE_PATH . '/build/blocks/' . $block;
            $block_options   = [];
            $markup_file_path = JOB_PLACE_TEMPLATE_PATH . '/blocks/' . $block . 'markup.php';

            if ( file_exists( $markup_file_path ) ) {
                $block_options['render_callback'] = function( $attributes, $content, $block ) use ( $markup_file_path ) {
                    $context = $block->context;
                    ob_start();
                    include $markup_file_path;
                    return ob_get_clean();
                };
            }

            register_block_type_from_metadata( $block_folder, $block_options );
        }
    }

	/**
	 * Filter the plugins_url to allow us to use assets from theme.
     *
     * @since 0.7.0
	 *
	 * @param string $url  The plugins url
	 * @param string $path The path to the asset.
	 *
	 * @return string The overridden url to the block asset.
	 */
	public function filter_plugins_url( string $url, string $path ): string {
		$file = preg_replace( '/\.\.\//', '', $path );
		return trailingslashit( get_stylesheet_directory_uri() ) . $file;
	}
}
