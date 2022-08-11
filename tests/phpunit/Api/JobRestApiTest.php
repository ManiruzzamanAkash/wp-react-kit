<?php

namespace Akash\JobPlace\Tests\Api;

use Akash\JobPlace\Jobs\Job;

class JobRestApiTest extends \WP_UnitTestCase {

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
     * Job Instance.
     *
     * @var Akash\JobPlace\Jobs\Job
     */
    public Job $job;

    /**
     * Job Manager Instance.
     *
     * @var Akash\JobPlace\Jobs\Manager
     */
    public $job_manager;

    /**
     * Setup test environment.
     */
    protected function setUp() : void {
        // Initialize REST Server.
        global $wp_rest_server;

        parent::setUp();

        $this->job = new Job();

        // Truncate jobs table first before running test-suits.
        $this->job->truncate();

		$this->server = $wp_rest_server = new \WP_REST_Server;
		do_action( 'rest_api_init' );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_jobs_list_endpoint_exists() {
        $endpoint = '/' . $this->namespace . '/jobs';

        $request  = new \WP_REST_Request( 'GET', $endpoint );

        $response = $this->server->dispatch( $request );

        $this->assertEquals( 200, $response->get_status() );
	}

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_jobs_list_endpoint_returns_array() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertIsArray( $data );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_job_list_endpoint_can_send_total() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 0, $response->get_headers()['X-WP-Total'] );
        $this->assertEquals( 0, $response->get_headers()['X-WP-TotalPages'] );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_can_get_job_detail() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();

        // Hit job detail api endpoint.
        $endpoint = '/' . $this->namespace . '/jobs/' . $data['id'];
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $response = $response->get_data();

        // Check if job detail id found.
        $this->assertEquals( $data['title'], $response['title'] );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_job_endpoint_can_create_job() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 1, $data['id'] );

        // Check total count of jobs.
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 1, count( $data ) );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_job_endpoint_can_not_create_without_title() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );

        $this->assertEquals( 400, $response->get_status() );
        $this->assertSame( 'rest_missing_callback_param', $response->get_data()['code'] );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_can_slug_will_be_auto_generated_if_not_given() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );

        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();

        $this->assertEquals( 'job-title', $data['slug'] );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_can_create_multiple_job_without_slug_same_time() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 'job-title', $data['slug'] );

        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 'job-title-1', $data['slug'] );

        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 'job-title-2', $data['slug'] );

        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 'job-title-3', $data['slug'] );
    }

    /**
     * @test
     * @group jobs-rest-api
     */
    public function test_can_update_job() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 'job-title', $data['slug'] );
        $this->assertEquals( 1, $data['id'] );

        // Update job.
        $endpoint = '/' . $this->namespace . '/jobs/' . $data['id'];
        $request  = new \WP_REST_Request( 'PUT', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title Updated',
            'description' => 'Job Description Updated',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );

        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 'Job Title Updated', $data['title'] );
        $this->assertEquals( 'job-title-updated', $data['slug'] );
    }

    /**
     * @test
     *
     * @return void
     */
    public function test_can_delete_jobs() {
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'POST', $endpoint );
        $request->set_body_params( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();

        // Count total jobs
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 1, count( $data ) );

        // Delete Job
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'DELETE', $endpoint );
        $request->set_param( 'ids', [$data[0]['id']] );
        $response = $this->server->dispatch( $request );
        $this->assertEquals( 200, $response->get_status() );

        // Count total jobs
        $endpoint = '/' . $this->namespace . '/jobs';
        $request  = new \WP_REST_Request( 'GET', $endpoint );
        $response = $this->server->dispatch( $request );
        $data     = $response->get_data();
        $this->assertEquals( 0, count( $data ) );
    }
}
