<?php

namespace Akash\JobPlace\REST;

/**
 * API Manager class.
 *
 * All API classes would be registered here.
 *
 * @since 0.3.0
 */
class Manager {

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
                JOB_PLACE_DIR . '/includes/REST/JobTypesController.php' => 'Akash\JobPlace\REST\JobTypesController',
                JOB_PLACE_DIR . '/includes/REST/JobsController.php' => 'Akash\JobPlace\REST\JobsController',
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
        foreach ( $this->class_map as $file_name => $controller ) {
            require_once $file_name;
            $this->$controller = new $controller();
            $this->$controller->register_routes();
        }
    }
}
