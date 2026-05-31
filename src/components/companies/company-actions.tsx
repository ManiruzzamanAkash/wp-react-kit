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
import companiesStore from '../../data/companies';
import jobsStore from '../../data/jobs';
import { ICompany } from '../../interfaces';

type CompanyActionsProps = {
    onEdit: ( company: ICompany ) => void;
};

export const useCompanyActions = ( {
    onEdit,
}: CompanyActionsProps ): Action< ICompany >[] => {
    const { deleteCompanies, setFilters, invalidateResolutionForStoreSelector } =
        useDispatch( companiesStore );
    const { invalidateResolutionForStoreSelector: invalidateJobsCompanies } =
        useDispatch( jobsStore );
    const { createSuccessNotice, createErrorNotice } =
        useDispatch( noticesStore );

    return useMemo< Action< ICompany >[] >(
        () => [
            {
                id: 'edit',
                label: __( 'Edit', 'jobplace' ),
                callback: ( items ) => {
                    const company = items[ 0 ];
                    if ( company ) {
                        onEdit( company );
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
                            await deleteCompanies(
                                items.map( ( item ) => item.id )
                            );
                            const currentFilters =
                                select( companiesStore ).getFilter() || {};
                            await setFilters( currentFilters );
                            invalidateResolutionForStoreSelector(
                                'getCompanies'
                            );
                            invalidateResolutionForStoreSelector(
                                'getCompanyStats'
                            );
                            invalidateJobsCompanies( 'getCompaniesDropdown' );
                            createSuccessNotice(
                                __( 'Company deleted.', 'jobplace' ),
                                { type: 'snackbar' }
                            );
                        } catch {
                            createErrorNotice(
                                __( 'Could not delete company.', 'jobplace' ),
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
                                          'Are you sure you want to delete these companies? Jobs linked to them may need updating.',
                                          'jobplace'
                                      )
                                    : __(
                                          'Are you sure you want to delete this company? Jobs linked to it may need updating.',
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
            deleteCompanies,
            setFilters,
            invalidateResolutionForStoreSelector,
            invalidateJobsCompanies,
            createSuccessNotice,
            createErrorNotice,
        ]
    );
};
