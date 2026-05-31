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

        // Use `CREATE TABLE` so dbDelta() can add new columns to existing tables.
        $schema_jobs = "CREATE TABLE `{$wpdb->jobplace_jobs}` (
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            `title` varchar(255) NOT NULL,
            `slug` varchar(255) NOT NULL,
            `company_id` bigint(20) unsigned NOT NULL,
            `job_type_id` int(10) unsigned NOT NULL,
            `description` mediumtext NOT NULL,
            `location` varchar(255) NULL,
            `is_remote` tinyint(1) NOT NULL DEFAULT 0,
            `category` varchar(191) NULL,
            `job_category_id` int(10) unsigned NULL,
            `experience_level` varchar(20) NULL,
            `vacancies` int(10) unsigned NOT NULL DEFAULT 1,
            `salary_min` decimal(12,2) NULL,
            `salary_max` decimal(12,2) NULL,
            `salary_currency` varchar(10) NULL DEFAULT 'USD',
            `salary_period` varchar(20) NULL DEFAULT 'yearly',
            `is_negotiable` tinyint(1) NOT NULL DEFAULT 0,
            `application_deadline` date NULL,
            `apply_url` varchar(255) NULL,
            `apply_email` varchar(100) NULL,
            `is_featured` tinyint(1) NOT NULL DEFAULT 0,
            `is_active` tinyint(1) NOT NULL DEFAULT 1,
            `created_by` bigint(20) unsigned NOT NULL,
            `updated_by` bigint(20) unsigned NULL,
            `deleted_by` bigint(20) unsigned NULL,
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL,
            `deleted_at` datetime NULL,
            PRIMARY KEY  (`id`),
            KEY `company_id` (`company_id`),
            UNIQUE KEY `slug` (`slug`),
            KEY `is_active` (`is_active`),
            KEY `is_featured` (`is_featured`),
            KEY `job_type_id` (`job_type_id`),
            KEY `job_category_id` (`job_category_id`),
            KEY `created_by` (`created_by`),
            KEY `updated_by` (`updated_by`)
        ) $charset_collate";

        // Create the tables.
        dbDelta( $schema_jobs );
    }
}
