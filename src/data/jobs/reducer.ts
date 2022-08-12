/**
 * Internal dependencies.
 */
import * as Types from './types';
import { jobDefaultState } from '.';

const reducer = (state = jobDefaultState, action) => {
    switch (action.type) {
        case Types.GET_JOBS:
            return {
                ...state,
                jobs: action.jobs,
            };

        case Types.SET_LOADING_JOBS:
            return {
                ...state,
                loadingJobs: action.loading,
            };

        case Types.SET_TOTAL_JOBS:
            return {
                ...state,
                total: action.total,
            };

        case Types.SET_TOTAL_JOBS_PAGE:
            return {
                ...state,
                totalPage: action.totalPage,
            };

        case Types.SET_JOBS_FILTER:
            return {
                ...state,
                filters: action.filters,
            };
    }

    return state;
};

export default reducer;
