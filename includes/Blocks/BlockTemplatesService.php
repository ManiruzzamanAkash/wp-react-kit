<?php

namespace Akash\JobPlace\Blocks;

use Akash\JobPlace\Common\Settings;

/**
 * Register plugin block templates for job detail pages.
 */
class BlockTemplatesService {

	/**
	 * Plugin template namespace.
	 */
	public const TEMPLATE_NAMESPACE = 'jobplace/jobplace';

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_filter( 'get_block_templates', [ $this, 'add_block_templates' ], 10, 3 );
		\add_filter( 'pre_get_block_file_template', [ $this, 'get_block_file_template' ], 10, 3 );
	}

	/**
	 * Add plugin block templates to template queries.
	 *
	 * @param array  $query_result  Templates.
	 * @param array  $query         Query args.
	 * @param string $template_type Template type.
	 * @return array
	 */
	public function add_block_templates( array $query_result, array $query, string $template_type ): array {
		if ( 'wp_template' !== $template_type ) {
			return $query_result;
		}

		$slugs = $query['slug__in'] ?? [];

		if ( ! empty( $slugs ) && ! in_array( 'single-job', $slugs, true ) ) {
			return $query_result;
		}

		$template = $this->build_template_from_file( 'single-job' );

		if ( ! $template ) {
			return $query_result;
		}

		foreach ( $query_result as $existing ) {
			if ( isset( $existing->slug ) && 'single-job' === $existing->slug ) {
				return $query_result;
			}
		}

		$query_result[] = $template;

		return $query_result;
	}

	/**
	 * Load a plugin block template from the filesystem.
	 *
	 * @param \WP_Block_Template|null $template      Existing template.
	 * @param string                  $id            Template id.
	 * @param string                  $template_type Template type.
	 * @return \WP_Block_Template|null
	 */
	public function get_block_file_template( $template, string $id, string $template_type ) {
		if ( self::TEMPLATE_NAMESPACE . '//single-job' !== $id || 'wp_template' !== $template_type ) {
			return $template;
		}

		return $this->build_template_from_file( 'single-job' ) ?: $template;
	}

	/**
	 * Build a WP_Block_Template object from a plugin HTML file.
	 *
	 * @param string $slug Template slug.
	 * @return \WP_Block_Template|null
	 */
	protected function build_template_from_file( string $slug ): ?\WP_Block_Template {
		$file = JOB_PLACE_PATH . '/templates/templates/' . $slug . '.html';

		if ( ! \is_readable( $file ) ) {
			return null;
		}

		$content = 'single-job' === $slug
			? Settings::get_single_job_template_content()
			: (string) file_get_contents( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

		$template                 = new \WP_Block_Template();
		$template->id             = self::TEMPLATE_NAMESPACE . '//' . $slug;
		$template->theme          = 'jobplace/jobplace';
		$template->content        = $content;
		$template->slug           = $slug;
		$template->source         = 'plugin';
		$template->type           = 'wp_template';
		$template->title          = \__( 'Single Job', 'jobplace' );
		$template->description  = \__( 'Template for individual job detail pages.', 'jobplace' );
		$template->status         = 'publish';
		$template->has_theme_file = true;
		$template->is_custom      = false;
		$template->post_types     = [];

		return $template;
	}
}
