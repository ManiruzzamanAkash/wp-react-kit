<?php

namespace Akash\JobPlace\REST;

/**
 * API Manager class.
 *
 * All API classes would be registered here.
 *
 * @since 0.3.0
 */
class Api {

    /**
     * Class dir and class name mapping.
     *
     * @var array
     *
     * @since 0.3.0
     */
    protected $class_map;

    /**
     * Constructor.
     */
    public function __construct() {
        if ( ! class_exists( 'WP_REST_Server' ) ) {
            return;
        }

        $this->class_map = apply_filters(
            'jobplace_rest_api_class_map',
            [
                \Akash\JobPlace\REST\JobTypesController::class,
                \Akash\JobPlace\REST\JobsController::class,
                \Akash\JobPlace\REST\CompaniesController::class,
            ]
        );

        // Init REST API routes.
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 10 );
    }

    /**
     * Register REST API routes.
     *
     * @since 0.3.0
     *
     * @return void
     */
    public function register_rest_routes(): void {
        foreach ( $this->class_map as $controller ) {
            $this->$controller = new $controller();
            $this->$controller->register_routes();
        }
    }
}
