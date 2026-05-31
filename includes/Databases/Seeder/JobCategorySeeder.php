<?php

namespace Akash\JobPlace\Databases\Seeder;

use Akash\JobPlace\Abstracts\DBSeeder;
use Akash\JobPlace\Common\Keys;

/**
 * JobCategory Seeder class.
 *
 * Seed some fresh job categories for initial startup.
 *
 * @since 0.13.0
 */
class JobCategorySeeder extends DBSeeder {

    /**
     * Run Job categories seeder.
     *
     * @since 0.13.0
     *
     * @return void
     */
    public function run() {
        global $wpdb;

        // Check if there is already a seeder runs for this plugin.
        $already_seeded = (bool) get_option( Keys::JOB_CATEGORY_SEEDER_RAN, false );
        if ( $already_seeded ) {
            return;
        }

        // Generate some job categories.
        $job_categories = [
            [
                'name'        => 'Engineering',
                'slug'        => 'engineering',
                'description' => 'Engineering and software development roles.',
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
            [
                'name'        => 'Design',
                'slug'        => 'design',
                'description' => 'Design and creative roles.',
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
            [
                'name'        => 'Marketing',
                'slug'        => 'marketing',
                'description' => 'Marketing and growth roles.',
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
            [
                'name'        => 'Sales',
                'slug'        => 'sales',
                'description' => 'Sales and business development roles.',
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
            [
                'name'        => 'Human Resources',
                'slug'        => 'human-resources',
                'description' => 'HR and people operations roles.',
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
        ];

        // Create each of the job categories.
        foreach ( $job_categories as $job_category ) {
            $wpdb->insert(
                $wpdb->prefix . 'jobplace_job_categories',
                $job_category
            );
        }

        // Update that seeder already runs.
        update_option( Keys::JOB_CATEGORY_SEEDER_RAN, true );
    }
}
