import * as Types from './types';
import { jobCategoriesDefaultState } from './default-state';

const reducer = ( state = jobCategoriesDefaultState, action: any ) => {
    switch ( action.type ) {
        case Types.GET_JOB_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
            };

        case Types.SET_LOADING_CATEGORIES:
            return {
                ...state,
                loading: action.loading,
            };

        case Types.SET_SAVING_CATEGORIES:
            return {
                ...state,
                saving: action.saving,
            };

        case Types.SET_DELETING_CATEGORIES:
            return {
                ...state,
                deleting: action.deleting,
            };

        case Types.SET_CATEGORIES_FILTER:
            return {
                ...state,
                filters: action.filters,
            };

        case Types.SET_TOTAL_CATEGORIES:
            return {
                ...state,
                total: action.total,
            };

        case Types.SET_TOTAL_CATEGORIES_PAGE:
            return {
                ...state,
                totalPage: action.totalPage,
            };
    }

    return state;
};

export default reducer;
