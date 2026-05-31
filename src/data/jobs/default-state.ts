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
    location: '',
    is_remote: 0,
    category: '',
    job_category_id: 0,
    experience_level: '' as const,
    vacancies: 1,
    salary_min: null,
    salary_max: null,
    salary_currency: 'USD',
    salary_period: 'yearly' as const,
    is_negotiable: 0,
    application_deadline: null,
    apply_url: '',
    apply_email: '',
    is_featured: 0,
};

export const jobDefaultState: IJobs = {
    jobs: [],
    stats: null,
    job: {
        ...jobDefaultFormData,
    },
    jobTypes: [],
    jobCategories: [],
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
