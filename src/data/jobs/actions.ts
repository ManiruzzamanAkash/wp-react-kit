/**
 * Internal dependencies.
 */
import { jobsBasePath } from './endpoint';
import * as Types from './types';

const actions = {
    setJobs(jobs) {
        return {
            type: Types.GET_JOBS,
            jobs,
        };
    },

    setLoadingJobs(loading) {
        return {
            type: Types.SET_LOADING_JOBS,
            loading,
        };
    },

    *setFilters(filters = {}) {
        // yield actions.setLoading(true);
        // yield actions.setFilterObject(filters);

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const path = `${jobsBasePath}?${queryParam}`;
        const response: {
            headers: Headers;
            data;
        } = yield actions.fetchFromAPIUnparsed(path);

        // let totalPage = 0;
        // let totalCount = 0;

        // if (response.headers !== undefined) {
        //     totalPage = parseInt(response.headers.get('X-WP-TotalPages'));
        //     totalCount = parseInt(response.headers.get('X-WP-Total'));
        // }

        // yield actions.setTotalPage(totalPage);
        // yield actions.setTotal(totalCount);
        return actions.setLoadingJobs(false);
        yield actions.setJobs(response.data);
    },

    // setFilterObject(filters: object) {
    //     return {
    //         type: 'SET_FILTERS',
    //         filters,
    //     };
    // },

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
};

export default actions;