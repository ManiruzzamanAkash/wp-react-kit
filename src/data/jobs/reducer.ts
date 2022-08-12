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
    }

    return state;
};

export default reducer;
