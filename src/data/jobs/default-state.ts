/**
 * Internal dependencies.
 */
import { IJobs } from '../../interfaces';

export const jobDefaultFormData = {
    id: 0,
    title: '',
    description: '',
    job_type_id: 0,
    company_id: 0,
    is_active: 1,
};

export const jobDefaultState: IJobs = {
    jobs: [],
    job: {
        ...jobDefaultFormData,
    },
    jobTypes: [],
    loadingJobs: false,
    jobsSaving: false,
    jobsDeleting: false,
    totalPage: 0,
    total: 0,
    filters: {},
    form: {
        ...jobDefaultFormData,
    },
    companyDropdowns: [],
};
