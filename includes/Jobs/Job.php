<?php

namespace Akash\JobPlace\Jobs;

use Akash\JobPlace\Abstracts\BaseModel;
use Akash\JobPlace\Routing\PermalinkService;

/**
 * Job class.
 *
 * @since 0.3.0
 */
class Job extends BaseModel {

    /**
     * Table Name.
     *
     * @var string
     */
    protected $table = 'jobplace_jobs';

    /**
     * Prepare datasets for database operation.
     *
     * @since 0.3.0
     *
     * @param array $request
     * @return array
     */
    public function prepare_for_database( array $data ): array {
        $defaults = [
            'title'                => '',
            'slug'                 => '',
            'description'          => '',
            'company_id'           => 0,
            'is_active'            => 1,
            'job_type_id'          => null,
            'location'             => '',
            'is_remote'            => 0,
            'category'             => '',
            'job_category_id'      => null,
            'experience_level'     => '',
            'vacancies'            => 1,
            'salary_min'           => null,
            'salary_max'           => null,
            'salary_currency'      => 'USD',
            'salary_period'        => 'yearly',
            'is_negotiable'        => 0,
            'application_deadline' => null,
            'apply_url'            => '',
            'apply_email'          => '',
            'is_featured'          => 0,
            'created_by'           => get_current_user_id(),
            'created_at'           => current_datetime()->format( 'Y-m-d H:i:s' ),
            'updated_at'           => current_datetime()->format( 'Y-m-d H:i:s' ),
        ];

        $data = wp_parse_args( $data, $defaults );

        // Sanitize template data. NOTE: keep the first 9 keys in this exact
        // order — Jobs\Manager maps them to a positional $wpdb format array.
        return [
            'title'                => $this->sanitize( $data['title'], 'text' ),
            'slug'                 => $this->sanitize( $data['slug'], 'text' ),
            'description'          => $this->sanitize( $data['description'], 'block' ),
            'company_id'           => $this->sanitize( $data['company_id'], 'number' ),
            'is_active'            => $this->sanitize( $data['is_active'], 'switch' ),
            'job_type_id'          => $this->sanitize( $data['job_type_id'], 'number' ),
            'created_by'           => $this->sanitize( $data['created_by'], 'number' ),
            'created_at'           => $this->sanitize( $data['created_at'], 'text' ),
            'updated_at'           => $this->sanitize( $data['updated_at'], 'text' ),
            'location'             => $this->sanitize( $data['location'], 'text' ),
            'is_remote'            => $this->sanitize( $data['is_remote'], 'switch' ),
            'category'             => $this->sanitize( $data['category'], 'text' ),
            'job_category_id'      => $this->sanitize( $data['job_category_id'], 'number' ),
            'experience_level'     => $this->sanitize( $data['experience_level'], 'text' ),
            'vacancies'            => $this->sanitize( $data['vacancies'], 'number' ),
            'salary_min'           => $this->sanitize( $data['salary_min'], 'decimal' ),
            'salary_max'           => $this->sanitize( $data['salary_max'], 'decimal' ),
            'salary_currency'      => $this->sanitize( $data['salary_currency'], 'text' ),
            'salary_period'        => $this->sanitize( $data['salary_period'], 'text' ),
            'is_negotiable'        => $this->sanitize( $data['is_negotiable'], 'switch' ),
            'application_deadline' => $this->sanitize( $data['application_deadline'], 'date' ),
            'apply_url'            => $this->sanitize( $data['apply_url'], 'url' ),
            'apply_email'          => $this->sanitize( $data['apply_email'], 'email' ),
            'is_featured'          => $this->sanitize( $data['is_featured'], 'switch' ),
        ];
    }

    /**
     * Jobs item to a formatted array.
     *
     * @since 0.3.0
     *
     * @param object $job
     *
     * @return array
     */
    public static function to_array( ?object $job ): array {
        $job_type     = static::get_job_type( $job );
        $job_category = static::get_job_category( $job );

        $data = [
            'id'                   => (int) $job->id,
            'title'                => $job->title,
            'slug'                 => $job->slug,
            'job_type'             => $job_type,
            'job_type_id'          => (int) $job->job_type_id,
            'is_remote'            => (bool) ( $job->is_remote ?? false ),
            'status'               => JobStatus::get_status_by_job( $job ),
            'company'              => static::get_job_company( $job ),
            'company_id'           => (int) $job->company_id,
            'description'          => $job->description,
            'location'             => $job->location ?? '',
            'category'             => $job->category ?? '',
            'job_category'         => $job_category,
            'job_category_id'      => (int) ( $job->job_category_id ?? 0 ),
            'experience_level'     => $job->experience_level ?? '',
            'vacancies'            => (int) ( $job->vacancies ?? 1 ),
            'salary_min'           => isset( $job->salary_min ) && null !== $job->salary_min ? (float) $job->salary_min : null,
            'salary_max'           => isset( $job->salary_max ) && null !== $job->salary_max ? (float) $job->salary_max : null,
            'salary_currency'      => $job->salary_currency ?? 'USD',
            'salary_period'        => $job->salary_period ?? 'yearly',
            'is_negotiable'        => (bool) ( $job->is_negotiable ?? false ),
            'application_deadline' => $job->application_deadline ?? null,
            'apply_url'            => $job->apply_url ?? '',
            'apply_email'          => $job->apply_email ?? '',
            'is_featured'          => (bool) ( $job->is_featured ?? false ),
            'is_active'            => (bool) ( $job->is_active ?? true ),
            'permalink'            => PermalinkService::get_job_url( $job->slug ?? '' ),
            'created_at'           => $job->created_at,
            'updated_at'           => $job->updated_at,
        ];

        return $data;
    }

    /**
     * Get job type of a job.
     *
     * @since 0.3.0
     *
     * @param object $job
     *
     * @return object|null
     */
    public static function get_job_type( ?object $job ): ?object {
        $job_type = new JobType();

        $columns = 'id, name, slug';
        return $job_type->get( (int) $job->job_type_id, $columns );
    }

    /**
     * Get job category of a job.
     *
     * @since 0.13.0
     *
     * @param object $job
     *
     * @return object|null
     */
    public static function get_job_category( ?object $job ): ?object {
        if ( empty( $job->job_category_id ) ) {
            return null;
        }

        $job_category = new JobCategory();

        $columns = 'id, name, slug';
        return $job_category->get( (int) $job->job_category_id, $columns );
    }

    /**
     * Get if job is a remote job or not.
     *
     * We'll fetch this from job_type_id.
     * If job type is for remote, then it's a remote job.
     *
     * @param object $job_type
     * @return boolean
     */
    public static function get_is_remote( ?object $job_type ): bool {
        if ( empty( $job_type ) ) {
            return false;
        }

        return $job_type->slug === 'remote';
    }

    /**
     * Get company of a job.
     *
     * @since 0.3.0
     *
     * @param object $job
     *
     * @return null | array
     */
    public static function get_job_company( ?object $job ): ?array {
        if ( empty( $job->company_id ) ) {
            return null;
        }

        $company = new Company();
        $row     = $company->get( (int) $job->company_id, 'id, name, avatar_url' );

        if ( empty( $row ) ) {
            return null;
        }

        return [
            'id'         => (int) $row->id,
            'name'       => $row->name,
            'avatar_url' => $row->avatar_url,
        ];
    }
}
