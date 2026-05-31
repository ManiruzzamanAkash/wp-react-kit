<?php

namespace Akash\JobPlace\Routing;

use Akash\JobPlace\Common\Settings;
use Akash\JobPlace\Jobs\Job;
use Akash\JobPlace\Jobs\JobStatus;

/**
 * Resolve job detail requests and render the block template.
 */
class JobDetailRouter {

	/**
	 * Cached template markup for classic themes.
	 *
	 * @var string|null
	 */
	protected static $template_content = null;

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'template_redirect', [ $this, 'handle_job_detail_request' ], 5 );
		\add_filter( 'document_title_parts', [ $this, 'filter_document_title' ] );
	}

	/**
	 * Load the current job for detail pages.
	 *
	 * @return void
	 */
	public function handle_job_detail_request(): void {
		$slug = \get_query_var( PermalinkService::QUERY_VAR );

		if ( empty( $slug ) ) {
			return;
		}

		$job = wp_react_kit()->jobs->get(
			[
				'key'   => 'slug',
				'value' => \sanitize_title( $slug ),
			]
		);

		if ( empty( $job ) || 'published' !== JobStatus::get_status_by_job( $job ) ) {
			global $wp_query;
			$wp_query->set_404();
			\status_header( 404 );
			\nocache_headers();
			return;
		}

		$GLOBALS['jobplace_current_job'] = Job::to_array( $job );
		self::$template_content          = $this->get_single_job_template_content();

		$this->prepare_main_query();
		$this->register_template_hierarchy_filters();

		if ( \wp_is_block_theme() ) {
			return;
		}

		\add_filter( 'template_include', [ $this, 'load_single_job_template' ], 99 );
		\add_action( 'jobplace_single_job_content', [ $this, 'render_single_job_content' ] );
	}

	/**
	 * Prevent the main query from rendering as an empty blog index.
	 *
	 * @return void
	 */
	protected function prepare_main_query(): void {
		global $wp_query;

		$wp_query->is_404     = false;
		$wp_query->is_home    = false;
		$wp_query->is_archive = false;
		$wp_query->is_singular = true;

		\status_header( 200 );
	}

	/**
	 * Prefer the plugin single-job block template on block themes.
	 *
	 * @return void
	 */
	protected function register_template_hierarchy_filters(): void {
		$prepend_single_job = static function ( array $templates ): array {
			if ( empty( $GLOBALS['jobplace_current_job'] ) ) {
				return $templates;
			}

			return array_merge( [ 'single-job' ], $templates );
		};

		\add_filter( 'index_template_hierarchy', $prepend_single_job );
		\add_filter( 'home_template_hierarchy', $prepend_single_job );
	}

	/**
	 * Swap in the plugin template for classic themes.
	 *
	 * @param string $template Current template path.
	 * @return string
	 */
	public function load_single_job_template( string $template ): string {
		if ( null === self::$template_content ) {
			return $template;
		}

		return JOB_PLACE_TEMPLATE_PATH . '/pages/single-job.php';
	}

	/**
	 * Render the single job block template for classic themes.
	 *
	 * @return void
	 */
	public function render_single_job_content(): void {
		if ( empty( self::$template_content ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo \do_blocks( self::$template_content );
	}

	/**
	 * Get the single job block template markup.
	 *
	 * @return string
	 */
	protected function get_single_job_template_content(): string {
		$template = \get_block_template( 'jobplace/jobplace//single-job', 'wp_template' );

		if (
			! empty( $template->content )
			&& isset( $template->source )
			&& 'custom' === $template->source
		) {
			return $template->content;
		}

		return Settings::get_single_job_template_content();
	}

	/**
	 * Set the browser title on job detail pages.
	 *
	 * @param array $title Title parts.
	 * @return array
	 */
	public function filter_document_title( array $title ): array {
		if ( empty( $GLOBALS['jobplace_current_job']['title'] ) ) {
			return $title;
		}

		$title['title'] = $GLOBALS['jobplace_current_job']['title'];

		return $title;
	}

	/**
	 * Get the current job on detail pages.
	 *
	 * @return array|null
	 */
	public static function get_current_job(): ?array {
		return $GLOBALS['jobplace_current_job'] ?? null;
	}
}
