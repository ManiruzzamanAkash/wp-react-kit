<?php

namespace Akash\JobPlace\Jobs;

/**
 * Company manager.
 *
 * @since 0.14.0
 */
class CompanyManager {

    /**
     * Company model.
     *
     * @var Company
     */
    public $company;

    /**
     * Constructor.
     */
    public function __construct() {
        $this->company = new Company();
    }

    /**
     * Get all companies by criteria.
     *
     * @since 0.14.0
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
            $args['where'][] = $wpdb->prepare(
                ' name LIKE %s OR email LIKE %s OR description LIKE %s ',
                $like,
                $like,
                $like
            );
        }

        if ( ! empty( $args['where'] ) ) {
            $args['where'] = ' WHERE ' . implode( ' AND ', $args['where'] );
        } else {
            $args['where'] = '';
        }

        $companies = $this->company->all( $args );

        if ( $args['count'] ) {
            return (int) $companies;
        }

        return $companies;
    }

    /**
     * Get a single company.
     *
     * @since 0.14.0
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

        return $this->company->get_by( $args['key'], $args['value'] );
    }

    /**
     * Create a company.
     *
     * @since 0.14.0
     *
     * @param array $data Company data.
     *
     * @return int|\WP_Error
     */
    public function create( array $data ) {
        $company_data = $this->company->prepare_for_database( $data );

        $company_id = $this->company->create(
            $company_data,
            [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ]
        );

        if ( ! $company_id ) {
            return new \WP_Error( 'jobplace_company_create_failed', __( 'Failed to create company.', 'jobplace' ) );
        }

        do_action( 'jobplace_company_created', $company_id, $company_data );

        return $company_id;
    }

    /**
     * Update a company.
     *
     * @since 0.14.0
     *
     * @param array $data Company data.
     * @param int   $company_id Company ID.
     *
     * @return int|\WP_Error
     */
    public function update( array $data, int $company_id ) {
        $company_data = $this->company->prepare_for_database( $data, false );

        $updated = $this->company->update(
            $company_data,
            [ 'id' => $company_id ],
            [ '%s', '%s', '%s', '%s', '%s', '%s', '%s' ],
            [ '%d' ]
        );

        if ( false === $updated ) {
            return new \WP_Error( 'jobplace_company_update_failed', __( 'Failed to update company.', 'jobplace' ) );
        }

        do_action( 'jobplace_company_updated', $company_id, $company_data );

        return $company_id;
    }

    /**
     * Delete one or more companies.
     *
     * @since 0.14.0
     *
     * @param array|int $company_ids Company ID(s).
     *
     * @return int|\WP_Error
     */
    public function delete( $company_ids ) {
        if ( is_array( $company_ids ) ) {
            $company_ids = array_map( 'absint', $company_ids );
        } else {
            $company_ids = [ absint( $company_ids ) ];
        }

        try {
            $this->company->query( 'START TRANSACTION' );

            $total_deleted = 0;
            foreach ( $company_ids as $company_id ) {
                $deleted = $this->company->delete(
                    [ 'id' => $company_id ],
                    [ '%d' ]
                );

                if ( $deleted ) {
                    $total_deleted += (int) $deleted;
                }

                do_action( 'jobplace_company_deleted', $company_id );
            }

            $this->company->query( 'COMMIT' );

            return $total_deleted;
        } catch ( \Exception $e ) {
            $this->company->query( 'ROLLBACK' );

            return new \WP_Error( 'jobplace-company-delete-error', $e->getMessage() );
        }
    }
}
