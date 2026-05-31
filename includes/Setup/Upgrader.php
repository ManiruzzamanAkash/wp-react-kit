<?php

namespace Akash\JobPlace\Setup;

use Akash\JobPlace\Common\Keys;
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
    const DB_VERSION = '0.13.0';

    /**
     * Constructor.
     *
     * @since 0.10.0
     */
    public function __construct() {
        add_action( 'admin_init', [ $this, 'maybe_upgrade' ] );
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
        $wpdb->jobplace_jobs           = $wpdb->prefix . 'jobplace_jobs';

        JobTypeMigration::migrate();
        JobCategoryMigration::migrate();
        JobsMigration::migrate();

        update_option( Keys::JOB_PLACE_DB_VERSION, self::DB_VERSION );
    }
}
