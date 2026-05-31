<?php

namespace Akash\JobPlace\Routing;

use Akash\JobPlace\Common\Keys;

/**
 * Job detail permalink settings.
 */
class PermalinksSettings {

	/**
	 * Default permalink structure.
	 *
	 * @return array
	 */
	public static function defaults(): array {
		return [
			'job_page' => 'jobs',
		];
	}

	/**
	 * Get stored permalink settings.
	 *
	 * @return array
	 */
	public static function get(): array {
		$stored = \get_option( Keys::JOB_PLACE_PERMALINKS, [] );

		return \wp_parse_args( is_array( $stored ) ? $stored : [], self::defaults() );
	}

	/**
	 * Get the job detail URL base slug.
	 *
	 * @return string
	 */
	public static function get_job_base(): string {
		$settings = self::get();
		$base     = \sanitize_title( $settings['job_page'] ?? 'jobs' );

		return $base ?: 'jobs';
	}

	/**
	 * Persist permalink settings.
	 *
	 * @param array $settings Settings to save.
	 * @return void
	 */
	public static function update( array $settings ): void {
		$current = self::get();

		if ( isset( $settings['job_page'] ) ) {
			$current['job_page'] = \sanitize_title( $settings['job_page'] ) ?: 'jobs';
		}

		\update_option( Keys::JOB_PLACE_PERMALINKS, $current );
	}
}
