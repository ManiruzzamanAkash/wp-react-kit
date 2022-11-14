/**
 * Internal dependencies.
 */
import { Select2SingleRow } from '../../components/inputs/Select2Input';
import { IJob, IJobFormData, IResponseGenerator } from '../../interfaces';
import { jobsEndpoint } from './endpoint';
import * as Types from './types';
import { jobDefaultFormData } from './default-state';

const actions = {
    setJobs(jobs: Array<IJob>) {
        return {
            type: Types.GET_JOBS,
            jobs,
        };
    },

    setJobDetail(job: IJob) {
        return {
            type: Types.GET_JOB_DETAIL,
            job,
        };
    },

    setCompanyDropdowns(companyDropdowns: Array<Select2SingleRow>) {
        return {
            type: Types.GET_COMPANIES_DROPDOWN,
            companyDropdowns,
        };
    },

    setJobTypes(jobTypes: Array<Select2SingleRow>) {
        return {
            type: Types.GET_JOB_TYPES,
            jobTypes,
        };
    },

    setFormData(form: IJobFormData) {
        return {
            type: Types.SET_JOB_FORM_DATA,
            form,
        };
    },

    setLoadingJobs(loadingJobs: boolean) {
        return {
            type: Types.SET_LOADING_JOBS,
            loadingJobs,
        };
    },

    setSavingJobs(jobsSaving: boolean) {
        return {
            type: Types.SET_JOBS_SAVING,
            jobsSaving,
        };
    },

    setDeletingJobs(jobsDeleting: boolean) {
        return {
            type: Types.SET_JOBS_DELETING,
            jobsDeleting,
        };
    },

    *setFilters(filters = {}) {
        yield actions.setLoadingJobs(true);
        yield actions.setFilterObject(filters);

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const path = `${jobsEndpoint}?${queryParam}`;
        const response: {
            headers: Headers;
            data;
        } = yield actions.fetchFromAPIUnparsed(path);

        let totalPage = 0;
        let totalCount = 0;

        if (response.headers !== undefined) {
            totalPage = parseInt(response.headers.get('X-WP-TotalPages'));
            totalCount = parseInt(response.headers.get('X-WP-Total'));
        }

        yield actions.setTotalPage(totalPage);
        yield actions.setTotal(totalCount);
        yield actions.setJobs(response.data);
        return actions.setLoadingJobs(false);
    },

    setFilterObject(filters: object) {
        return {
            type: Types.SET_JOBS_FILTER,
            filters,
        };
    },

    *saveJob(payload: IJobFormData) {
        yield actions.setSavingJobs(true);

        try {
            let response: IResponseGenerator = {};
            if (payload.id > 0) {
                response = yield {
                    type: Types.UPDATE_JOBS,
                    payload,
                };
            } else {
                response = yield {
                    type: Types.CREATE_JOBS,
                    payload,
                };
            }

            if (response?.id > 0) {
                yield actions.setFormData(jobDefaultFormData);
                yield actions.setSavingJobs(false);
            }
        } catch (error) {
            yield actions.setSavingJobs(false);
        }
    },

    setTotalPage(totalPage: number) {
        return {
            type: Types.SET_TOTAL_JOBS_PAGE,
            totalPage,
        };
    },

    setTotal(total: number) {
        return {
            type: Types.SET_TOTAL_JOBS,
            total,
        };
    },

    fetchFromAPI(path: string) {
        return {
            type: Types.FETCH_FROM_API,
            path,
        };
    },

    fetchFromAPIUnparsed(path: string) {
        return {
            type: Types.FETCH_FROM_API_UNPARSED,
            path,
        };
    },

    *deleteJobs(payload: Array<number>) {
        yield actions.setDeletingJobs(true);

        try {
            const responseDeleteJobs: IResponseGenerator = yield {
                type: Types.DELETE_JOBS,
                payload,
            };

            if (responseDeleteJobs?.total > 0) {
                yield actions.setFilters({});
            }

            yield actions.setDeletingJobs(false);
        } catch (error) {
            yield actions.setDeletingJobs(false);
        }
    },
};

export default actions;
