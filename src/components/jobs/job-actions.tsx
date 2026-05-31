/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { useDispatch, select } from '@wordpress/data';
import {
    Button,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalText as Text,
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import type { Action } from '@wordpress/dataviews/wp';

/**
 * Internal dependencies.
 */
import jobStore from '../../data/jobs';
import { IJob } from '../../interfaces';
import { prepareJobDataForDatabase } from '../../data/jobs/utils';

export const useJobActions = (): Action< IJob >[] => {
    const navigate = useNavigate();
    const {
        saveJob,
        deleteJobs,
        setFilters,
        invalidateResolutionForStoreSelector,
    } = useDispatch( jobStore );
    const { createSuccessNotice, createErrorNotice } =
        useDispatch( noticesStore );

    return useMemo< Action< IJob >[] >(
        () => [
            {
                id: 'edit',
                label: __( 'Edit', 'jobplace' ),
                callback: ( items ) => {
                    const job = items[ 0 ];
                    if ( job ) {
                        navigate( `/jobs/edit/${ job.id }` );
                    }
                },
            },
            {
                id: 'toggle-status',
                label: ( items ) =>
                    items[ 0 ]?.status === 'published'
                        ? __( 'Make Draft', 'jobplace' )
                        : __( 'Make Publish', 'jobplace' ),
                callback: async ( items ) => {
                    const job = items[ 0 ];
                    if ( ! job ) {
                        return;
                    }

                    const willPublish = job.status !== 'published';

                    try {
                        await saveJob(
                            prepareJobDataForDatabase( {
                                ...job,
                                is_active: willPublish ? 1 : 0,
                            } )
                        );

                        // Refetch using the current filters so the toggled
                        // row stays on the same page.
                        const currentFilters =
                            select( jobStore ).getFilter() || {};
                        await setFilters( currentFilters );
                        invalidateResolutionForStoreSelector( 'getJobStats' );

                        createSuccessNotice(
                            willPublish
                                ? __( 'Job published.', 'jobplace' )
                                : __( 'Job moved to draft.', 'jobplace' ),
                            { type: 'snackbar' }
                        );
                    } catch ( error ) {
                        const message =
                            ( error as { message?: string } )?.message ||
                            __(
                                'Could not update job status.',
                                'jobplace'
                            );
                        createErrorNotice( message, { type: 'snackbar' } );
                    }
                },
            },
            {
                id: 'delete',
                label: __( 'Delete', 'jobplace' ),
                isDestructive: true,
                supportsBulk: true,
                RenderModal: ( { items, closeModal } ) => {
                    const onConfirm = async () => {
                        try {
                            await deleteJobs( {
                                ids: items.map( ( item ) => item.id ),
                            } );
                            invalidateResolutionForStoreSelector(
                                'getJobStats'
                            );
                            createSuccessNotice(
                                __( 'Job(s) deleted.', 'jobplace' ),
                                { type: 'snackbar' }
                            );
                        } catch ( error ) {
                            createErrorNotice(
                                __( 'Could not delete job(s).', 'jobplace' ),
                                { type: 'snackbar' }
                            );
                        } finally {
                            closeModal?.();
                        }
                    };

                    return (
                        <VStack spacing={ 4 }>
                            <Text>
                                { items.length > 1
                                    ? __(
                                          'Are you sure you want to delete these jobs? This action cannot be undone.',
                                          'jobplace'
                                      )
                                    : __(
                                          'Are you sure you want to delete this job? This action cannot be undone.',
                                          'jobplace'
                                      ) }
                            </Text>
                            <HStack justify="flex-end">
                                <Button
                                    variant="tertiary"
                                    onClick={ closeModal }
                                >
                                    { __( 'Cancel', 'jobplace' ) }
                                </Button>
                                <Button
                                    variant="primary"
                                    isDestructive
                                    onClick={ onConfirm }
                                >
                                    { __( 'Delete', 'jobplace' ) }
                                </Button>
                            </HStack>
                        </VStack>
                    );
                },
            },
        ],
        [
            navigate,
            saveJob,
            deleteJobs,
            setFilters,
            invalidateResolutionForStoreSelector,
            createSuccessNotice,
            createErrorNotice,
        ]
    );
};
