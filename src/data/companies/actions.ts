import {
    ICompany,
    ICompanyFilter,
    ICompanyFormData,
    IResponseGenerator,
} from '../../interfaces';
import { companiesEndpoint, companiesStatsEndpoint } from './endpoint';
import * as Types from './types';

const actions = {
    setCompanies( companies: ICompany[] ) {
        return {
            type: Types.GET_COMPANIES,
            companies,
        };
    },

    setLoading( loading: boolean ) {
        return {
            type: Types.SET_LOADING_COMPANIES,
            loading,
        };
    },

    setSaving( saving: boolean ) {
        return {
            type: Types.SET_SAVING_COMPANIES,
            saving,
        };
    },

    setDeleting( deleting: boolean ) {
        return {
            type: Types.SET_DELETING_COMPANIES,
            deleting,
        };
    },

    setFilterObject( filters: ICompanyFilter ) {
        return {
            type: Types.SET_COMPANIES_FILTER,
            filters,
        };
    },

    setTotal( total: number ) {
        return {
            type: Types.SET_TOTAL_COMPANIES,
            total,
        };
    },

    setTotalPage( totalPage: number ) {
        return {
            type: Types.SET_TOTAL_COMPANIES_PAGE,
            totalPage,
        };
    },

    setCompanyStats( stats: { total: number } ) {
        return {
            type: Types.SET_COMPANY_STATS,
            stats,
        };
    },

    *setFilters( filters: ICompanyFilter = {} ) {
        yield actions.setLoading( true );
        yield actions.setFilterObject( filters );

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();
        const path = `${ companiesEndpoint }?${ queryParam }`;
        const response: {
            headers: Headers;
            data: ICompany[];
        } = yield actions.fetchFromAPIUnparsed( path );

        let totalPage = 0;
        let totalCount = 0;

        if ( response.headers !== undefined ) {
            totalPage = parseInt(
                response.headers.get( 'X-WP-TotalPages' ) || '0',
                10
            );
            totalCount = parseInt(
                response.headers.get( 'X-WP-Total' ) || '0',
                10
            );
        }

        yield actions.setTotalPage( totalPage );
        yield actions.setTotal( totalCount );
        yield actions.setCompanies( response.data );
        return actions.setLoading( false );
    },

    *saveCompany( payload: ICompanyFormData ) {
        yield actions.setSaving( true );

        try {
            const data = { ...payload };
            delete ( data as { _links?: unknown } )._links;

            let response: IResponseGenerator = {};
            if ( payload.id > 0 ) {
                response = yield {
                    type: Types.UPDATE_COMPANY,
                    payload: data,
                };
            } else {
                response = yield {
                    type: Types.CREATE_COMPANY,
                    payload: data,
                };
            }

            yield actions.setSaving( false );
            return response;
        } catch ( error ) {
            yield actions.setSaving( false );
            throw error;
        }
    },

    *deleteCompanies( ids: number[] ) {
        yield actions.setDeleting( true );

        try {
            const response: IResponseGenerator = yield {
                type: Types.DELETE_COMPANIES,
                payload: { ids },
            };

            yield actions.setDeleting( false );
            return response;
        } catch ( error ) {
            yield actions.setDeleting( false );
            throw error;
        }
    },

    fetchFromAPI( path: string ) {
        return {
            type: Types.FETCH_FROM_API,
            path,
        };
    },

    fetchFromAPIUnparsed( path: string ) {
        return {
            type: Types.FETCH_FROM_API_UNPARSED,
            path,
        };
    },
};

export default actions;
