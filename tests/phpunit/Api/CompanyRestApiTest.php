<?php

namespace Akash\JobPlace\Tests\Api;

class CompanyRestApiTest extends \WP_UnitTestCase {

    /**
	 * Test REST Server
	 *
	 * @var WP_REST_Server
	 */
	protected $server;

    /**
     * Namespace.
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
     * Setup test environment.
     */
    protected function setUp() : void {
        // Initialize REST Server.
        global $wp_rest_server;

        parent::setUp();

		$this->server = $wp_rest_server = new \WP_REST_Server;
		do_action( 'rest_api_init' );
    }

    /**
     * @test
     * @group company-rest-api
     */
    public function test_company_dropdown_list_endpoint_exists() {
        $endpoint = '/' . $this->namespace . '/' . $this->base . '/dropdown';

        $request  = new \WP_REST_Request( 'GET', $endpoint );

        $response = $this->server->dispatch( $request );

        $this->assertEquals( 200, $response->get_status() );
	}

    /**
     * @test
     * @group company-rest-api
     */
    public function test_company_dropdown_list_endpoint() {
        $endpoint = '/' . $this->namespace . '/' . $this->base . '/dropdown';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();

        // It must be an array.
        $this->assertTrue( is_array( $data ) );
        $this->assertEquals( count( $data ), 0 );

        // Set company meta to administrator user.
        $user = get_user_by( 'id', 1 );
        if ( $user ) {
            update_user_meta( 1, 'user_type', 'company' );

            $response = $this->server->dispatch( $request );
            $data     = $response->get_data();

            // Length must be 1
            $this->assertEquals( count( $data ), 1 );
        }
    }
}
