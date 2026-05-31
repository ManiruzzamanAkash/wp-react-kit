<?php

namespace Akash\JobPlace\Blocks;

use Akash\JobPlace\Jobs\Job;
use Akash\JobPlace\Routing\PermalinkService;

/**
 * Block editor preview data (real jobs or placeholders).
 */
class EditorData {

	/**
	 * Default query used for editor previews.
	 *
	 * @return array
	 */
	public static function default_query(): array {
		return [
			'perPage'  => 3,
			'page'     => 1,
			'orderby'  => 'id',
			'order'    => 'desc',
			'search'   => '',
			'status'   => 'published',
		];
	}

	/**
	 * Placeholder jobs shown in the editor when no real jobs exist.
	 *
	 * @return array<int, array>
	 */
	public static function get_placeholder_jobs(): array {
		$jobs = [
			[
				'id'                   => -1,
				'title'                => __( 'Senior WordPress Developer', 'jobplace' ),
				'slug'                 => 'senior-wordpress-developer',
				'location'             => __( 'Remote', 'jobplace' ),
				'is_remote'            => true,
				'is_featured'          => true,
				'is_negotiable'        => false,
				'is_active'            => true,
				'description'          => __( 'Build and maintain WordPress plugins, blocks, and REST integrations.', 'jobplace' ),
				'company'              => [
					'id'         => 1,
					'name'       => __( 'Acme Corp', 'jobplace' ),
					'avatar_url' => '',
				],
				'company_id'           => 1,
				'job_type'             => [
					'id'   => 1,
					'name' => __( 'Full-time', 'jobplace' ),
					'slug' => 'full-time',
				],
				'job_type_id'          => 1,
				'job_category'         => [
					'id'   => 1,
					'name' => __( 'Engineering', 'jobplace' ),
					'slug' => 'engineering',
				],
				'job_category_id'      => 1,
				'salary_min'           => 80000,
				'salary_max'           => 120000,
				'salary_currency'      => 'USD',
				'salary_period'        => 'yearly',
				'experience_level'     => 'senior',
				'vacancies'            => 2,
				'application_deadline' => gmdate( 'Y-m-d', strtotime( '+30 days' ) ),
				'apply_url'            => '#',
				'apply_email'          => '',
			],
			[
				'id'                   => -2,
				'title'                => __( 'Frontend Engineer', 'jobplace' ),
				'slug'                 => 'frontend-engineer',
				'location'             => __( 'Milan, Italy', 'jobplace' ),
				'is_remote'            => false,
				'is_featured'          => false,
				'is_negotiable'        => true,
				'is_active'            => true,
				'description'          => __( 'Ship accessible React and WordPress block editor experiences.', 'jobplace' ),
				'company'              => [
					'id'         => 2,
					'name'       => __( 'Design Studio', 'jobplace' ),
					'avatar_url' => '',
				],
				'company_id'           => 2,
				'job_type'             => [
					'id'   => 2,
					'name' => __( 'Contract', 'jobplace' ),
					'slug' => 'contract',
				],
				'job_type_id'          => 2,
				'job_category'         => [
					'id'   => 2,
					'name' => __( 'Design', 'jobplace' ),
					'slug' => 'design',
				],
				'job_category_id'      => 2,
				'salary_min'           => 45000,
				'salary_max'           => 65000,
				'salary_currency'      => 'EUR',
				'salary_period'        => 'yearly',
				'experience_level'     => 'mid',
				'vacancies'            => 1,
				'application_deadline' => gmdate( 'Y-m-d', strtotime( '+45 days' ) ),
				'apply_url'            => '#',
				'apply_email'          => '',
			],
			[
				'id'                   => -3,
				'title'                => __( 'Marketing Coordinator', 'jobplace' ),
				'slug'                 => 'marketing-coordinator',
				'location'             => __( 'Rome, Italy', 'jobplace' ),
				'is_remote'            => true,
				'is_featured'          => false,
				'is_negotiable'        => false,
				'is_active'            => true,
				'description'          => __( 'Plan campaigns, write copy, and coordinate launches across channels.', 'jobplace' ),
				'company'              => [
					'id'         => 3,
					'name'       => __( 'Growth Labs', 'jobplace' ),
					'avatar_url' => '',
				],
				'company_id'           => 3,
				'job_type'             => [
					'id'   => 3,
					'name' => __( 'Part-time', 'jobplace' ),
					'slug' => 'part-time',
				],
				'job_type_id'          => 3,
				'job_category'         => [
					'id'   => 3,
					'name' => __( 'Marketing', 'jobplace' ),
					'slug' => 'marketing',
				],
				'job_category_id'      => 3,
				'salary_min'           => 28000,
				'salary_max'           => 36000,
				'salary_currency'      => 'EUR',
				'salary_period'        => 'yearly',
				'experience_level'     => 'entry',
				'vacancies'            => 1,
				'application_deadline' => gmdate( 'Y-m-d', strtotime( '+21 days' ) ),
				'apply_url'            => '#',
				'apply_email'          => '',
			],
			[
				'id'                   => -4,
				'title'                => __( 'DevOps Engineer', 'jobplace' ),
				'slug'                 => 'devops-engineer',
				'location'             => __( 'Berlin, Germany', 'jobplace' ),
				'is_remote'            => true,
				'is_featured'          => true,
				'is_negotiable'        => false,
				'is_active'            => true,
				'description'          => __( 'Maintain CI/CD pipelines, cloud infrastructure, and deployment tooling.', 'jobplace' ),
				'company'              => [
					'id'         => 4,
					'name'       => __( 'Cloud Nine', 'jobplace' ),
					'avatar_url' => '',
				],
				'company_id'           => 4,
				'job_type'             => [
					'id'   => 1,
					'name' => __( 'Full-time', 'jobplace' ),
					'slug' => 'full-time',
				],
				'job_type_id'          => 1,
				'job_category'         => [
					'id'   => 4,
					'name' => __( 'Infrastructure', 'jobplace' ),
					'slug' => 'infrastructure',
				],
				'job_category_id'      => 4,
				'salary_min'           => 70000,
				'salary_max'           => 95000,
				'salary_currency'      => 'EUR',
				'salary_period'        => 'yearly',
				'experience_level'     => 'senior',
				'vacancies'            => 3,
				'application_deadline' => gmdate( 'Y-m-d', strtotime( '+60 days' ) ),
				'apply_url'            => '#',
				'apply_email'          => '',
			],
			[
				'id'                   => -5,
				'title'                => __( 'Customer Support Specialist', 'jobplace' ),
				'slug'                 => 'customer-support-specialist',
				'location'             => __( 'Naples, Italy', 'jobplace' ),
				'is_remote'            => false,
				'is_featured'          => false,
				'is_negotiable'        => true,
				'is_active'            => true,
				'description'          => __( 'Help customers by email and chat, troubleshoot issues, and document solutions.', 'jobplace' ),
				'company'              => [
					'id'         => 2,
					'name'       => __( 'Design Studio', 'jobplace' ),
					'avatar_url' => '',
				],
				'company_id'           => 2,
				'job_type'             => [
					'id'   => 3,
					'name' => __( 'Part-time', 'jobplace' ),
					'slug' => 'part-time',
				],
				'job_type_id'          => 3,
				'job_category'         => [
					'id'   => 5,
					'name' => __( 'Support', 'jobplace' ),
					'slug' => 'support',
				],
				'job_category_id'      => 5,
				'salary_min'           => 22000,
				'salary_max'           => 28000,
				'salary_currency'      => 'EUR',
				'salary_period'        => 'yearly',
				'experience_level'     => 'entry',
				'vacancies'            => 2,
				'application_deadline' => gmdate( 'Y-m-d', strtotime( '+14 days' ) ),
				'apply_url'            => '#',
				'apply_email'          => '',
			],
		];

		foreach ( $jobs as $index => $job ) {
			$jobs[ $index ]['permalink'] = PermalinkService::get_job_url( $job['slug'] );
		}

		return $jobs;
	}

	/**
	 * Fetch real jobs for editor preview.
	 *
	 * @param array $query Query attributes from the block.
	 * @return array<int, array>
	 */
	public static function get_preview_jobs( array $query = [] ): array {
		$query = wp_parse_args( $query, self::default_query() );

		$args = JobsQuery::get_query_args( [ 'query' => $query ] );
		$jobs = wp_react_kit()->jobs->all( $args );
		$items = [];

		foreach ( $jobs as $job ) {
			$items[] = Job::to_array( $job );
		}

		return $items;
	}

	/**
	 * Resolve preview jobs for the editor (real first, placeholders as fallback).
	 *
	 * @param array $query Query attributes from the block.
	 * @return array{jobs: array<int, array>, total: int, usingPlaceholders: bool}
	 */
	public static function resolve_preview( array $query = [] ): array {
		$query    = wp_parse_args( $query, self::default_query() );
		$per_page = max( 1, (int) ( $query['perPage'] ?? 3 ) );
		$pool_query = array_merge( $query, [ 'perPage' => max( $per_page, 6 ) ] );
		$real_jobs  = self::get_preview_jobs( $pool_query );

		if ( ! empty( $real_jobs ) ) {
			$count_args          = JobsQuery::get_query_args( [ 'query' => $query ] );
			$count_args['count'] = 1;
			$total               = (int) wp_react_kit()->jobs->all( $count_args );

			return [
				'jobs'              => array_slice( $real_jobs, 0, $per_page ),
				'total'             => $total,
				'usingPlaceholders' => false,
			];
		}

		$placeholders = self::get_placeholder_jobs();

		return [
			'jobs'              => array_slice( $placeholders, 0, $per_page ),
			'total'             => count( $placeholders ),
			'usingPlaceholders' => true,
		];
	}

	/**
	 * Data passed to the block editor via window.jobPlaceBlockData.
	 *
	 * @return array
	 */
	public static function get_editor_settings(): array {
		$preview = self::resolve_preview( self::default_query() );

		return [
			'previewJobs'       => $preview['jobs'],
			'previewPool'       => $preview['usingPlaceholders']
				? self::get_placeholder_jobs()
				: self::get_preview_jobs( array_merge( self::default_query(), [ 'perPage' => 12 ] ) ),
			'previewTotal'      => $preview['total'],
			'usingPlaceholders' => $preview['usingPlaceholders'],
			'placeholderJobs'   => self::get_placeholder_jobs(),
			'defaultQuery'      => self::default_query(),
			'jobTypes'          => self::get_job_type_options(),
			'jobCategories'     => self::get_job_category_options(),
			'companies'         => self::get_company_options(),
			'experienceLevels'  => self::get_experience_level_options(),
		];
	}

	/**
	 * Job type options for editor filters.
	 *
	 * @return array<int, array{label: string, value: string}>
	 */
	public static function get_job_type_options(): array {
		$job_type = new \Akash\JobPlace\Jobs\JobType();
		$rows     = $job_type->all( [ 'per_page' => 100 ] );
		$options  = [];

		foreach ( $rows as $row ) {
			$options[] = [
				'label' => $row->name,
				'value' => (string) $row->id,
			];
		}

		return $options;
	}

	/**
	 * Job category options for editor filters.
	 *
	 * @return array<int, array{label: string, value: string}>
	 */
	public static function get_job_category_options(): array {
		$job_category = new \Akash\JobPlace\Jobs\JobCategory();
		$rows         = $job_category->all( [ 'per_page' => 100 ] );
		$options      = [];

		foreach ( $rows as $row ) {
			$options[] = [
				'label' => $row->name,
				'value' => (string) $row->id,
			];
		}

		return $options;
	}

	/**
	 * Company options for editor filters.
	 *
	 * @return array<int, array{label: string, value: string}>
	 */
	public static function get_company_options(): array {
		$rows    = wp_react_kit()->companies->all( [ 'per_page' => 100 ] );
		$options = [];

		foreach ( $rows as $row ) {
			$options[] = [
				'label' => $row->name,
				'value' => (string) $row->id,
			];
		}

		return $options;
	}

	/**
	 * Experience level options for editor filters.
	 *
	 * @return array<int, array{label: string, value: string}>
	 */
	public static function get_experience_level_options(): array {
		return [
			[ 'label' => __( 'Entry level', 'jobplace' ), 'value' => 'entry' ],
			[ 'label' => __( 'Mid level', 'jobplace' ), 'value' => 'mid' ],
			[ 'label' => __( 'Senior level', 'jobplace' ), 'value' => 'senior' ],
			[ 'label' => __( 'Lead', 'jobplace' ), 'value' => 'lead' ],
		];
	}
}
