<?php

namespace Akash\JobPlace\Jobs;

use Akash\JobPlace\Abstracts\BaseModel;

/**
 * Company class.
 *
 * @since 0.14.0
 */
class Company extends BaseModel {

    /**
     * Table Name.
     *
     * @var string
     */
    protected $table = 'jobplace_companies';

    /**
     * Prepare datasets for database operation.
     *
     * @since 0.14.0
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
            'email'       => '',
            'website'     => '',
            'description' => '',
            'avatar_url'  => '',
            'created_at'  => $now,
            'updated_at'  => $now,
        ];

        $data = wp_parse_args( $data, $defaults );

        $prepared = [
            'name'        => $this->sanitize( $data['name'], 'text' ),
            'slug'        => $this->sanitize( $data['slug'], 'text' ),
            'email'       => $this->sanitize( $data['email'], 'email' ),
            'website'     => $this->sanitize( $data['website'], 'url' ),
            'description' => $this->sanitize( $data['description'], 'text' ),
            'avatar_url'  => $this->sanitize( $data['avatar_url'], 'url' ),
            'updated_at'  => $this->sanitize( $data['updated_at'], 'text' ),
        ];

        if ( $is_create ) {
            $prepared['created_at'] = $this->sanitize( $data['created_at'], 'text' );
        }

        return $prepared;
    }

    /**
     * Company item to a formatted array.
     *
     * @since 0.14.0
     *
     * @param object $company Company row.
     *
     * @return array
     */
    public static function to_array( object $company ): array {
        return [
            'id'          => (int) $company->id,
            'name'        => $company->name,
            'slug'        => $company->slug,
            'email'       => $company->email,
            'website'     => $company->website,
            'description' => $company->description,
            'avatar_url'  => $company->avatar_url,
            'created_at'  => $company->created_at,
            'updated_at'  => $company->updated_at,
        ];
    }
}
