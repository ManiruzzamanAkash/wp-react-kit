<?php

namespace Akash\JobPlace\Tests;

use Akash\JobPlace\Jobs\Job;

class JobManagerTest extends \WP_UnitTestCase {

    /**
     * Job Instance.
     *
     * @var Job
     */
    public Job $job;

    /**
     * Job Manager Instance.
     *
     * @var \Akash\JobPlace\Jobs\Manager
     */
    public $job_manager;

    /**
     * Setup test environment.
     */
    protected function setUp() : void {
        parent::setUp();

        $this->job = new Job();
        $this->job_manager = job_place()->jobs;

        // Truncate jobs table first before running tests.
        $this->job->truncate();
    }

    /**
     * @test
     * @group jobs
     */
    public function test_if_job_count_is_int() {
        $jobs_count = $this->job_manager->all( [ 'count' => true ] );

        // Check if jobs_count is an integer.
        $this->assertIsInt( $jobs_count );
    }

    /**
     * @test
     * @group jobs
     */
    public function test_if_job_lists_is_array() {
        $jobs = $this->job_manager->all();
        $this->assertIsArray( $jobs );
    }

    /**
     * @test
     * @group jobs
     */
    public function test_can_create_a_job() {
        // Get total jobs before creating job.
        $jobs_count = $this->job_manager->all( [ 'count' => true ] );
        $this->assertEquals( 0, $jobs_count );

        $job_id = $this->job_manager->create( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );

        // Check again the total jobs = 1
        $jobs_count = $this->job_manager->all( [ 'count' => true ] );
        $this->assertEquals( 1, $jobs_count );

        // Check if job_id is an integer also.
        $this->assertIsInt( $job_id );
    }

    /**
     * @test
     * @group jobs
     */
    public function test_can_find_a_job() {
        $job_id = $this->job_manager->create( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $this->assertIsInt( $job_id );

        // Find the job
        $job = $this->job_manager->get( [ 'key' => 'id', 'value' => $job_id ] );

        // Check if job is an object
        $this->assertIsObject( $job );

        // Check if job id is found on $job->id
        $this->assertEquals( $job_id, $job->id );
    }

    /**
     * @test
     * @group jobs
     */
    public function test_can_update_a_job() {
        $job_id = $this->job_manager->create( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );
        $this->assertIsInt( $job_id );
        $this->assertGreaterThan( 0, $job_id );
        $this->assertEquals( 1, $this->job_manager->update([
            'title'       => 'Job Title Updated',
            'description' => 'Job Description Updated',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ], $job_id));
    }

    /**
     * @test
     * @group jobs
     */
    public function test_can_delete_a_job() {
        $job_id = $this->job_manager->create( [
            'title'       => 'Job Title',
            'description' => 'Job Description',
            'company_id'  => 1,
            'job_type_id' => 2,
            'is_active'   => 1,
        ] );

        // Check total jobs = 1
        $jobs_count = $this->job_manager->all( [ 'count' => true ] );
        $this->assertEquals( 1, $jobs_count );

        // Delete the job
        $this->job_manager->delete( $job_id );

        // Check total jobs = 0
        $jobs_count = $this->job_manager->all( [ 'count' => true ] );
        $this->assertEquals( 0, $jobs_count );
    }
}
