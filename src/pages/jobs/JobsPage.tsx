/**
 * External dependencies
 */
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { useNavigate } from 'react-router-dom';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { DataViews } from '@wordpress/dataviews/wp';
import type { View } from '@wordpress/dataviews/wp';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Notices from '../../components/Notices';
import store from '../../data/jobs';
import { useJobFields } from '../../components/jobs/job-fields';
import { useJobActions } from '../../components/jobs/job-actions';
import { IJob } from '../../interfaces';
import './jobs-page.scss';

const DEFAULT_PER_PAGE = 10;

export default function JobsPage() {
    const navigate = useNavigate();
    const { setFilters } = useDispatch( store );

    const fields = useJobFields();
    const actions = useJobActions();

    const [ view, setView ] = useState< View >( {
        type: 'table',
        search: '',
        page: 1,
        perPage: DEFAULT_PER_PAGE,
        fields: [
            'job_type',
            'company',
            'location',
            'salary',
            'vacancies',
            'posted',
            'status',
        ],
        titleField: 'title',
        filters: [],
        sort: {},
        layout: {},
    } );

    const jobs: IJob[] = useSelect(
        ( select ) => select( store ).getJobs( {} ),
        []
    );
    const total: number = useSelect(
        ( select ) => Number( select( store ).getTotal() ) || 0,
        []
    );
    const totalPages: number = useSelect(
        ( select ) => Number( select( store ).getTotalPage() ) || 0,
        []
    );
    const isLoading: boolean = useSelect(
        ( select ) => select( store ).getLoadingJobs(),
        []
    );

    // The jobs store handles loading; the initial fetch is performed by the
    // `getJobs` resolver, so skip the first effect run to avoid a double load.
    const isFirstRender = useRef( true );
    useEffect( () => {
        if ( isFirstRender.current ) {
            isFirstRender.current = false;
            return;
        }

        setFilters( {
            page: view.page ?? 1,
            per_page: view.perPage ?? DEFAULT_PER_PAGE,
            search: view.search ?? '',
        } );
    }, [ view.page, view.perPage, view.search, setFilters ] );

    const paginationInfo = useMemo(
        () => ( { totalItems: total, totalPages } ),
        [ total, totalPages ]
    );

    return (
        <div className="wprk-dataviews-page">
            <header className="wprk-dataviews-page__header">
                <div className="wprk-dataviews-page__heading">
                    <h2>{ __( 'Jobs', 'jobplace' ) }</h2>
                    <p>{ __( 'A list of all jobs.', 'jobplace' ) }</p>
                </div>
                <div className="wprk-dataviews-page__actions">
                    <Button
                        variant="primary"
                        onClick={ () => navigate( '/jobs/new' ) }
                    >
                        { __( 'Add Job', 'jobplace' ) }
                    </Button>
                </div>
            </header>

            <DataViews
                data={ jobs }
                fields={ fields }
                view={ view }
                onChangeView={ setView }
                actions={ actions }
                paginationInfo={ paginationInfo }
                isLoading={ isLoading }
                getItemId={ ( item: IJob ) => String( item.id ) }
                defaultLayouts={ { table: {} } }
            />
            <Notices />
        </div>
    );
}
