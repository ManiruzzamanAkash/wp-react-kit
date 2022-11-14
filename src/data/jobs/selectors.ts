/**
 * Internal dependencies.
 */

import { IJobs } from '../../interfaces';

const selectors = {
    getJobs(state: IJobs) {
        const { jobs } = state;

        return jobs;
    },

    getJobDetail(state: IJobs) {
        const { job } = state;

        return job;
    },

    getJobTypes(state: IJobs) {
        const { jobTypes } = state;

        return jobTypes;
    },

    getJobsSaving(state: IJobs) {
        const { jobsSaving } = state;

        return jobsSaving;
    },

    getJobsDeleting(state: IJobs) {
        const { jobsDeleting } = state;

        return jobsDeleting;
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

    getForm(state: IJobs) {
        const { form } = state;

        return form;
    },

    getCompaniesDropdown(state: IJobs) {
        const { companyDropdowns } = state;

        return companyDropdowns;
    },
};

export default selectors;
