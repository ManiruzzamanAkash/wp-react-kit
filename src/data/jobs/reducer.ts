/**
 * Internal dependencies.
 */
import * as Types from './types';
import { jobDefaultState } from './default-state';

const reducer = (state = jobDefaultState, action: any) => {
    switch (action.type) {
        case Types.GET_JOBS:
            return {
                ...state,
                jobs: action.jobs,
            };

        case Types.GET_JOB_DETAIL:
            return {
                ...state,
                job: action.job,
            };

        case Types.GET_JOB_TYPES:
            return {
                ...state,
                jobTypes: action.jobTypes,
            };

        case Types.GET_COMPANIES_DROPDOWN:
            return {
                ...state,
                companyDropdowns: action.companyDropdowns,
            };

        case Types.SET_LOADING_JOBS:
            return {
                ...state,
                loadingJobs: action.loadingJobs,
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

        case Types.SET_JOB_FORM_DATA:
            return {
                ...state,
                form: action.form,
            };

        case Types.SET_JOBS_SAVING:
            return {
                ...state,
                jobsSaving: action.jobsSaving,
            };
    }

    return state;
};

export default reducer;
