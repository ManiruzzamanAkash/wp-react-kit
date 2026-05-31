/**
 * Internal dependencies.
 */
import actions from './actions';
import {
    companiesDropdownEndpoint,
    jobCategoriesEndpoint,
    jobsEndpoint,
    jobsStatsEndpoint,
    jobTypesEndpoint,
} from './endpoint';
import {
    ICompanyDropdown,
    IJobTypes,
    IResponseGenerator,
} from '../../interfaces';
import { IJobCategory } from '../../interfaces/job-categories';
import { formatSelect2Data } from '../../utils/Select2Helper';
import { prepareJobDataForDatabase } from './utils';

const resolvers = {
    *getJobStats() {
        const response: IResponseGenerator = yield actions.fetchFromAPI(
            jobsStatsEndpoint
        );

        yield actions.setJobStats(response);
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

    *getJobCategories() {
        const response: IResponseGenerator = yield actions.fetchFromAPIUnparsed(
            `${ jobCategoriesEndpoint }?per_page=100&page=1&orderby=name&order=ASC`
        );

        const jobCategories: Array<IJobCategory> = response.data;

        yield actions.setJobCategories(formatSelect2Data(jobCategories));
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
