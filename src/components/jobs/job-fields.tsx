/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import { format } from '@wordpress/date';
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import type { Field } from '@wordpress/dataviews/wp';

/**
 * Internal dependencies.
 */
import { IJob } from '../../interfaces';
import jobStore from '../../data/jobs';
import { capitalize } from '../../utils/StringHelper';

const EXPERIENCE_LEVELS = [
    { value: 'entry', label: __( 'Entry level', 'jobplace' ) },
    { value: 'mid', label: __( 'Mid level', 'jobplace' ) },
    { value: 'senior', label: __( 'Senior', 'jobplace' ) },
    { value: 'lead', label: __( 'Lead / Manager', 'jobplace' ) },
];

const toFilterOptions = (
    items: Array< { label: string; value: string | number } > = []
) =>
    items
        .filter( ( item ) => item.value !== '' && item.value !== 0 )
        .map( ( item ) => ( {
            value: String( item.value ),
            label: item.label,
        } ) );

const STATUS_COLORS: Record< string, string > = {
    published: '#319f45',
    draft: '#787878',
    trashed: '#bd081c',
};

const CURRENCY_SYMBOLS: Record< string, string > = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BDT: '৳',
    INR: '₹',
};

const PERIOD_LABELS: Record< string, string > = {
    hourly: '/hr',
    monthly: '/mo',
    yearly: '/yr',
};

const formatSalary = ( item: IJob ): string => {
    if ( item.is_negotiable ) {
        return __( 'Negotiable', 'jobplace' );
    }

    const min = item.salary_min ?? null;
    const max = item.salary_max ?? null;

    if ( ! min && ! max ) {
        return '—';
    }

    const symbol = CURRENCY_SYMBOLS[ item.salary_currency || 'USD' ] || '';
    const period = PERIOD_LABELS[ item.salary_period || 'yearly' ] || '';
    const fmt = ( value: number ) => symbol + value.toLocaleString();

    if ( min && max ) {
        return `${ fmt( min ) } – ${ fmt( max ) }${ period }`;
    }

    return `${ fmt( ( min || max ) as number ) }${ period }`;
};

const JobStatus = ( { status }: { status?: string } ) => {
    const value = status || 'draft';

    return (
        <span
            style={ {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 500,
            } }
        >
            <span
                style={ {
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: STATUS_COLORS[ value ] || '#787878',
                } }
                aria-hidden="true"
            />
            { capitalize( value ) }
        </span>
    );
};

/**
 * DataViews field definitions for the Jobs list.
 *
 * Sorting is disabled because the list is server-paginated through the
 * custom jobs store, which does not currently expose orderable columns.
 */
export const useJobFields = (): Field< IJob >[] => {
    const navigate = useNavigate();

    const jobTypes = useSelect(
        ( select ) => select( jobStore ).getJobTypes(),
        []
    );
    const jobCategories = useSelect(
        ( select ) => select( jobStore ).getJobCategories(),
        []
    );
    const companies = useSelect(
        ( select ) => select( jobStore ).getCompaniesDropdown(),
        []
    );

    const jobTypeOptions = toFilterOptions( jobTypes );
    const jobCategoryOptions = toFilterOptions( jobCategories );
    const companyOptions = toFilterOptions( companies );

    return [
        {
            id: 'title',
            label: __( 'Job', 'jobplace' ),
            enableHiding: false,
            enableSorting: false,
            getValue: ( { item } ) => item.title,
            render: ( { item } ) => (
                <span
                    style={ {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                    } }
                >
                    { item.is_featured ? (
                        <span
                            aria-label={ __( 'Featured', 'jobplace' ) }
                            title={ __( 'Featured', 'jobplace' ) }
                            style={ { color: '#dba617' } }
                        >
                            ★
                        </span>
                    ) : null }
                    <Button
                        variant="link"
                        onClick={ () => navigate( `/jobs/edit/${ item.id }` ) }
                    >
                        <strong>{ item.title }</strong>
                    </Button>
                </span>
            ),
        },
        {
            id: 'job_type',
            label: __( 'Job type', 'jobplace' ),
            enableSorting: false,
            filterBy: {},
            elements: jobTypeOptions,
            getValue: ( { item } ) =>
                item.job_type_id ? String( item.job_type_id ) : '',
            render: ( { item } ) => item.job_type?.name || '—',
        },
        {
            id: 'job_category',
            label: __( 'Category', 'jobplace' ),
            enableSorting: false,
            filterBy: {},
            elements: jobCategoryOptions,
            getValue: ( { item } ) =>
                item.job_category_id ? String( item.job_category_id ) : '',
            render: ( { item } ) => item.job_category?.name || '—',
        },
        {
            id: 'company',
            label: __( 'Company', 'jobplace' ),
            enableSorting: false,
            filterBy: {},
            elements: companyOptions,
            getValue: ( { item } ) =>
                item.company_id ? String( item.company_id ) : '',
            render: ( { item } ) => (
                <span
                    style={ {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                    } }
                >
                    { item.company?.avatar_url && (
                        <img
                            src={ item.company.avatar_url }
                            alt=""
                            style={ {
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                            } }
                        />
                    ) }
                    <span>{ item.company?.name || '—' }</span>
                </span>
            ),
        },
        {
            id: 'location',
            label: __( 'Location', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.location || '',
            render: ( { item } ) => (
                <span
                    style={ {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                    } }
                >
                    <span>{ item.location || '—' }</span>
                    { item.is_remote ? (
                        <span
                            style={ {
                                fontSize: 11,
                                fontWeight: 500,
                                color: '#2271b1',
                                background: '#f0f6fc',
                                borderRadius: 2,
                                padding: '1px 6px',
                            } }
                        >
                            { __( 'Remote', 'jobplace' ) }
                        </span>
                    ) : null }
                </span>
            ),
        },
        {
            id: 'salary',
            label: __( 'Salary', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => formatSalary( item ),
            render: ( { item } ) => formatSalary( item ),
        },
        {
            id: 'vacancies',
            label: __( 'Vacancies', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.vacancies ?? 1,
            render: ( { item } ) => item.vacancies ?? 1,
        },
        {
            id: 'posted',
            label: __( 'Posted', 'jobplace' ),
            enableSorting: false,
            getValue: ( { item } ) => item.created_at || '',
            render: ( { item } ) =>
                item.created_at ? format( 'M j, Y', item.created_at ) : '—',
        },
        {
            id: 'status',
            label: __( 'Status', 'jobplace' ),
            enableSorting: false,
            filterBy: { isPrimary: true },
            getValue: ( { item } ) => item.status || 'draft',
            elements: [
                { value: 'published', label: __( 'Published', 'jobplace' ) },
                { value: 'draft', label: __( 'Draft', 'jobplace' ) },
            ],
            render: ( { item } ) => <JobStatus status={ item.status } />,
        },
        {
            id: 'is_featured',
            label: __( 'Featured', 'jobplace' ),
            type: 'boolean',
            enableSorting: false,
            filterBy: {},
            getValue: ( { item } ) => !! item.is_featured,
            render: ( { item } ) =>
                item.is_featured ? __( 'Yes', 'jobplace' ) : __( 'No', 'jobplace' ),
        },
        {
            id: 'is_remote',
            label: __( 'Remote friendly', 'jobplace' ),
            type: 'boolean',
            enableSorting: false,
            filterBy: {},
            getValue: ( { item } ) => !! item.is_remote,
            render: ( { item } ) =>
                item.is_remote ? __( 'Yes', 'jobplace' ) : __( 'No', 'jobplace' ),
        },
        {
            id: 'is_negotiable',
            label: __( 'Negotiable salary', 'jobplace' ),
            type: 'boolean',
            enableSorting: false,
            filterBy: {},
            getValue: ( { item } ) => !! item.is_negotiable,
            render: ( { item } ) =>
                item.is_negotiable
                    ? __( 'Yes', 'jobplace' )
                    : __( 'No', 'jobplace' ),
        },
        {
            id: 'experience_level',
            label: __( 'Experience level', 'jobplace' ),
            enableSorting: false,
            filterBy: {},
            elements: EXPERIENCE_LEVELS,
            getValue: ( { item } ) => item.experience_level || '',
            render: ( { item } ) =>
                EXPERIENCE_LEVELS.find(
                    ( level ) => level.value === item.experience_level
                )?.label ||
                item.experience_level ||
                '—',
        },
    ];
};
