/**
 * Internal dependencies.
 */
import { ISelect2Input } from './select2';

export interface IJob {
    /**
     * Job ID.
     */
    id: number;

    /**
     * Job title.
     */
    title: string;

    /**
     * Job description.
     */
    description: string;

    /**
     * Job Type ID.
     */
    job_type_id: number;

    /**
     * Company ID.
     */
    company_id: number;

    /**
     * Status published or draft
     */
    is_active: boolean | number;

    /**
     * Job location (city / region).
     */
    location?: string;

    /**
     * Whether the job can be done remotely.
     */
    is_remote?: boolean | number;

    /**
     * Job category or department.
     */
    category?: string;

    /**
     * Required experience level.
     */
    experience_level?: '' | 'entry' | 'mid' | 'senior' | 'lead';

    /**
     * Number of open positions.
     */
    vacancies?: number;

    /**
     * Minimum salary.
     */
    salary_min?: number | null;

    /**
     * Maximum salary.
     */
    salary_max?: number | null;

    /**
     * Salary currency code.
     */
    salary_currency?: string;

    /**
     * Salary period (hourly / monthly / yearly).
     */
    salary_period?: 'hourly' | 'monthly' | 'yearly';

    /**
     * Whether the salary is negotiable.
     */
    is_negotiable?: boolean | number;

    /**
     * Application deadline (Y-m-d).
     */
    application_deadline?: string | null;

    /**
     * External application URL.
     */
    apply_url?: string;

    /**
     * Application email address.
     */
    apply_email?: string;

    /**
     * Whether the job is featured.
     */
    is_featured?: boolean | number;

    /**
     * Created at timestamp.
     */
    created_at?: string;

    /**
     * Updated at timestamp.
     */
    updated_at?: string;

    /**
     * Job status.
     */
    status?: 'draft' | 'published' | 'trashed';

    /**
     * Expanded job type object returned by the REST API.
     */
    job_type?: {
        id: number;
        name: string;
    };

    /**
     * Expanded company object returned by the REST API.
     */
    company?: {
        id: number;
        name: string;
        avatar_url?: string;
    };

    /**
     * REST API HAL links (present on read responses).
     */
    _links?: Record< string, unknown >;
}

export interface IJobFormData extends IJob {}

export interface IJobStats {
    /**
     * Total number of jobs.
     */
    total: number;

    /**
     * Number of published jobs.
     */
    published: number;

    /**
     * Number of draft jobs.
     */
    draft: number;

    /**
     * Number of featured jobs.
     */
    featured: number;

    /**
     * Number of remote jobs.
     */
    remote: number;

    /**
     * Number of jobs with a negotiable salary.
     */
    negotiable: number;
}

export interface IJobs {
    /**
     * All company list dropdown as array of {label, value}.
     */
    companyDropdowns: Array<ISelect2Input>;

    /**
     * All jobs as array of IJob.
     */
    jobs: Array<IJob>;

    /**
     * Aggregated job statistics for the dashboard.
     */
    stats: IJobStats | null;

    /**
     * Job detail.
     */
    job: IJob;

    /**
     * Job saving or not.
     */
    jobsSaving: boolean;

    /**
     * Job deleting or not.
     */
    jobsDeleting: boolean;

    /**
     * All job types as array of {label, value}.
     */
    jobTypes: Array<ISelect2Input>;

    /**
     * Is jobs loading.
     */
    loadingJobs: boolean;

    /**
     * Count total page.
     */
    totalPage: number;

    /**
     * Count total number of data.
     */
    total: number;

    /**
     * Job list filter.
     */
    filters: object;

    /**
     * Job Form data.
     */
    form: IJobFormData;
}

export interface IJobFilter {
    /**
     * Job filter by page no.
     */
    page?: number;

    /**
     * Job search URL params.
     */
    search?: string;
}

export interface IJobTypes {
    /**
     * Job type id.
     */
    id: number;

    /**
     * Job type name.
     */
    name: string;

    /**
     * Job type slug.
     */
    slug: string;

    /**
     * Job type description.
     */
    description: string | null;
}

export interface ICompanyDropdown {
    /**
     * Company id.
     */
    id: number;

    /**
     * Company name.
     */
    name: string;

    /**
     * Company email.
     */
    email: string;

    /**
     * Username.
     */
    username: string;
}
