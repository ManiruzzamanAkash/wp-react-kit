import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { DataViews } from '@wordpress/dataviews/wp';
import type { View } from '@wordpress/dataviews/wp';
import { __ } from '@wordpress/i18n';
import Notices from '../../components/Notices';
import companiesStore from '../../data/companies';
import { useCompanyFields } from '../../components/companies/company-fields';
import { useCompanyActions } from '../../components/companies/company-actions';
import CompanyDrawer from '../../components/companies/CompanyDrawer';
import { ICompany } from '../../interfaces';
import '../jobs/jobs-page.scss';

const DEFAULT_PER_PAGE = 10;

export default function CompaniesPage() {
    const { setFilters } = useDispatch( companiesStore );

    const [ drawerOpen, setDrawerOpen ] = useState( false );
    const [ editingCompany, setEditingCompany ] = useState< ICompany | null >(
        null
    );

    const fields = useCompanyFields();
    const actions = useCompanyActions( {
        onEdit: ( company ) => {
            setEditingCompany( company );
            setDrawerOpen( true );
        },
    } );

    const [ view, setView ] = useState< View >( {
        type: 'table',
        search: '',
        page: 1,
        perPage: DEFAULT_PER_PAGE,
        fields: [ 'slug', 'email', 'website', 'description', 'created_at' ],
        titleField: 'name',
        filters: [],
        sort: {},
        layout: {},
    } );

    const companies: ICompany[] = useSelect(
        ( select ) => select( companiesStore ).getCompanies(),
        []
    );
    const total: number = useSelect(
        ( select ) => Number( select( companiesStore ).getTotal() ) || 0,
        []
    );
    const totalPages: number = useSelect(
        ( select ) => Number( select( companiesStore ).getTotalPage() ) || 0,
        []
    );
    const isLoading: boolean = useSelect(
        ( select ) => select( companiesStore ).getLoading(),
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
        setEditingCompany( null );
        setDrawerOpen( true );
    };

    const closeDrawer = () => {
        setDrawerOpen( false );
        setEditingCompany( null );
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
                    <h2>{ __( 'Companies', 'jobplace' ) }</h2>
                    <p>
                        { __(
                            'Manage companies that can be assigned to job postings.',
                            'jobplace'
                        ) }
                    </p>
                </div>
                <div className="wprk-dataviews-page__actions">
                    <Button variant="primary" onClick={ openCreateDrawer }>
                        { __( 'Add company', 'jobplace' ) }
                    </Button>
                </div>
            </header>

            <DataViews
                data={ companies }
                fields={ fields }
                view={ view }
                onChangeView={ setView }
                actions={ actions }
                paginationInfo={ paginationInfo }
                isLoading={ isLoading }
                getItemId={ ( item: ICompany ) => String( item.id ) }
                defaultLayouts={ { table: {} } }
            />

            <CompanyDrawer
                isOpen={ drawerOpen }
                company={ editingCompany }
                onClose={ closeDrawer }
                onSaved={ onSaved }
            />

            <Notices />
        </div>
    );
}
