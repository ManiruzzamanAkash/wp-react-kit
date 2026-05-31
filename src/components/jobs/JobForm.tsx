/**
 * External dependencies.
 */
import { useEffect, useMemo } from '@wordpress/element';
import { useParams } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { DataForm } from '@wordpress/dataviews/wp';
import type { Field, Form } from '@wordpress/dataviews/wp';
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import jobStore from '../../data/jobs';
import { IJobFormData } from '../../interfaces';
import BlockEditorField from './BlockEditorField';
import DateField from './DateField';
import CompanyField from './CompanyField';
import './job-form.scss';

const toOptions = ( items: Array< { label: string; value: any } > = [] ) =>
    ( items || [] )
        .filter( Boolean )
        .map( ( option ) => ( {
            value: String( option.value ),
            label: option.label,
        } ) );

const withPlaceholder = (
    items: Array< { label: string; value: string } >
) => [ { value: '', label: __( '— Select —', 'jobplace' ) }, ...items ];

const EXPERIENCE_LEVELS = [
    { value: '', label: __( 'Not specified', 'jobplace' ) },
    { value: 'entry', label: __( 'Entry level', 'jobplace' ) },
    { value: 'mid', label: __( 'Mid level', 'jobplace' ) },
    { value: 'senior', label: __( 'Senior', 'jobplace' ) },
    { value: 'lead', label: __( 'Lead / Manager', 'jobplace' ) },
];

const SALARY_CURRENCIES = [
    { value: 'USD', label: __( 'USD ($)', 'jobplace' ) },
    { value: 'EUR', label: __( 'EUR (€)', 'jobplace' ) },
    { value: 'GBP', label: __( 'GBP (£)', 'jobplace' ) },
    { value: 'BDT', label: __( 'BDT (৳)', 'jobplace' ) },
    { value: 'INR', label: __( 'INR (₹)', 'jobplace' ) },
];

const SALARY_PERIODS = [
    { value: 'hourly', label: __( 'Per hour', 'jobplace' ) },
    { value: 'monthly', label: __( 'Per month', 'jobplace' ) },
    { value: 'yearly', label: __( 'Per year', 'jobplace' ) },
];

export default function JobForm() {
    const { id } = useParams();
    const { setFormData, invalidateResolutionForStoreSelector } =
        useDispatch( jobStore );

    const jobTypes = useSelect(
        ( select ) => select( jobStore ).getJobTypes(),
        []
    );
    const jobCategories = useSelect(
        ( select ) => select( jobStore ).getJobCategories(),
        []
    );
    const form: IJobFormData = useSelect(
        ( select ) => select( jobStore ).getForm(),
        []
    );
    const loadingJobs: boolean = useSelect(
        ( select ) => select( jobStore ).getLoadingJobs(),
        []
    );

    useEffect( () => {
        if ( parseInt( id + '' ) !== form.id ) {
            invalidateResolutionForStoreSelector( 'getJobDetail' );
        }
    }, [ id, invalidateResolutionForStoreSelector ] );

    const fields: Field< IJobFormData >[] = useMemo(
        () => [
            {
                id: 'title',
                label: __( 'Job title', 'jobplace' ),
                type: 'text',
                placeholder: __(
                    'e.g. Senior Software Engineer',
                    'jobplace'
                ),
            },
            {
                id: 'company_id',
                label: __( 'Company', 'jobplace' ),
                Edit: ( props: any ) => <CompanyField { ...props } />,
            },
            {
                id: 'job_type_id',
                label: __( 'Job type', 'jobplace' ),
                Edit: 'select',
                elements: withPlaceholder( toOptions( jobTypes ) ),
                getValue: ( { item } ) =>
                    item.job_type_id ? String( item.job_type_id ) : '',
            },
            {
                id: 'job_category_id',
                label: __( 'Category / Department', 'jobplace' ),
                Edit: 'select',
                elements: withPlaceholder( toOptions( jobCategories ) ),
                getValue: ( { item } ) =>
                    item.job_category_id ? String( item.job_category_id ) : '',
            },
            {
                id: 'location',
                label: __( 'Location', 'jobplace' ),
                type: 'text',
                placeholder: __( 'e.g. Dhaka, Bangladesh', 'jobplace' ),
            },
            {
                id: 'is_remote',
                label: __( 'Remote friendly', 'jobplace' ),
                Edit: 'toggle',
                getValue: ( { item } ) => !! item.is_remote,
            },
            {
                id: 'experience_level',
                label: __( 'Experience level', 'jobplace' ),
                Edit: 'select',
                elements: EXPERIENCE_LEVELS,
                getValue: ( { item } ) => item.experience_level || '',
            },
            {
                id: 'vacancies',
                label: __( 'Vacancies', 'jobplace' ),
                type: 'integer',
                description: __(
                    'Optional. Number of open positions.',
                    'jobplace'
                ),
            },
            {
                id: 'is_featured',
                label: __( 'Feature this job', 'jobplace' ),
                Edit: 'toggle',
                getValue: ( { item } ) => !! item.is_featured,
            },
            {
                id: 'is_negotiable',
                label: __( 'Salary is negotiable', 'jobplace' ),
                Edit: 'toggle',
                getValue: ( { item } ) => !! item.is_negotiable,
            },
            {
                id: 'salary_min',
                label: __( 'Salary (min)', 'jobplace' ),
                type: 'integer',
            },
            {
                id: 'salary_max',
                label: __( 'Salary (max)', 'jobplace' ),
                type: 'integer',
            },
            {
                id: 'salary_currency',
                label: __( 'Currency', 'jobplace' ),
                Edit: 'select',
                elements: SALARY_CURRENCIES,
                getValue: ( { item } ) => item.salary_currency || 'USD',
            },
            {
                id: 'salary_period',
                label: __( 'Pay period', 'jobplace' ),
                Edit: 'select',
                elements: SALARY_PERIODS,
                getValue: ( { item } ) => item.salary_period || 'yearly',
            },
            {
                id: 'application_deadline',
                label: __( 'Application deadline', 'jobplace' ),
                description: __(
                    'Optional. Leave empty for an open-ended posting.',
                    'jobplace'
                ),
                Edit: ( { data, field, onChange: onFieldChange }: any ) => (
                    <DateField
                        label={ field.label }
                        help={ field.description }
                        value={ data.application_deadline || '' }
                        onChange={ ( value ) =>
                            onFieldChange( { [ field.id ]: value } )
                        }
                    />
                ),
            },
            {
                id: 'apply_url',
                label: __( 'Apply URL', 'jobplace' ),
                Edit: 'url',
                placeholder: __( 'https://example.com/apply', 'jobplace' ),
                description: __(
                    'Optional. External link where candidates apply.',
                    'jobplace'
                ),
            },
            {
                id: 'apply_email',
                label: __( 'Apply email', 'jobplace' ),
                Edit: 'email',
                placeholder: __( 'jobs@example.com', 'jobplace' ),
                description: __(
                    'Optional. Applications are sent to this address.',
                    'jobplace'
                ),
            },
            {
                id: 'description',
                label: __( 'Job description', 'jobplace' ),
                Edit: ( { data, field, onChange }: any ) => (
                    <BlockEditorField
                        label={ field.label }
                        value={ data.description || '' }
                        onChange={ ( html: string ) =>
                            onChange( { [ field.id ]: html } )
                        }
                    />
                ),
            },
        ],
        [ jobTypes, jobCategories ]
    );

    const row = ( id: string, children: string[] ) => ( {
        id,
        layout: { type: 'row' },
        children,
    } );

    const isNegotiable = !! form.is_negotiable;

    // When the salary is negotiable we hide the concrete compensation inputs.
    const compensationChildren: any[] = isNegotiable
        ? [ 'is_negotiable' ]
        : [
              'is_negotiable',
              row( 'row-salary', [ 'salary_min', 'salary_max' ] ),
              row( 'row-salary-meta', [ 'salary_currency', 'salary_period' ] ),
          ];

    // Left column: the bulk of the job content, laid out in compact two-up
    // rows so the cards stay short.
    const mainFormConfig: Form = {
        layout: { type: 'regular', labelPosition: 'top' },
        fields: [
            {
                id: 'section-details',
                label: __( 'Job details', 'jobplace' ),
                layout: { type: 'card', isCollapsible: false },
                children: [
                    'title',
                    row( 'row-org', [ 'company_id', 'job_type_id' ] ),
                    row( 'row-class', [ 'job_category_id', 'location' ] ),
                ],
            },
            {
                id: 'section-compensation',
                label: __( 'Compensation', 'jobplace' ),
                layout: { type: 'card', isCollapsible: false },
                children: compensationChildren,
            },
            {
                id: 'section-description',
                label: __( 'Description', 'jobplace' ),
                layout: { type: 'card', isCollapsible: false },
                children: [ 'description' ],
            },
        ],
    } as unknown as Form;

    // Right column: a short, compact settings rail.
    const sidebarFormConfig: Form = {
        layout: { type: 'regular', labelPosition: 'top' },
        fields: [
            {
                id: 'section-details-meta',
                label: __( 'Details', 'jobplace' ),
                layout: { type: 'card', isCollapsible: false },
                children: [
                    'is_featured',
                    'is_remote',
                    'experience_level',
                    'vacancies',
                ],
            },
            {
                id: 'section-apply',
                label: __( 'How to apply', 'jobplace' ),
                layout: { type: 'card', isCollapsible: false },
                children: [ 'application_deadline', 'apply_url', 'apply_email' ],
            },
        ],
    } as unknown as Form;

    const onChange = ( edits: Record< string, any > ) => {
        const next = { ...edits };

        if ( 'job_type_id' in next ) {
            next.job_type_id = Number( next.job_type_id );
        }
        if ( 'company_id' in next ) {
            next.company_id = Number( next.company_id );
        }
        if ( 'job_category_id' in next ) {
            next.job_category_id = Number( next.job_category_id );
        }
        if ( 'salary_min' in next ) {
            next.salary_min =
                next.salary_min === '' || next.salary_min === undefined
                    ? null
                    : Number( next.salary_min );
        }
        if ( 'salary_max' in next ) {
            next.salary_max =
                next.salary_max === '' || next.salary_max === undefined
                    ? null
                    : Number( next.salary_max );
        }

        // Turning on "negotiable" clears any entered salary figures.
        if ( 'is_negotiable' in next && next.is_negotiable ) {
            next.salary_min = null;
            next.salary_max = null;
        }

        setFormData( { ...form, ...next } );
    };

    if ( loadingJobs ) {
        return (
            <div
                style={ {
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '48px 0',
                } }
            >
                <Spinner />
            </div>
        );
    }

    return (
        <div className="jobplace-job-form">
            <div className="jobplace-job-form__main">
                <DataForm
                    data={ form }
                    fields={ fields }
                    form={ mainFormConfig }
                    onChange={ onChange }
                />
            </div>
            <aside className="jobplace-job-form__sidebar">
                <DataForm
                    data={ form }
                    fields={ fields }
                    form={ sidebarFormConfig }
                    onChange={ onChange }
                />
            </aside>
        </div>
    );
}
