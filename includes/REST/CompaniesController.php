<?php

namespace Akash\JobPlace\REST;

use Akash\JobPlace\Abstracts\RESTController;
use WP_User_Query;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;

/**
 * API CompaniesController class.
 *
 * @since JOBPLACE_SINCE
 */
class CompaniesController extends RESTController {

    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'job-place/v1';

    /**
     * Route base.
     *
     * @var string
     */
    protected $base = 'companies';

    /**
     * Register all routes related with carts.
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace, '/' . $this->base . '/dropdown//',
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items_dropdown' ],
                    'permission_callback' => [ $this, 'check_permission' ],
                ],
            ]
        );
    }

    /**
     * Retrieves a collection of companies for dropdown.
     *
     * @since JOBPLACE_SINCE
     *
     * @param WP_REST_Request $request   Full details about the request.
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_items_dropdown( $request ): ?WP_REST_Response {
        //phpcs:disable
        $query = new WP_User_Query(
            [
                'meta_key'   => 'user_type',
                'meta_value' => 'company',
                'fields'     => [
                    'ID',
                    'user_login',
                    'user_email',
                    'display_name',
                ],
            ]
        );
        //phpcs:enable

        $users = [];

        foreach ( $query->results as $user ) {
            $users[] = $this->prepare_dropdown_response_for_collection( $user, $request );
        }

        return rest_ensure_response( $users );
    }

    /**
     * Prepare dropdown response for collection.
     *
     * @since JOBPLACE_SINCE
     *
     * @param WP_User         $item    User object.
	 * @param WP_REST_Request $request Request object.
     *
     * @return array
     */
    public function prepare_dropdown_response_for_collection( $item, $request ) {
        $user             = $item;
        $data             = [];
        $data['id']       = $user->id;
        $data['name']     = $user->display_name;
        $data['email']    = $user->user_email;
        $data['username'] = $user->user_login;

        return $data;
    }
}
