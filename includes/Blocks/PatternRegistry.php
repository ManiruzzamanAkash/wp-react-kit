<?php

namespace Akash\JobPlace\Blocks;

/**
 * Register block patterns for the jobs board.
 */
class PatternRegistry {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_categories' ] );
		add_action( 'init', [ $this, 'register_patterns' ] );
	}

	/**
	 * Register pattern categories.
	 *
	 * @return void
	 */
	public function register_categories(): void {
		$categories = [
			'jobplace_jobs'        => [
				'label' => __( 'Job Board', 'jobplace' ),
			],
			'jobplace_jobs_list'   => [
				'label' => __( 'Jobs List', 'jobplace' ),
			],
			'jobplace_job_detail'  => [
				'label' => __( 'Job Detail', 'jobplace' ),
			],
		];

		/**
		 * Filters job board pattern categories.
		 *
		 * @param array<string, array{label: string}> $categories
		 */
		$categories = apply_filters( 'jobplace/blocks/pattern_categories', $categories );

		foreach ( $categories as $name => $properties ) {
			if ( ! \WP_Block_Pattern_Categories_Registry::get_instance()->is_registered( $name ) ) {
				register_block_pattern_category( $name, $properties );
			}
		}
	}

	/**
	 * Register block patterns from templates/patterns.
	 *
	 * @return void
	 */
	public function register_patterns(): void {
		$pattern_files = glob( JOB_PLACE_PATH . '/templates/patterns/*.php' );

		if ( empty( $pattern_files ) ) {
			return;
		}

		usort(
			$pattern_files,
			static function ( $a, $b ) {
				$a_pattern = include $a;
				$b_pattern = include $b;
				return ( $a_pattern['priority'] ?? 10 ) <=> ( $b_pattern['priority'] ?? 10 );
			}
		);

		foreach ( $pattern_files as $pattern_file ) {
			$pattern = include $pattern_file;

			if ( empty( $pattern['title'] ) || empty( $pattern['content'] ) ) {
				continue;
			}

			register_block_pattern(
				'jobplace/' . basename( $pattern_file, '.php' ),
				$pattern
			);
		}
	}
}
