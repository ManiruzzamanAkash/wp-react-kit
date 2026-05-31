<?php

namespace Akash\JobPlace\Databases\Migrations;

use Akash\JobPlace\Abstracts\DBMigrator;

/**
 * Job category table Migration class.
 *
 * @since 0.13.0
 */
class JobCategoryMigration extends DBMigrator {

    /**
     * Migrate the job_categories table.
     *
     * @since 0.13.0
     *
     * @return void
     */
    public static function migrate() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        // Use `CREATE TABLE` so dbDelta() can add new columns to existing tables.
        $schema_job_categories = "CREATE TABLE `{$wpdb->jobplace_job_categories}` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(255) NOT NULL,
            `slug` varchar(255) NOT NULL,
            `description` varchar(255) NOT NULL,
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL,
            PRIMARY KEY  (`id`),
            UNIQUE KEY `slug` (`slug`)
        ) $charset_collate;";

        // Create the tables.
        dbDelta( $schema_job_categories );
    }
}
