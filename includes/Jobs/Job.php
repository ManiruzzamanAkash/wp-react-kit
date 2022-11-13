<?php

namespace Akash\JobPlace\Jobs;

use Akash\JobPlace\Abstracts\BaseModel;

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
            'title'       => '',
            'slug'        => '',
            'description' => '',
            'company_id'  => 0,
            'is_active'   => 1,
            'job_type_id' => null,
            'created_by'  => get_current_user_id(),
            'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
        ];

        $data = wp_parse_args( $data, $defaults );

        // Sanitize template data
        return [
            'title'       => $this->sanitize( $data['title'], 'text' ),
            'slug'        => $this->sanitize( $data['slug'], 'text' ),
            'description' => $this->sanitize( $data['description'], 'block' ),
            'company_id'  => $this->sanitize( $data['company_id'], 'number' ),
            'is_active'   => $this->sanitize( $data['is_active'], 'switch' ),
            'job_type_id' => $this->sanitize( $data['job_type_id'], 'number' ),
            'created_by'  => $this->sanitize( $data['created_by'], 'number' ),
            'created_at'  => $this->sanitize( $data['created_at'], 'text' ),
            'updated_at'  => $this->sanitize( $data['updated_at'], 'text' ),
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
        $job_type = static::get_job_type( $job );

        $data = [
            'id'          => (int) $job->id,
            'title'       => $job->title,
            'slug'        => $job->slug,
            'job_type'    => $job_type,
            'is_remote'   => static::get_is_remote( $job_type ),
            'status'      => JobStatus::get_status_by_job( $job ),
            'company'     => static::get_job_company( $job ),
            'description' => $job->description,
            'created_at'  => $job->created_at,
            'updated_at'  => $job->updated_at,
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

        $user = get_user_by( 'id', $job->company_id );

        if ( empty( $user ) ) {
            return null;
        }

        return [
            'id'         => $job->company_id,
            'name'       => $user->display_name,
            'avatar_url' => get_avatar_url( $user->ID ),
        ];
    }
}
