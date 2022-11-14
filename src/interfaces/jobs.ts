/**
 * Internal dependencies.
 */
import { ISelect2Input } from '../components/inputs/Select2Input';

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
}

export interface IJobFormData extends IJob {}

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
