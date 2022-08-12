/**
 * Internal dependencies.
 */
import { IJobs } from './interfaces';

const selectors = {
    getJobs(state: IJobs, filters: object) {
        const { jobs } = state;

        return jobs;
    },

    getLoadingJobs(state: IJobs) {
        const { loadingJobs } = state;

        return loadingJobs;
    },

    getTotalPage(state: IJobs) {
        const { totalPage } = state;

        return totalPage;
    },

    getTotal(state: IJobs) {
        const { total } = state;

        return total;
    },

    getFilter(state: IJobs) {
        const { filters } = state;

        return filters;
    },
};

export default selectors;
