/**
 * External dependencies
 */
import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import {
    createDefaultJobsView,
    filtersToApiParams,
    searchParamsFromView,
    viewFromSearchParams,
} from '../../utils/job-list-filters';
import './jobs-page.scss';

export default function JobsPage() {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { setFilters } = useDispatch( store );

    const fields = useJobFields();
    const actions = useJobActions();

    const [ view, setView ] = useState< View >( () =>
        viewFromSearchParams( searchParams )
    );

    const jobs: IJob[] = useSelect( ( select ) => select( store ).getJobs(), [] );
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

    const filtersKey = JSON.stringify( view.filters ?? [] );
    const isFirstRender = useRef( true );

    useEffect( () => {
        setFilters( filtersToApiParams( view ) );
    }, [ view.page, view.perPage, view.search, filtersKey, setFilters ] );

    useEffect( () => {
        if ( isFirstRender.current ) {
            isFirstRender.current = false;
            return;
        }

        setSearchParams( searchParamsFromView( view ), { replace: true } );
    }, [ view.page, view.perPage, view.search, filtersKey, setSearchParams ] );

    useEffect( () => {
        const nextView = viewFromSearchParams( searchParams );

        setView( ( currentView ) => {
            const currentParams = searchParamsFromView( currentView ).toString();
            const nextParams = searchParamsFromView( nextView ).toString();

            if ( currentParams === nextParams ) {
                return currentView;
            }

            return nextView;
        } );
    }, [ searchParams ] );

    const onChangeView = useCallback( ( nextView: View ) => {
        setView( ( currentView ) => {
            const filtersChanged =
                JSON.stringify( currentView.filters ?? [] ) !==
                JSON.stringify( nextView.filters ?? [] );
            const searchChanged = currentView.search !== nextView.search;

            if ( filtersChanged || searchChanged ) {
                return {
                    ...nextView,
                    page: 1,
                };
            }

            return nextView;
        } );
    }, [] );

    const paginationInfo = useMemo(
        () => ( { totalItems: total, totalPages } ),
        [ total, totalPages ]
    );

    const hasActiveFilters =
        Boolean( view.search ) || ( view.filters?.length ?? 0 ) > 0;

    const clearFilters = () => {
        setView( createDefaultJobsView() );
    };

    return (
        <div className="wprk-dataviews-page">
            <header className="wprk-dataviews-page__header">
                <div className="wprk-dataviews-page__heading">
                    <h2>{ __( 'Jobs', 'jobplace' ) }</h2>
                    <p>
                        { __(
                            'Browse, filter, and manage every job posting.',
                            'jobplace'
                        ) }
                    </p>
                </div>
                <div className="wprk-dataviews-page__actions">
                    { hasActiveFilters ? (
                        <Button variant="secondary" onClick={ clearFilters }>
                            { __( 'Clear filters', 'jobplace' ) }
                        </Button>
                    ) : null }
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
                onChangeView={ onChangeView }
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
