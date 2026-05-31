<?php

namespace Akash\JobPlace\REST;

use Akash\JobPlace\Abstracts\RESTController;
use Akash\JobPlace\Jobs\Company;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;

/**
 * API CompaniesController class.
 *
 * @since 0.5.0
 * @since 0.14.0 Full CRUD for the companies table.
 */
class CompaniesController extends RESTController {

    /**
     * Route base.
     *
     * @var string
     */
    protected $base = 'companies';

    /**
     * Register all routes related with companies.
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->base . '/stats',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_stats' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base . '/dropdown',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items_dropdown' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base . '/',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                    'args'                => $this->get_collection_params(),
                    'schema'              => [ $this, 'get_item_schema' ],
                ],
                [
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_item' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                    'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
                ],
                [
                    'methods'             => WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_items' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                    'args'                => [
                        'ids' => [
                            'type'        => 'array',
                            'default'     => [],
                            'description' => __( 'Company IDs which will be deleted.', 'jobplace' ),
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base . '/(?P<id>[\d]+)',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_item' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                    'args'                => [
                        'id' => [
                            'description' => __( 'Unique identifier for the company.', 'jobplace' ),
                            'type'        => 'integer',
                        ],
                    ],
                ],
                [
                    'methods'             => WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_item' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                    'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
                ],
            ]
        );
    }

    /**
     * Retrieve aggregated company statistics.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response
     */
    public function get_stats( $request ): WP_REST_Response {
        return rest_ensure_response(
            [
                'total' => wp_react_kit()->companies->all( [ 'count' => true ] ),
            ]
        );
    }

    /**
     * Retrieves a collection of companies for dropdowns.
     *
     * @since 0.5.0
     * @since 0.14.0 Reads from the companies table.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function get_items_dropdown( $request ): WP_REST_Response {
        $companies = wp_react_kit()->companies->all(
            [
                'per_page' => 100,
                'page'     => 1,
                'orderby'  => 'name',
                'order'    => 'ASC',
            ]
        );

        $data = [];

        foreach ( $companies as $company ) {
            $data[] = [
                'id'    => (int) $company->id,
                'name'  => $company->name,
                'email' => $company->email,
                'slug'  => $company->slug,
            ];
        }

        return rest_ensure_response( $data );
    }

    /**
     * Retrieves a collection of company items.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function get_items( $request ) {
        $args   = [];
        $data   = [];
        $params = $this->get_collection_params();

        foreach ( $params as $key => $value ) {
            if ( isset( $request[ $key ] ) ) {
                $args[ $key ] = $request[ $key ];
            }
        }

        $companies = wp_react_kit()->companies->all( $args );

        foreach ( $companies as $company ) {
            $response = $this->prepare_item_for_response( $company, $request );
            $data[]   = $this->prepare_response_for_collection( $response );
        }

        $args['count'] = 1;
        $total         = wp_react_kit()->companies->all( $args );
        $per_page      = ! empty( $args['per_page'] ) ? (int) $args['per_page'] : 10;
        $max_pages     = $per_page > 0 ? ceil( $total / $per_page ) : 0;
        $response      = rest_ensure_response( $data );

        $response->header( 'X-WP-Total', (int) $total );
        $response->header( 'X-WP-TotalPages', (int) $max_pages );

        return $response;
    }

    /**
     * Retrieves a single company.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function get_item( $request ) {
        $company = wp_react_kit()->companies->get(
            [
                'key'   => 'id',
                'value' => absint( $request['id'] ),
            ]
        );

        if ( ! $company ) {
            return new WP_Error(
                'jobplace_rest_company_not_found',
                __( 'Company not found.', 'jobplace' ),
                [ 'status' => 404 ]
            );
        }

        $company = $this->prepare_item_for_response( $company, $request );

        return rest_ensure_response( $company );
    }

    /**
     * Create a company.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function create_item( $request ) {
        if ( ! empty( $request['id'] ) ) {
            return new WP_Error(
                'jobplace_rest_company_exists',
                __( 'Cannot create an existing company.', 'jobplace' ),
                [ 'status' => 400 ]
            );
        }

        $prepared_data = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $prepared_data ) ) {
            return $prepared_data;
        }

        $company_id = wp_react_kit()->companies->create( $prepared_data );

        if ( is_wp_error( $company_id ) ) {
            return $company_id;
        }

        $company = wp_react_kit()->companies->get(
            [
                'key'   => 'id',
                'value' => $company_id,
            ]
        );

        $response = $this->prepare_item_for_response( $company, $request );
        $response = rest_ensure_response( $response );
        $response->set_status( 201 );
        $response->header(
            'Location',
            rest_url( sprintf( '%s/%s/%d', $this->namespace, $this->base, $company_id ) )
        );

        return $response;
    }

    /**
     * Update a company.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function update_item( $request ) {
        $company_id = absint( $request['id'] );

        if ( empty( $company_id ) ) {
            return new WP_Error(
                'jobplace_rest_invalid_company_id',
                __( 'Invalid company ID.', 'jobplace' ),
                [ 'status' => 400 ]
            );
        }

        $existing = wp_react_kit()->companies->get(
            [
                'key'   => 'id',
                'value' => $company_id,
            ]
        );

        if ( ! $existing ) {
            return new WP_Error(
                'jobplace_rest_company_not_found',
                __( 'Company not found.', 'jobplace' ),
                [ 'status' => 404 ]
            );
        }

        $prepared_data = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $prepared_data ) ) {
            return $prepared_data;
        }

        $updated_id = wp_react_kit()->companies->update( $prepared_data, $company_id );

        if ( is_wp_error( $updated_id ) ) {
            return $updated_id;
        }

        $company = wp_react_kit()->companies->get(
            [
                'key'   => 'id',
                'value' => $company_id,
            ]
        );

        $response = $this->prepare_item_for_response( $company, $request );

        return rest_ensure_response( $response );
    }

    /**
     * Delete one or more companies.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function delete_items( $request ) {
        if ( empty( $request['ids'] ) ) {
            return new WP_Error( 'no_ids', __( 'No company ids found.', 'jobplace' ), [ 'status' => 400 ] );
        }

        $deleted = wp_react_kit()->companies->delete( $request['ids'] );

        if ( $deleted ) {
            return rest_ensure_response(
                [
                    'message' => __( 'Companies deleted successfully.', 'jobplace' ),
                    'total'   => $deleted,
                ]
            );
        }

        return new WP_Error(
            'no_company_deleted',
            __( 'No company deleted. Please try again.', 'jobplace' ),
            [ 'status' => 400 ]
        );
    }

    /**
     * Retrieves the company schema.
     *
     * @since 0.14.0
     *
     * @return array
     */
    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'company',
            'type'       => 'object',
            'properties' => [
                'id' => [
                    'description' => __( 'ID of the company', 'jobplace' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'name' => [
                    'description' => __( 'Company name', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'required'    => true,
                    'minLength'   => 1,
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
                'slug' => [
                    'description' => __( 'Company slug', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => [ $this, 'sanitize_company_slug' ],
                    ],
                ],
                'email' => [
                    'description' => __( 'Company email', 'jobplace' ),
                    'type'        => 'string',
                    'format'      => 'email',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_email',
                    ],
                ],
                'website' => [
                    'description' => __( 'Company website', 'jobplace' ),
                    'type'        => 'string',
                    'format'      => 'uri',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => 'esc_url_raw',
                    ],
                ],
                'description' => [
                    'description' => __( 'Company description', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
                'avatar_url' => [
                    'description' => __( 'Company avatar URL', 'jobplace' ),
                    'type'        => 'string',
                    'format'      => 'uri',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => 'esc_url_raw',
                    ],
                ],
                'created_at' => [
                    'description' => __( 'Created at time', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'format'      => 'date-time',
                    'readonly'    => true,
                ],
                'updated_at' => [
                    'description' => __( 'Updated at time', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'format'      => 'date-time',
                    'readonly'    => true,
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }

    /**
     * Prepares a company for create or update.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return array|WP_Error
     */
    protected function prepare_item_for_database( $request ) {
        $data = [
            'name'        => $request['name'],
            'slug'        => $this->generate_unique_slug( $request ),
            'email'       => $request['email'] ?? '',
            'website'     => $request['website'] ?? '',
            'description' => $request['description'] ?? '',
            'avatar_url'  => $request['avatar_url'] ?? '',
        ];

        if ( empty( $request['id'] ) ) {
            $data['created_at'] = current_datetime()->format( 'Y-m-d H:i:s' );
            $data['updated_at'] = $data['created_at'];
        } else {
            $data['updated_at'] = current_datetime()->format( 'Y-m-d H:i:s' );
        }

        return $data;
    }

    /**
     * Prepares the item for the REST response.
     *
     * @since 0.14.0
     *
     * @param object          $item    Company object.
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response
     */
    public function prepare_item_for_response( $item, $request ) {
        $data = Company::to_array( $item );

        $data    = $this->prepare_response_for_collection( $data );
        $context = ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data    = $this->filter_response_by_context( $data, $context );

        $response = rest_ensure_response( $data );
        $response->add_links( $this->prepare_links( $item ) );

        return $response;
    }

    /**
     * Prepares links for the request.
     *
     * @since 0.14.0
     *
     * @param object $item Item object.
     *
     * @return array
     */
    protected function prepare_links( $item ): array {
        $base = sprintf( '%s/%s', $this->namespace, $this->base );
        $id   = is_object( $item ) ? $item->id : $item['id'];

        return [
            'self'       => [
                'href' => rest_url( trailingslashit( $base ) . $id ),
            ],
            'collection' => [
                'href' => rest_url( $base ),
            ],
        ];
    }

    /**
     * Sanitize company slug for uniqueness.
     *
     * @since 0.14.0
     *
     * @param string          $slug    Slug value.
     * @param WP_REST_Request $request Request object.
     *
     * @return string|WP_Error
     */
    public function sanitize_company_slug( $slug, $request ) {
        global $wpdb;

        $slug = sanitize_title( $slug );
        $id   = isset( $request['id'] ) ? absint( $request['id'] ) : 0;
        $args = [ 'count' => 1 ];

        if ( ! empty( $id ) ) {
            $args['where'][] = $wpdb->prepare( 'id != %d AND slug = %s', $id, $slug );
        } else {
            $args['where'][] = $wpdb->prepare( 'slug = %s', $slug );
        }

        $total_found = wp_react_kit()->companies->all( $args );

        if ( $total_found > 0 ) {
            return new WP_Error(
                'jobplace_rest_company_slug_exists',
                __( 'Company slug already exists.', 'jobplace' ),
                [ 'status' => 400 ]
            );
        }

        return $slug;
    }

    /**
     * Generate a unique slug when none is provided.
     *
     * @since 0.14.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return string
     */
    public function generate_unique_slug( WP_REST_Request $request ): string {
        $slug = $request['slug'] ?? '';

        if ( ! empty( $slug ) ) {
            return sanitize_title( $slug );
        }

        $slug = sanitize_title( $request['name'] ?? '' );

        if ( empty( $slug ) ) {
            return '';
        }

        $existing = wp_react_kit()->companies->get(
            [
                'key'   => 'slug',
                'value' => $slug,
            ]
        );

        if ( empty( $existing ) ) {
            return $slug;
        }

        return $this->generate_beautiful_slug( $slug );
    }

    /**
     * Generate a unique slug by appending a numeric suffix.
     *
     * @since 0.14.0
     *
     * @param string $slug Base slug.
     * @param int    $i    Suffix counter.
     *
     * @return string
     */
    public function generate_beautiful_slug( string $slug = '', int $i = 1 ): string {
        $new_slug = $slug . '-' . $i;
        $existing = wp_react_kit()->companies->get(
            [
                'key'   => 'slug',
                'value' => $new_slug,
            ]
        );

        if ( empty( $existing ) ) {
            return $new_slug;
        }

        return $this->generate_beautiful_slug( $slug, $i + 1 );
    }

    /**
     * Retrieves the query params for collections.
     *
     * @since 0.14.0
     *
     * @return array
     */
    public function get_collection_params(): array {
        $params = parent::get_collection_params();

        $params['per_page']['default'] = 10;
        $params['search']['default']   = '';
        $params['orderby']['default']  = 'id';
        $params['order']['default']    = 'DESC';

        return $params;
    }
}
