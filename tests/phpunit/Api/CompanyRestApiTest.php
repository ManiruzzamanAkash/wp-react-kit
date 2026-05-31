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
        global $wpdb;

        $endpoint = '/' . $this->namespace . '/' . $this->base . '/dropdown';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();

        $this->assertTrue( is_array( $data ) );
        $this->assertEquals( count( $data ), 0 );

        $now = current_datetime()->format( 'Y-m-d H:i:s' );
        $wpdb->insert(
            $wpdb->prefix . 'jobplace_companies',
            [
                'name'        => 'Test Company',
                'slug'        => 'test-company',
                'email'       => 'test@example.com',
                'website'     => '',
                'description' => '',
                'avatar_url'  => '',
                'created_at'  => $now,
                'updated_at'  => $now,
            ]
        );

        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();

        $this->assertEquals( count( $data ), 1 );
        $this->assertEquals( 'Test Company', $data[0]['name'] );
    }
}
