/**
 * Internal dependencies.
 */
import actions from './actions';
import { jobsBasePath } from './endpoint';

const resolvers = {
    *getJobs(filters) {
        if (filters === undefined) {
            filters = {};
        }

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const path = `${jobsBasePath}?${queryParam}`;
        const response = yield actions.fetchFromAPIUnparsed(path);
        let totalPage = 0;
        let totalCount = 0;

        if (response.headers !== undefined) {
            totalPage = response.headers.get('X-WP-TotalPages');
            totalCount = response.headers.get('X-WP-Total');
        }

        yield actions.setJobs(response.data);
        yield actions.setTotalPage(totalPage);
        yield actions.setTotal(totalCount);
        return actions.setLoadingJobs(false);
    },
};

export default resolvers;
