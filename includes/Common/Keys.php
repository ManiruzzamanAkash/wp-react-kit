<?php

namespace Akash\JobPlace\Common;

/**
 * Manage all key strings.
 *
 * @since 0.3.0
 */
class Keys {

    /**
     * Job place installed option key.
     *
     * @var string
     *
     * @since 0.3.0
     */
    const JOB_PLACE_INSTALLED = 'jobplace_installed';

    /**
     * Job place version key.
     *
     * @var string
     *
     * @since 0.3.0
     */
    const JOB_PLACE_VERSION = 'jobplace_version';

    /**
     * Job place database schema version key.
     *
     * Used by the upgrader to run migrations when the schema changes
     * without requiring a manual plugin reactivation.
     *
     * @var string
     *
     * @since 0.10.0
     */
    const JOB_PLACE_DB_VERSION = 'jobplace_db_version';

    /**
     * Job type seeder ran key.
     *
     * @var string
     *
     * @since 0.5.0
     */
    const JOB_TYPE_SEEDER_RAN = 'jobplace_job_type_seeder_ran';

    /**
     * Job category seeder ran key.
     *
     * @var string
     *
     * @since 0.13.0
     */
    const JOB_CATEGORY_SEEDER_RAN = 'jobplace_job_category_seeder_ran';

    /**
     * Company seeder ran key.
     *
     * @var string
     *
     * @since 0.14.0
     */
    const COMPANY_SEEDER_RAN = 'jobplace_company_seeder_ran';

    /**
     * Fortune Global 500 company seeder ran key.
     *
     * @var string
     *
     * @since 0.15.0
     */
    const COMPANY_TOP500_SEEDER_RAN = 'jobplace_company_top500_seeder_ran';

    /**
     * Company seeder version key.
     *
     * @var string
     *
     * @since 0.15.1
     */
    const COMPANY_SEEDER_VERSION = 'jobplace_company_seeder_version';

    /**
     * Job seeder ran key.
     *
     * @var string
     *
     * @since 0.3.0
     */
    const JOB_SEEDER_RAN = 'jobplace_job_seeder_ran';
}
