<?php

namespace Akash\JobPlace\Jobs;

use Akash\JobPlace\Abstracts\BaseModel;

/**
 * JobCategory class.
 *
 * @since 0.13.0
 */
class JobCategory extends BaseModel {

    /**
     * Table Name.
     *
     * @var string
     */
    protected $table = 'jobplace_job_categories';

    /**
     * Prepare datasets for database operation.
     *
     * @since 0.13.0
     *
     * @param array $data Request data.
     * @param bool  $is_create Whether this is a create operation.
     *
     * @return array
     */
    public function prepare_for_database( array $data, bool $is_create = true ): array {
        $now = current_datetime()->format( 'Y-m-d H:i:s' );

        $defaults = [
            'name'        => '',
            'slug'        => '',
            'description' => '',
            'created_at'  => $now,
            'updated_at'  => $now,
        ];

        $data = wp_parse_args( $data, $defaults );

        $prepared = [
            'name'        => $this->sanitize( $data['name'], 'text' ),
            'slug'        => $this->sanitize( $data['slug'], 'text' ),
            'description' => $this->sanitize( $data['description'], 'text' ),
            'updated_at'  => $this->sanitize( $data['updated_at'], 'text' ),
        ];

        if ( $is_create ) {
            $prepared['created_at'] = $this->sanitize( $data['created_at'], 'text' );
        }

        return $prepared;
    }

    /**
     * Job categories item to a formatted array.
     *
     * @since 0.13.0
     *
     * @param object $job_category
     *
     * @return array
     */
    public static function to_array( object $job_category ): array {
        return [
            'id'          => (int) $job_category->id,
            'name'        => $job_category->name,
            'slug'        => $job_category->slug,
            'description' => $job_category->description,
            'created_at'  => $job_category->created_at,
            'updated_at'  => $job_category->updated_at,
        ];
    }
}
