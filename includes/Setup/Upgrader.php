<?php

namespace Akash\JobPlace\Setup;

use Akash\JobPlace\Common\Keys;
use Akash\JobPlace\Databases\Migrations\CompanyMigration;
use Akash\JobPlace\Databases\Migrations\JobCategoryMigration;
use Akash\JobPlace\Databases\Migrations\JobsMigration;
use Akash\JobPlace\Databases\Migrations\JobTypeMigration;

/**
 * Version-based database upgrader.
 *
 * Runs idempotent migrations whenever the stored schema version is older
 * than the current one, so new columns are added without a manual plugin
 * reactivation. dbDelta only applies the diff, so re-running is safe.
 *
 * @since 0.10.0
 */
class Upgrader {

    /**
     * Current database schema version.
     *
     * Bump this whenever a migration adds/changes columns.
     *
     * @var string
     */
    const DB_VERSION = '0.15.1';

    /**
     * Constructor.
     *
     * @since 0.10.0
     */
    public function __construct() {
        add_action( 'admin_init', [ $this, 'maybe_upgrade' ] );
        add_action( 'admin_init', [ $this, 'maybe_seed_top_companies' ], 11 );
        add_action( 'admin_init', [ $this, 'maybe_seed_pages' ], 12 );
    }

    /**
     * Run migrations if the stored schema version is out of date.
     *
     * @since 0.10.0
     *
     * @return void
     */
    public function maybe_upgrade(): void {
        $installed = get_option( Keys::JOB_PLACE_DB_VERSION, '0' );

        if ( version_compare( $installed, self::DB_VERSION, '>=' ) ) {
            return;
        }

        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        // The custom table-name properties are only registered on activation,
        // so make sure they exist before the migrations reference them.
        global $wpdb;
        $wpdb->jobplace_job_types      = $wpdb->prefix . 'jobplace_job_types';
        $wpdb->jobplace_job_categories = $wpdb->prefix . 'jobplace_job_categories';
        $wpdb->jobplace_companies      = $wpdb->prefix . 'jobplace_companies';
        $wpdb->jobplace_jobs           = $wpdb->prefix . 'jobplace_jobs';

        JobTypeMigration::migrate();
        JobCategoryMigration::migrate();
        CompanyMigration::migrate();
        JobsMigration::migrate();

        update_option( Keys::JOB_PLACE_DB_VERSION, self::DB_VERSION );
    }

    /**
     * Seed Fortune Global 500 companies for existing installs.
     *
     * @since 0.15.0
     *
     * @return void
     */
    public function maybe_seed_top_companies(): void {
        $ran_version = (int) get_option( Keys::COMPANY_SEEDER_VERSION, 0 );

        if ( $ran_version >= \Akash\JobPlace\Databases\Seeder\CompanySeeder::VERSION ) {
            return;
        }

        if ( ! get_option( Keys::JOB_PLACE_INSTALLED ) ) {
            return;
        }

        global $wpdb;
        $wpdb->jobplace_companies = $wpdb->prefix . 'jobplace_companies';

        $seeder = new \Akash\JobPlace\Databases\Seeder\CompanySeeder();
        $seeder->run();
    }

    /**
     * Create default jobs board page for existing installs.
     *
     * @since 0.16.0
     *
     * @return void
     */
    public function maybe_seed_pages(): void {
        if ( get_option( Keys::JOB_PLACE_JOBS_PAGE_ID ) ) {
            return;
        }

        if ( ! get_option( Keys::JOB_PLACE_INSTALLED ) ) {
            return;
        }

        $page_seeder = new PageSeeder();
        $page_seeder->create_jobs_page();
    }
}
