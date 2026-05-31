<?php

namespace Akash\JobPlace\Databases\Migrations;

use Akash\JobPlace\Abstracts\DBMigrator;

/**
 * Company table Migration class.
 *
 * @since 0.14.0
 */
class CompanyMigration extends DBMigrator {

    /**
     * Migrate the companies table.
     *
     * @since 0.14.0
     *
     * @return void
     */
    public static function migrate() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $schema_companies = "CREATE TABLE `{$wpdb->jobplace_companies}` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(255) NOT NULL,
            `slug` varchar(255) NOT NULL,
            `email` varchar(255) NOT NULL DEFAULT '',
            `website` varchar(255) NOT NULL DEFAULT '',
            `description` varchar(255) NOT NULL DEFAULT '',
            `avatar_url` varchar(255) NOT NULL DEFAULT '',
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL,
            PRIMARY KEY  (`id`),
            UNIQUE KEY `slug` (`slug`)
        ) $charset_collate;";

        dbDelta( $schema_companies );
    }
}
