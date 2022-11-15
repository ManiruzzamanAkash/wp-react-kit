<?php

namespace Akash\JobPlace\Databases\Migrations;

use Akash\JobPlace\Abstracts\DBMigrator;

/**
 * Jobs migration.
 */
class JobsMigration extends DBMigrator {

    /**
     * Migrate the jobs table.
     *
     * @since 0.3.0
     *
     * @return void
     */
    public static function migrate() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $schema_jobs = "CREATE TABLE IF NOT EXISTS `{$wpdb->jobplace_jobs}` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `title` varchar(255) NOT NULL,
            `slug` varchar(255) NOT NULL,
            `company_id` bigint(20) unsigned NOT NULL,
            `job_type_id` int(10) unsigned NOT NULL,
            `description` mediumtext NOT NULL,
            `is_active` tinyint(1) NOT NULL DEFAULT 1,
            `created_by` bigint(20) unsigned NOT NULL,
            `updated_by` bigint(20) unsigned NULL,
            `deleted_by` bigint(20) unsigned NULL,
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL,
            `deleted_at` datetime NULL,
            PRIMARY KEY (`id`),
            KEY `company_id` (`company_id`),
            UNIQUE KEY `slug` (`slug`),
            KEY `is_active` (`is_active`),
            KEY `job_type_id` (`job_type_id`),
            KEY `created_by` (`created_by`),
            KEY `updated_by` (`updated_by`)
        ) $charset_collate";

        // Create the tables.
        dbDelta( $schema_jobs );
    }
}
