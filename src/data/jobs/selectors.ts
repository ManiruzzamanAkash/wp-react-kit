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
};

export default selectors;
