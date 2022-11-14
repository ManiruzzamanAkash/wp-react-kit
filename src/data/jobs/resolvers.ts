/**
 * Internal dependencies.
 */
import actions from './actions';
import {
    companiesDropdownEndpoint,
    jobsEndpoint,
    jobTypesEndpoint,
} from './endpoint';
import {
    ICompanyDropdown,
    IJobFilter,
    IJobTypes,
    IResponseGenerator,
} from '../../interfaces';
import { formatSelect2Data } from '../../utils/Select2Helper';
import { prepareJobDataForDatabase } from './utils';

const resolvers = {
    *getJobs(filters: IJobFilter) {
        if (filters === undefined) {
            filters = {};
        }

        const queryParam = new URLSearchParams(
            filters as URLSearchParams
        ).toString();

        const response: IResponseGenerator = yield actions.fetchFromAPIUnparsed(
            `${jobsEndpoint}?${queryParam}`
        );
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

    *getJobDetail(id: number) {
        yield actions.setLoadingJobs(true);
        const path = `${jobsEndpoint}/${id}`;
        const response = yield actions.fetchFromAPI(path);

        if (response.id) {
            const data = prepareJobDataForDatabase(response);

            yield actions.setFormData(data);
        }

        return actions.setLoadingJobs(false);
    },

    *getJobTypes() {
        const response: IResponseGenerator = yield actions.fetchFromAPIUnparsed(
            jobTypesEndpoint
        );

        const jobTypes: Array<IJobTypes> = response.data;

        yield actions.setJobTypes(formatSelect2Data(jobTypes));
    },

    *getCompaniesDropdown() {
        const response: IResponseGenerator = yield actions.fetchFromAPIUnparsed(
            companiesDropdownEndpoint
        );

        const companyDropdowns: Array<ICompanyDropdown> = response.data;

        yield actions.setCompanyDropdowns(formatSelect2Data(companyDropdowns));
    },
};

export default resolvers;
