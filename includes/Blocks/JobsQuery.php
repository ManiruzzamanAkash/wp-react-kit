<?php

namespace Akash\JobPlace\Blocks;

use Akash\JobPlace\Common\Settings;
use Akash\JobPlace\Jobs\Job;

/**
 * Query jobs for block rendering and SSR state.
 */
class JobsQuery {

	/**
	 * Build query args from block attributes.
	 *
	 * @param array $attributes Block attributes.
	 * @return array
	 */
	public static function get_query_args( array $attributes ): array {
		$query = $attributes['query'] ?? [];

		$default_per_page = (int) Settings::get()['jobs_per_page'];

		$args = [
			'page'     => max( 1, (int) ( $query['page'] ?? 1 ) ),
			'per_page' => max( 1, (int) ( $query['perPage'] ?? $default_per_page ) ),
			'orderby'  => sanitize_key( $query['orderby'] ?? 'id' ),
			'order'    => strtoupper( sanitize_key( $query['order'] ?? 'desc' ) ),
			'search'   => sanitize_text_field( $query['search'] ?? '' ),
			'status'   => sanitize_key( $query['status'] ?? 'published' ),
		];

		foreach ( [ 'is_featured', 'is_remote', 'is_negotiable' ] as $flag ) {
			if ( isset( $query[ $flag ] ) && '' !== $query[ $flag ] ) {
				$args[ $flag ] = (int) $query[ $flag ];
			}
		}

		foreach ( [ 'job_type_id', 'job_category_id', 'company_id' ] as $id_field ) {
			if ( ! empty( $query[ $id_field ] ) ) {
				$args[ $id_field ] = (int) $query[ $id_field ];
			}
		}

		if ( ! empty( $query['experience_level'] ) ) {
			$args['experience_level'] = sanitize_text_field( $query['experience_level'] );
		}

		return $args;
	}

	/**
	 * Run a jobs query for a block instance.
	 *
	 * @param \WP_Block $block Block instance.
	 * @return array{jobs: array<int, array>, total: int, totalPages: int, page: int, perPage: int}
	 */
	public static function query( $block ): array {
		$attributes = is_object( $block ) ? ( $block->attributes ?? [] ) : [];
		$args       = self::get_query_args( $attributes );

		$count_args           = $args;
		$count_args['count']  = 1;
		$total                = (int) wp_react_kit()->jobs->all( $count_args );
		$per_page             = (int) $args['per_page'];
		$total_pages          = $per_page > 0 ? (int) ceil( $total / $per_page ) : 0;
		$jobs                 = wp_react_kit()->jobs->all( $args );
		$formatted            = [];

		foreach ( $jobs as $job ) {
			$formatted[] = Job::to_array( $job );
		}

		return [
			'jobs'       => $formatted,
			'total'      => $total,
			'totalPages' => $total_pages,
			'page'       => (int) $args['page'],
			'perPage'    => $per_page,
		];
	}

	/**
	 * Unique list id for interactivity context.
	 *
	 * @return string
	 */
	public static function unique_list_id(): string {
		static $counter = 0;
		++$counter;

		return 'jobs-list-' . $counter;
	}
}
