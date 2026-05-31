<?php

namespace Akash\JobPlace\Databases\Seeder;

use Akash\JobPlace\Abstracts\DBSeeder;
use Akash\JobPlace\Common\Keys;
use Akash\JobPlace\Databases\Seeder\Data\TopCompaniesData;

/**
 * Seeds Fortune Global 500 and popular brand companies.
 *
 * @since 0.14.0
 * @since 0.15.0 Seeds 500 global companies from bundled JSON data.
 * @since 0.15.1 Adds popular brands and logo URLs.
 */
class CompanySeeder extends DBSeeder {

    /**
     * Current seeder version.
     *
     * Bump when seed data changes so existing installs backfill.
     *
     * @var int
     */
    const VERSION = 2;

    /**
     * Run Companies seeder.
     *
     * @since 0.14.0
     *
     * @return void
     */
    public function run() {
        $ran_version = (int) get_option( Keys::COMPANY_SEEDER_VERSION, 0 );

        if ( $ran_version >= self::VERSION ) {
            return;
        }

        TopCompaniesData::seed();

        if ( $ran_version < 2 ) {
            TopCompaniesData::sync_metadata();
        }

        update_option( Keys::COMPANY_SEEDER_VERSION, self::VERSION );
        update_option( Keys::COMPANY_TOP500_SEEDER_RAN, true );
        update_option( Keys::COMPANY_SEEDER_RAN, true );
    }
}
