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
     * Job seeder ran key.
     *
     * @var string
     *
     * @since 0.3.0
     */
    const JOB_SEEDER_RAN = 'jobplace_job_seeder_ran';
}
