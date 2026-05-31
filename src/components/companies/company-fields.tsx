import { __ } from '@wordpress/i18n';
import { format } from '@wordpress/date';
import type { Field } from '@wordpress/dataviews/wp';
import { ICompany } from '../../interfaces';

export const useCompanyFields = (): Field< ICompany >[] => {
    return [
        {
            id: 'name',
            label: __( 'Name', 'jobplace' ),
            enableHiding: false,
            enableSorting: false,
            getValue: ( { item } ) => item.name,
            render: ( { item } ) => <strong>{ item.name }</strong>,
        },
        {
            id: 'slug',
            label: __( 'Slug', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.slug,
            render: ( { item } ) => (
                <code style={ { fontSize: 12 } }>{ item.slug }</code>
            ),
        },
        {
            id: 'email',
            label: __( 'Email', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.email || '',
            render: ( { item } ) => item.email || '—',
        },
        {
            id: 'website',
            label: __( 'Website', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.website || '',
            render: ( { item } ) =>
                item.website ? (
                    <a href={ item.website } target="_blank" rel="noreferrer">
                        { item.website }
                    </a>
                ) : (
                    '—'
                ),
        },
        {
            id: 'description',
            label: __( 'Description', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.description || '',
            render: ( { item } ) => item.description || '—',
        },
        {
            id: 'created_at',
            label: __( 'Created', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.created_at || '',
            render: ( { item } ) =>
                item.created_at
                    ? format( 'M j, Y', item.created_at )
                    : '—',
        },
    ];
};
