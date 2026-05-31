<?php

namespace Akash\JobPlace\Common;

use Akash\JobPlace\Routing\PermalinksSettings;
use Akash\JobPlace\WordPress\Pages\PageService;

/**
 * Plugin-wide settings stored in a single option.
 */
class Settings {

	/**
	 * Option key.
	 */
	public const OPTION_KEY = 'jobplace_settings';

	/**
	 * Default job detail pattern slug (filename without .php).
	 */
	public const DEFAULT_JOB_DETAIL_PATTERN = 'job-detail-default';

	/**
	 * Default settings.
	 *
	 * @return array<string, mixed>
	 */
	public static function defaults(): array {
		return [
			'job_detail_pattern'        => self::DEFAULT_JOB_DETAIL_PATTERN,
			'jobs_per_page'             => 10,
			'default_apply_button_text' => __( 'Apply now', 'jobplace' ),
			'jobs_page_id'              => 0,
		];
	}

	/**
	 * Get merged settings.
	 *
	 * @return array<string, mixed>
	 */
	public static function get(): array {
		$stored = get_option( self::OPTION_KEY, [] );

		if ( ! is_array( $stored ) ) {
			$stored = [];
		}

		$settings = array_merge( self::defaults(), $stored );

		$page_service = new PageService();
		$jobs_page_id = (int) $page_service->get_id( 'jobs' );

		if ( $jobs_page_id > 0 ) {
			$settings['jobs_page_id'] = $jobs_page_id;
		}

		return $settings;
	}

	/**
	 * Update settings.
	 *
	 * @param array<string, mixed> $settings Settings to save.
	 * @return bool
	 */
	public static function update( array $settings ): bool {
		$current = self::get();
		$allowed = self::defaults();

		if ( isset( $settings['job_detail_pattern'] ) ) {
			$slug = sanitize_key( $settings['job_detail_pattern'] );
			if ( self::pattern_exists( $slug ) ) {
				$current['job_detail_pattern'] = $slug;
			}
		}

		if ( isset( $settings['jobs_per_page'] ) ) {
			$current['jobs_per_page'] = max( 1, min( 50, (int) $settings['jobs_per_page'] ) );
		}

		if ( isset( $settings['default_apply_button_text'] ) ) {
			$current['default_apply_button_text'] = sanitize_text_field( $settings['default_apply_button_text'] );
		}

		if ( array_key_exists( 'jobs_page_id', $settings ) ) {
			$page_id = (int) $settings['jobs_page_id'];
			$page_service = new PageService();

			if ( $page_id > 0 && 'page' === get_post_type( $page_id ) ) {
				update_option( $page_service->get_option_name( 'jobs' ), $page_id );
				$current['jobs_page_id'] = $page_id;
			}
		}

		/**
		 * Fires after plugin settings are updated.
		 *
		 * @param array<string, mixed> $current Saved settings.
		 */
		do_action( 'jobplace/settings_updated', $current );

		return update_option( self::OPTION_KEY, $current );
	}

	/**
	 * Registered job detail layout patterns.
	 *
	 * @return array<int, array{slug: string, title: string, description: string}>
	 */
	public static function get_job_detail_pattern_choices(): array {
		$choices = [];
		$files   = glob( JOB_PLACE_PATH . '/templates/patterns/job-detail-*.php' );

		if ( empty( $files ) ) {
			return $choices;
		}

		usort(
			$files,
			static function ( $a, $b ) {
				$a_pattern = include $a;
				$b_pattern = include $b;
				return ( $a_pattern['priority'] ?? 10 ) <=> ( $b_pattern['priority'] ?? 10 );
			}
		);

		foreach ( $files as $file ) {
			$pattern = include $file;
			$slug    = basename( $file, '.php' );

			if ( empty( $pattern['title'] ) || empty( $pattern['content'] ) ) {
				continue;
			}

			$choices[] = [
				'slug'        => $slug,
				'title'       => $pattern['title'],
				'description' => $pattern['description'] ?? '',
			];
		}

		return $choices;
	}

	/**
	 * Check whether a job detail pattern slug exists.
	 *
	 * @param string $slug Pattern slug.
	 * @return bool
	 */
	public static function pattern_exists( string $slug ): bool {
		$file = JOB_PLACE_PATH . '/templates/patterns/' . $slug . '.php';
		return is_readable( $file );
	}

	/**
	 * Load raw pattern markup for a slug.
	 *
	 * @param string $slug Pattern slug.
	 * @return string
	 */
	public static function get_pattern_content( string $slug ): string {
		if ( ! self::pattern_exists( $slug ) ) {
			$slug = self::DEFAULT_JOB_DETAIL_PATTERN;
		}

		$pattern = include JOB_PLACE_PATH . '/templates/patterns/' . $slug . '.php';

		return is_array( $pattern ) && ! empty( $pattern['content'] )
			? (string) $pattern['content']
			: '';
	}

	/**
	 * Build the full single-job block template using the selected layout pattern.
	 *
	 * @return string
	 */
	public static function get_single_job_template_content(): string {
		$shell_file = JOB_PLACE_PATH . '/templates/templates/single-job.html';

		if ( ! is_readable( $shell_file ) ) {
			return self::get_pattern_content( self::get()['job_detail_pattern'] );
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$shell = (string) file_get_contents( $shell_file );
		$pattern_content = self::get_pattern_content( self::get()['job_detail_pattern'] );

		if ( '' === $pattern_content ) {
			return $shell;
		}

		$replaced = preg_replace(
			'/<!-- wp:wrc\/job-page\b.*?<!-- \/wp:wrc\/job-page -->/s',
			$pattern_content,
			$shell,
			1
		);

		return is_string( $replaced ) && '' !== $replaced ? $replaced : $shell;
	}

	/**
	 * Settings payload for the REST API / admin UI.
	 *
	 * @return array<string, mixed>
	 */
	public static function to_array(): array {
		$settings     = self::get();
		$page_service = new PageService();
		$jobs_page    = $page_service->get( 'jobs' );
		$permalinks   = PermalinksSettings::get();

		$pages = get_posts(
			[
				'post_type'      => 'page',
				'post_status'    => [ 'publish', 'draft' ],
				'posts_per_page' => 100,
				'orderby'        => 'title',
				'order'          => 'ASC',
			]
		);

		$page_choices = [
			[
				'value' => 0,
				'label' => __( '— Select a page —', 'jobplace' ),
			],
		];

		foreach ( $pages as $page ) {
			$page_choices[] = [
				'value' => (int) $page->ID,
				'label' => $page->post_title,
			];
		}

		return [
			'job_detail_pattern'        => $settings['job_detail_pattern'],
			'jobs_per_page'             => (int) $settings['jobs_per_page'],
			'default_apply_button_text' => $settings['default_apply_button_text'],
			'jobs_page_id'              => (int) $settings['jobs_page_id'],
			'permalink_base'            => $permalinks['job_page'] ?? 'jobs',
			'choices'                   => [
				'job_detail_patterns' => self::get_job_detail_pattern_choices(),
				'pages'               => $page_choices,
			],
			'urls'                      => [
				'jobs_page_edit'  => $jobs_page ? get_edit_post_link( $jobs_page->ID, 'raw' ) : '',
				'jobs_page_view'  => $jobs_page ? get_permalink( $jobs_page->ID ) : '',
				'permalinks'      => admin_url( 'options-permalink.php#jobplace_permalinks' ),
			],
		];
	}
}
