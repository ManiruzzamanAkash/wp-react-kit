<?php

namespace Akash\JobPlace\Abstracts;

use WP_REST_Controller;

/**
* Rest Controller base class.
*
* @since 0.3.0
*/
abstract class RESTController extends WP_REST_Controller {

    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'job-place/v1';

    /**
     * Check default permission for rest routes.
     *
     * @since 0.3.0
     *
     * @TODO: manage permissions from capabilities.
     *
     * @return bool
     */
    public function check_permission(): bool {
        return true;
        // phpcs:disable Squiz.PHP.CommentedOutCode.Found
        // return current_user_can( 'manage_jobs' );
        //phpcs:enable
    }

    /**
     * Format item's collection for response.
     *
     * @since  0.0.3
     *
     * @param object $response
     * @param object $request
     * @param array  $items
     * @param int    $total_items
     *
     * @return object
     */
    public function format_collection_response( $response, $request, $total_items ) {
        if ( $total_items === 0 ) {
            return $response;
        }

        // Pagination values for headers
        $per_page = (int) ( ! empty( $request['per_page'] ) ? $request['per_page'] : 20 );
        $page     = (int) ( ! empty( $request['page'] ) ? $request['page'] : 1 );

        $response->header( 'X-WP-Total', (int) $total_items );

        $max_pages = ceil( $total_items / $per_page );

        $response->header( 'X-WP-TotalPages', (int) $max_pages );
        $base = add_query_arg( $request->get_query_params(), rest_url( sprintf( '/%s/%s', $this->namespace, $this->base ) ) );

        if ( $page > 1 ) {
            $prev_page = $page - 1;
            if ( $prev_page > $max_pages ) {
                $prev_page = $max_pages;
            }
            $prev_link = add_query_arg( 'page', $prev_page, $base );
            $response->link_header( 'prev', $prev_link );
        }
        if ( $max_pages > $page ) {
            $next_page = $page + 1;
            $next_link = add_query_arg( 'page', $next_page, $base );
            $response->link_header( 'next', $next_link );
        }

        return $response;
    }
}
