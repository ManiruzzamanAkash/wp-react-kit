<?php

namespace Akash\JobPlace\REST;

use Akash\JobPlace\Abstracts\RESTController;
use Akash\JobPlace\Jobs\JobCategory;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;

/**
 * API JobCategoriesController class.
 *
 * @since 0.13.0
 */
class JobCategoriesController extends RESTController {

    /**
     * Route base.
     *
     * @var string
     */
    protected $base = 'job-categories';

    /**
     * Register all routes related with job categories.
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
                            'description' => __( 'Category IDs which will be deleted.', 'jobplace' ),
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
                            'description' => __( 'Unique identifier for the job category.', 'jobplace' ),
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
     * Retrieve aggregated job category statistics.
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
                'total' => wp_react_kit()->job_categories->all( [ 'count' => true ] ),
            ]
        );
    }

    /**
     * Retrieves a collection of job category items.
     *
     * @since 0.13.0
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

        $categories = wp_react_kit()->job_categories->all( $args );

        foreach ( $categories as $category ) {
            $response = $this->prepare_item_for_response( $category, $request );
            $data[]   = $this->prepare_response_for_collection( $response );
        }

        $args['count'] = 1;
        $total         = wp_react_kit()->job_categories->all( $args );
        $per_page      = ! empty( $args['per_page'] ) ? (int) $args['per_page'] : 10;
        $max_pages     = $per_page > 0 ? ceil( $total / $per_page ) : 0;
        $response      = rest_ensure_response( $data );

        $response->header( 'X-WP-Total', (int) $total );
        $response->header( 'X-WP-TotalPages', (int) $max_pages );

        return $response;
    }

    /**
     * Retrieves a single job category.
     *
     * @since 0.13.0
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function get_item( $request ) {
        $category = wp_react_kit()->job_categories->get(
            [
                'key'   => 'id',
                'value' => absint( $request['id'] ),
            ]
        );

        if ( ! $category ) {
            return new WP_Error(
                'jobplace_rest_job_category_not_found',
                __( 'Job category not found.', 'jobplace' ),
                [ 'status' => 404 ]
            );
        }

        $category = $this->prepare_item_for_response( $category, $request );

        return rest_ensure_response( $category );
    }

    /**
     * Create a job category.
     *
     * @since 0.13.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function create_item( $request ) {
        if ( ! empty( $request['id'] ) ) {
            return new WP_Error(
                'jobplace_rest_job_category_exists',
                __( 'Cannot create an existing job category.', 'jobplace' ),
                [ 'status' => 400 ]
            );
        }

        $prepared_data = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $prepared_data ) ) {
            return $prepared_data;
        }

        $category_id = wp_react_kit()->job_categories->create( $prepared_data );

        if ( is_wp_error( $category_id ) ) {
            return $category_id;
        }

        $category = wp_react_kit()->job_categories->get(
            [
                'key'   => 'id',
                'value' => $category_id,
            ]
        );

        $response = $this->prepare_item_for_response( $category, $request );
        $response = rest_ensure_response( $response );
        $response->set_status( 201 );
        $response->header(
            'Location',
            rest_url( sprintf( '%s/%s/%d', $this->namespace, $this->base, $category_id ) )
        );

        return $response;
    }

    /**
     * Update a job category.
     *
     * @since 0.13.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function update_item( $request ) {
        $category_id = absint( $request['id'] );

        if ( empty( $category_id ) ) {
            return new WP_Error(
                'jobplace_rest_invalid_job_category_id',
                __( 'Invalid job category ID.', 'jobplace' ),
                [ 'status' => 400 ]
            );
        }

        $existing = wp_react_kit()->job_categories->get(
            [
                'key'   => 'id',
                'value' => $category_id,
            ]
        );

        if ( ! $existing ) {
            return new WP_Error(
                'jobplace_rest_job_category_not_found',
                __( 'Job category not found.', 'jobplace' ),
                [ 'status' => 404 ]
            );
        }

        $prepared_data = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $prepared_data ) ) {
            return $prepared_data;
        }

        $updated_id = wp_react_kit()->job_categories->update( $prepared_data, $category_id );

        if ( is_wp_error( $updated_id ) ) {
            return $updated_id;
        }

        $category = wp_react_kit()->job_categories->get(
            [
                'key'   => 'id',
                'value' => $category_id,
            ]
        );

        $response = $this->prepare_item_for_response( $category, $request );

        return rest_ensure_response( $response );
    }

    /**
     * Delete one or more job categories.
     *
     * @since 0.13.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function delete_items( $request ) {
        if ( empty( $request['ids'] ) ) {
            return new WP_Error( 'no_ids', __( 'No category ids found.', 'jobplace' ), [ 'status' => 400 ] );
        }

        $deleted = wp_react_kit()->job_categories->delete( $request['ids'] );

        if ( $deleted ) {
            return rest_ensure_response(
                [
                    'message' => __( 'Job categories deleted successfully.', 'jobplace' ),
                    'total'   => $deleted,
                ]
            );
        }

        return new WP_Error(
            'no_job_category_deleted',
            __( 'No job category deleted. Please try again.', 'jobplace' ),
            [ 'status' => 400 ]
        );
    }

    /**
     * Retrieves the job category schema.
     *
     * @since 0.13.0
     *
     * @return array
     */
    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'job_category',
            'type'       => 'object',
            'properties' => [
                'id' => [
                    'description' => __( 'ID of the job category', 'jobplace' ),
                    'type'        => 'integer',
                    'context'     => [ 'view', 'edit' ],
                    'readonly'    => true,
                ],
                'name' => [
                    'description' => __( 'Category name', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'required'    => true,
                    'minLength'   => 1,
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
                'slug' => [
                    'description' => __( 'Category slug', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => [ $this, 'sanitize_category_slug' ],
                    ],
                ],
                'description' => [
                    'description' => __( 'Category description', 'jobplace' ),
                    'type'        => 'string',
                    'context'     => [ 'view', 'edit' ],
                    'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
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
     * Prepares a job category for create or update.
     *
     * @since 0.13.0
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return array|WP_Error
     */
    protected function prepare_item_for_database( $request ) {
        $data = [
            'name'        => $request['name'],
            'slug'        => $this->generate_unique_slug( $request ),
            'description' => $request['description'] ?? '',
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
     * @since 0.13.0
     *
     * @param object          $item    Category object.
     * @param WP_REST_Request $request Request object.
     *
     * @return WP_REST_Response
     */
    public function prepare_item_for_response( $item, $request ) {
        $data = JobCategory::to_array( $item );

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
     * @since 0.13.0
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
     * Sanitize category slug for uniqueness.
     *
     * @since 0.13.0
     *
     * @param string          $slug    Slug value.
     * @param WP_REST_Request $request Request object.
     *
     * @return string|WP_Error
     */
    public function sanitize_category_slug( $slug, $request ) {
        global $wpdb;

        $slug = sanitize_title( $slug );
        $id   = isset( $request['id'] ) ? absint( $request['id'] ) : 0;
        $args = [ 'count' => 1 ];

        if ( ! empty( $id ) ) {
            $args['where'][] = $wpdb->prepare( 'id != %d AND slug = %s', $id, $slug );
        } else {
            $args['where'][] = $wpdb->prepare( 'slug = %s', $slug );
        }

        $total_found = wp_react_kit()->job_categories->all( $args );

        if ( $total_found > 0 ) {
            return new WP_Error(
                'jobplace_rest_category_slug_exists',
                __( 'Category slug already exists.', 'jobplace' ),
                [ 'status' => 400 ]
            );
        }

        return $slug;
    }

    /**
     * Generate a unique slug when none is provided.
     *
     * @since 0.13.0
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

        $existing = wp_react_kit()->job_categories->get(
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
     * @since 0.13.0
     *
     * @param string $slug Base slug.
     * @param int    $i    Suffix counter.
     *
     * @return string
     */
    public function generate_beautiful_slug( string $slug = '', int $i = 1 ): string {
        $new_slug   = $slug . '-' . $i;
        $existing   = wp_react_kit()->job_categories->get(
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
     * @since 0.13.0
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
