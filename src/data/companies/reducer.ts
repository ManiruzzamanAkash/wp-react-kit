import * as Types from './types';
import { companiesDefaultState } from './default-state';

const reducer = ( state = companiesDefaultState, action: any ) => {
    switch ( action.type ) {
        case Types.GET_COMPANIES:
            return {
                ...state,
                companies: action.companies,
            };

        case Types.SET_LOADING_COMPANIES:
            return {
                ...state,
                loading: action.loading,
            };

        case Types.SET_SAVING_COMPANIES:
            return {
                ...state,
                saving: action.saving,
            };

        case Types.SET_DELETING_COMPANIES:
            return {
                ...state,
                deleting: action.deleting,
            };

        case Types.SET_COMPANIES_FILTER:
            return {
                ...state,
                filters: action.filters,
            };

        case Types.SET_TOTAL_COMPANIES:
            return {
                ...state,
                total: action.total,
            };

        case Types.SET_TOTAL_COMPANIES_PAGE:
            return {
                ...state,
                totalPage: action.totalPage,
            };

        case Types.SET_COMPANY_STATS:
            return {
                ...state,
                stats: action.stats,
            };
    }

    return state;
};

export default reducer;
