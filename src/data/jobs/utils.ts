/**
 * Internal dependencies.
 */
import { IJob } from '../../interfaces';

export const prepareJobDataForDatabase = (job: IJob) => {
    const data = {
        ...job,
        job_type_id: job.job_type?.id ?? job.job_type_id,
        job_category_id: job.job_category?.id ?? job.job_category_id ?? 0,
        company_id: job.company?.id ?? job.company_id,
    };

    if (job.is_active !== undefined) {
        data.is_active = job.is_active;
    } else {
        data.is_active = 1;
    }

    // Remove unnecessary data.
    delete data.company;
    delete data.job_type;
    delete data.job_category;
    delete data.status;
    delete data._links;

    return data;
};
