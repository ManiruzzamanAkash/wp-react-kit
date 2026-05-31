import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { DataViews } from '@wordpress/dataviews/wp';
import type { View } from '@wordpress/dataviews/wp';
import { __ } from '@wordpress/i18n';
import Notices from '../../components/Notices';
import jobCategoriesStore from '../../data/job-categories';
import { useCategoryFields } from '../../components/job-categories/category-fields';
import { useCategoryActions } from '../../components/job-categories/category-actions';
import CategoryDrawer from '../../components/job-categories/CategoryDrawer';
import { IJobCategory } from '../../interfaces';
import '../jobs/jobs-page.scss';

const DEFAULT_PER_PAGE = 10;

export default function JobCategoriesPage() {
    const { setFilters } = useDispatch( jobCategoriesStore );

    const [ drawerOpen, setDrawerOpen ] = useState( false );
    const [ editingCategory, setEditingCategory ] =
        useState< IJobCategory | null >( null );

    const fields = useCategoryFields();
    const actions = useCategoryActions( {
        onEdit: ( category ) => {
            setEditingCategory( category );
            setDrawerOpen( true );
        },
    } );

    const [ view, setView ] = useState< View >( {
        type: 'table',
        search: '',
        page: 1,
        perPage: DEFAULT_PER_PAGE,
        fields: [ 'slug', 'description', 'created_at' ],
        titleField: 'name',
        filters: [],
        sort: {},
        layout: {},
    } );

    const categories: IJobCategory[] = useSelect(
        ( select ) => select( jobCategoriesStore ).getCategories(),
        []
    );
    const total: number = useSelect(
        ( select ) => Number( select( jobCategoriesStore ).getTotal() ) || 0,
        []
    );
    const totalPages: number = useSelect(
        ( select ) =>
            Number( select( jobCategoriesStore ).getTotalPage() ) || 0,
        []
    );
    const isLoading: boolean = useSelect(
        ( select ) => select( jobCategoriesStore ).getLoading(),
        []
    );

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

    const openCreateDrawer = () => {
        setEditingCategory( null );
        setDrawerOpen( true );
    };

    const closeDrawer = () => {
        setDrawerOpen( false );
        setEditingCategory( null );
    };

    const onSaved = async () => {
        await setFilters( {
            page: view.page ?? 1,
            per_page: view.perPage ?? DEFAULT_PER_PAGE,
            search: view.search ?? '',
        } );
    };

    return (
        <div className="wprk-dataviews-page">
            <header className="wprk-dataviews-page__header">
                <div className="wprk-dataviews-page__heading">
                    <h2>{ __( 'Job categories', 'jobplace' ) }</h2>
                    <p>
                        { __(
                            'Manage categories used on job create and edit forms.',
                            'jobplace'
                        ) }
                    </p>
                </div>
                <div className="wprk-dataviews-page__actions">
                    <Button variant="primary" onClick={ openCreateDrawer }>
                        { __( 'Add category', 'jobplace' ) }
                    </Button>
                </div>
            </header>

            <DataViews
                data={ categories }
                fields={ fields }
                view={ view }
                onChangeView={ setView }
                actions={ actions }
                paginationInfo={ paginationInfo }
                isLoading={ isLoading }
                getItemId={ ( item: IJobCategory ) => String( item.id ) }
                defaultLayouts={ { table: {} } }
            />

            <CategoryDrawer
                isOpen={ drawerOpen }
                category={ editingCategory }
                onClose={ closeDrawer }
                onSaved={ onSaved }
            />

            <Notices />
        </div>
    );
}
