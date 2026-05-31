import {
    IJobCategory,
    IJobCategoryFilter,
    IJobCategoryFormData,
    IResponseGenerator,
} from '../../interfaces';
import { jobCategoriesEndpoint } from './endpoint';
import * as Types from './types';

const actions = {
    setCategories( categories: IJobCategory[] ) {
        return {
            type: Types.GET_JOB_CATEGORIES,
            categories,
        };
    },

    setLoading( loading: boolean ) {
        return {
            type: Types.SET_LOADING_CATEGORIES,
            loading,
        };
    },

    setSaving( saving: boolean ) {
        return {
            type: Types.SET_SAVING_CATEGORIES,
            saving,
        };
    },

    setDeleting( deleting: boolean ) {
        return {
            type: Types.SET_DELETING_CATEGORIES,
            deleting,
        };
    },

    setFilterObject( filters: IJobCategoryFilter ) {
        return {
            type: Types.SET_CATEGORIES_FILTER,
            filters,
        };
    },

    setTotal( total: number ) {
        return {
            type: Types.SET_TOTAL_CATEGORIES,
            total,
        };
    },

    setTotalPage( totalPage: number ) {
        return {
            type: Types.SET_TOTAL_CATEGORIES_PAGE,
            totalPage,
        };
    },

    setCategoryStats( stats: { total: number } ) {
        return {
            type: Types.SET_CATEGORY_STATS,
            stats,
        };
    },

    *setFilters( filters: IJobCategoryFilter = {} ) {
        yield actions.setLoading( true );
        yield actions.setFilterObject( filters );

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();
        const path = `${ jobCategoriesEndpoint }?${ queryParam }`;
        const response: {
            headers: Headers;
            data: IJobCategory[];
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
        yield actions.setCategories( response.data );
        return actions.setLoading( false );
    },

    *saveCategory( payload: IJobCategoryFormData ) {
        yield actions.setSaving( true );

        try {
            const data = { ...payload };
            delete ( data as { _links?: unknown } )._links;

            let response: IResponseGenerator = {};
            if ( payload.id > 0 ) {
                response = yield {
                    type: Types.UPDATE_JOB_CATEGORY,
                    payload: data,
                };
            } else {
                response = yield {
                    type: Types.CREATE_JOB_CATEGORY,
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

    *deleteCategories( ids: number[] ) {
        yield actions.setDeleting( true );

        try {
            const response: IResponseGenerator = yield {
                type: Types.DELETE_JOB_CATEGORIES,
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
