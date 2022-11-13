/**
 * External dependencies.
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import JobCard from './JobCard';
import JobSubmit from './JobSubmit';
import jobStore from '../../data/jobs';
import JobFormSidebar from './JobFormSidebar';
import { IInputResponse, Input } from '../inputs/Input';
import { Select2SingleRow } from '../inputs/Select2Input';
import { IJob, IJobFormData } from '../../interfaces';

type Props = {
    job?: IJob;
};

export default function JobForm({ job }: Props) {
    const dispatch = useDispatch();
    const jobTypes: Array<Select2SingleRow> = useSelect(
        (select) => select(jobStore).getJobTypes(),
        []
    );

    const companyDropdowns: Array<Select2SingleRow> = useSelect(
        (select) => select(jobStore).getCompaniesDropdown(),
        []
    );

    const form: IJobFormData = useSelect(
        (select) => select(jobStore).getForm(),
        []
    );

    const loadingJobs: boolean = useSelect(
        (select) => select(jobStore).getLoadingJobs(),
        []
    );

    const onChange = (input: IInputResponse) => {
        dispatch(jobStore).setFormData({
            ...form,
            [input.name]:
                typeof input.value === 'object'
                    ? input.value?.value
                    : input.value,
        });
    };

    return (
        <div className="mt-10">
            <form>
                <div className="flex flex-col md:flex-row">
                    <div className="md:basis-1/5">
                        <JobFormSidebar loading={loadingJobs} />
                    </div>

                    {loadingJobs ? (
                        <div className="md:basis-4/5">
                            <JobCard>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                            </JobCard>
                            <JobCard>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                            </JobCard>
                        </div>
                    ) : (
                        <>
                            <div className="md:basis-4/5">
                                <JobCard className="job-general-info">
                                    <Input
                                        type="text"
                                        label={__('Job title', 'jobplace')}
                                        id="title"
                                        placeholder={__(
                                            'Enter Job title, eg: Software Engineer',
                                            'jobplace'
                                        )}
                                        value={form.title}
                                        onChange={onChange}
                                    />
                                    <Input
                                        type="select"
                                        label={__('Job type', 'jobplace')}
                                        id="job_type_id"
                                        value={form.job_type_id}
                                        options={jobTypes}
                                        onChange={onChange}
                                    />
                                </JobCard>
                                <JobCard className="job-description-info">
                                    <Input
                                        type="text-editor"
                                        label={__('Job details', 'jobplace')}
                                        id="description"
                                        placeholder={__(
                                            'Enter Job description and necessary requirements.',
                                            'jobplace'
                                        )}
                                        editorHeight="150px"
                                        value={form.description}
                                        onChange={onChange}
                                    />
                                </JobCard>
                                <JobCard className="job-company-info">
                                    <Input
                                        type="select"
                                        label={__('Company Name', 'jobplace')}
                                        id="company_id"
                                        value={form.company_id}
                                        options={companyDropdowns}
                                        onChange={onChange}
                                    />
                                </JobCard>

                                <div className="flex justify-end md:hidden">
                                    <JobSubmit />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
