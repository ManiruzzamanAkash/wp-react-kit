<?php

namespace Akash\JobPlace\Jobs;

/**
 * JobStatus class.
 *
 * @since 0.3.0
 */
class JobStatus {

    /**
     * Draft status.
     *
     * @since 0.3.0
     */
    const DRAFT = 'draft';

    /**
     * Published status.
     *
     * @since 0.3.0
     */
    const PUBLISHED = 'published';

    /**
     * Trashed status.
     *
     * @since 0.3.0
     */
    const TRASHED = 'trashed';

    /**
     * Get job status.
     *
     * @since 0.3.0
     *
     * @param object $job
     */
    public static function get_status_by_job( object $job ): string {
        if ( ! empty( $job->deleted_at ) ) {
            return self::TRASHED;
        }

        if ( $job->is_active ) {
            return self::PUBLISHED;
        }

        return self::DRAFT;
    }
}
