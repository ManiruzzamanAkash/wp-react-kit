import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useDispatch, select } from '@wordpress/data';
import {
    Button,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalText as Text,
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import type { Action } from '@wordpress/dataviews/wp';
import jobCategoriesStore from '../../data/job-categories';
import jobsStore from '../../data/jobs';
import { IJobCategory } from '../../interfaces';

type CategoryActionsProps = {
    onEdit: ( category: IJobCategory ) => void;
};

export const useCategoryActions = ( {
    onEdit,
}: CategoryActionsProps ): Action< IJobCategory >[] => {
    const { deleteCategories, setFilters, invalidateResolutionForStoreSelector } =
        useDispatch( jobCategoriesStore );
    const { invalidateResolutionForStoreSelector: invalidateJobsCategories } =
        useDispatch( jobsStore );
    const { createSuccessNotice, createErrorNotice } =
        useDispatch( noticesStore );

    return useMemo< Action< IJobCategory >[] >(
        () => [
            {
                id: 'edit',
                label: __( 'Edit', 'jobplace' ),
                callback: ( items ) => {
                    const category = items[ 0 ];
                    if ( category ) {
                        onEdit( category );
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
                            await deleteCategories(
                                items.map( ( item ) => item.id )
                            );
                            const currentFilters =
                                select( jobCategoriesStore ).getFilter() ||
                                {};
                            await setFilters( currentFilters );
                            invalidateResolutionForStoreSelector(
                                'getCategories'
                            );
                            invalidateJobsCategories( 'getJobCategories' );
                            createSuccessNotice(
                                __( 'Category deleted.', 'jobplace' ),
                                { type: 'snackbar' }
                            );
                        } catch {
                            createErrorNotice(
                                __( 'Could not delete category.', 'jobplace' ),
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
                                          'Are you sure you want to delete these categories? This action cannot be undone.',
                                          'jobplace'
                                      )
                                    : __(
                                          'Are you sure you want to delete this category? This action cannot be undone.',
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
            onEdit,
            deleteCategories,
            setFilters,
            invalidateResolutionForStoreSelector,
            invalidateJobsCategories,
            createSuccessNotice,
            createErrorNotice,
        ]
    );
};
