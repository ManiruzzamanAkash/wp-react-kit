<?php

namespace Akash\JobPlace\Jobs;

/**
 * Job category manager.
 *
 * @since 0.13.0
 */
class JobCategoryManager {

    /**
     * Job category model.
     *
     * @var JobCategory
     */
    public $job_category;

    /**
     * Constructor.
     */
    public function __construct() {
        $this->job_category = new JobCategory();
    }

    /**
     * Get all job categories by criteria.
     *
     * @since 0.13.0
     *
     * @param array $args Query arguments.
     *
     * @return array|int
     */
    public function all( array $args = [] ) {
        $defaults = [
            'page'     => 1,
            'per_page' => 10,
            'orderby'  => 'id',
            'order'    => 'DESC',
            'search'   => '',
            'count'    => false,
            'where'    => [],
        ];

        $args = wp_parse_args( $args, $defaults );

        if ( ! empty( $args['search'] ) ) {
            global $wpdb;
            $like            = '%' . $wpdb->esc_like( sanitize_text_field( wp_unslash( $args['search'] ) ) ) . '%';
            $args['where'][] = $wpdb->prepare( ' name LIKE %s OR description LIKE %s ', $like, $like );
        }

        if ( ! empty( $args['where'] ) ) {
            $args['where'] = ' WHERE ' . implode( ' AND ', $args['where'] );
        } else {
            $args['where'] = '';
        }

        $categories = $this->job_category->all( $args );

        if ( $args['count'] ) {
            return (int) $categories;
        }

        return $categories;
    }

    /**
     * Get a single job category.
     *
     * @since 0.13.0
     *
     * @param array $args Lookup arguments.
     *
     * @return object|null
     */
    public function get( array $args = [] ) {
        $defaults = [
            'key'   => 'id',
            'value' => '',
        ];

        $args = wp_parse_args( $args, $defaults );

        if ( empty( $args['value'] ) ) {
            return null;
        }

        return $this->job_category->get_by( $args['key'], $args['value'] );
    }

    /**
     * Create a job category.
     *
     * @since 0.13.0
     *
     * @param array $data Category data.
     *
     * @return int|\WP_Error
     */
    public function create( array $data ) {
        $category_data = $this->job_category->prepare_for_database( $data );

        $category_id = $this->job_category->create(
            $category_data,
            [ '%s', '%s', '%s', '%s', '%s' ]
        );

        if ( ! $category_id ) {
            return new \WP_Error( 'jobplace_job_category_create_failed', __( 'Failed to create job category.', 'jobplace' ) );
        }

        do_action( 'jobplace_job_category_created', $category_id, $category_data );

        return $category_id;
    }

    /**
     * Update a job category.
     *
     * @since 0.13.0
     *
     * @param array $data Category data.
     * @param int   $category_id Category ID.
     *
     * @return int|\WP_Error
     */
    public function update( array $data, int $category_id ) {
        $category_data = $this->job_category->prepare_for_database( $data, false );

        $updated = $this->job_category->update(
            $category_data,
            [ 'id' => $category_id ],
            [ '%s', '%s', '%s', '%s' ],
            [ '%d' ]
        );

        if ( false === $updated ) {
            return new \WP_Error( 'jobplace_job_category_update_failed', __( 'Failed to update job category.', 'jobplace' ) );
        }

        do_action( 'jobplace_job_category_updated', $category_id, $category_data );

        return $category_id;
    }

    /**
     * Delete one or more job categories.
     *
     * @since 0.13.0
     *
     * @param array|int $category_ids Category ID(s).
     *
     * @return int|\WP_Error
     */
    public function delete( $category_ids ) {
        if ( is_array( $category_ids ) ) {
            $category_ids = array_map( 'absint', $category_ids );
        } else {
            $category_ids = [ absint( $category_ids ) ];
        }

        try {
            $this->job_category->query( 'START TRANSACTION' );

            $total_deleted = 0;
            foreach ( $category_ids as $category_id ) {
                $deleted = $this->job_category->delete(
                    [ 'id' => $category_id ],
                    [ '%d' ]
                );

                if ( $deleted ) {
                    $total_deleted += (int) $deleted;
                }

                do_action( 'jobplace_job_category_deleted', $category_id );
            }

            $this->job_category->query( 'COMMIT' );

            return $total_deleted;
        } catch ( \Exception $e ) {
            $this->job_category->query( 'ROLLBACK' );

            return new \WP_Error( 'jobplace-job-category-delete-error', $e->getMessage() );
        }
    }
}
