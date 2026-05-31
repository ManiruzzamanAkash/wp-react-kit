/**
 * External dependencies.
 */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import jobStore from '../../data/jobs';
import { IJobFormData } from '../../interfaces';
import { jobDefaultFormData } from '../../data/jobs/default-state';

export default function JobSubmit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form: IJobFormData = useSelect(
        (select) => select(jobStore).getForm(),
        []
    );

    const jobsSaving: boolean = useSelect(
        (select) => select(jobStore).getJobsSaving(),
        []
    );

    const backToJobsPage = () => {
        navigate('/jobs');
    };

    const validate = () => {
        if (!form.title.length) {
            return __('Please give a job title.', 'jobplace');
        }

        if (form.job_type_id === 0) {
            return __('Please select job type.', 'jobplace');
        }

        if (!form.description.length) {
            return __('Please give job description.', 'jobplace');
        }

        if (form.company_id === 0) {
            return __('Please select a company.', 'jobplace');
        }

        return '';
    };

    const onSubmit = () => {
        //Validate
        if (validate().length > 0) {
            Swal.fire({
                title: __('Error', 'jobplace'),
                text: validate(),
                icon: 'error',
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 4000,
            });

            return;
        }

        // Submit
        dispatch(jobStore)
            .saveJob(form)
            .then(() => {
                Swal.fire({
                    title: __('Job saved', 'jobplace'),
                    text: __('Job has been saved successfully.', 'jobplace'),
                    icon: 'success',
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 2000,
                });
                dispatch(jobStore).setFormData({
                    ...jobDefaultFormData,
                });
                navigate('/jobs');
            })
            .catch((error) => {
                Swal.fire({
                    title: __('Error', 'jobplace'),
                    text: error.message,
                    icon: 'error',
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 3000,
                });
            });
    };

    return (
        <>
            <Button
                variant="secondary"
                onClick={backToJobsPage}
                style={{ marginRight: 12 }}
            >
                {__('Cancel', 'jobplace')}
            </Button>

            <Button
                variant="primary"
                icon={<FontAwesomeIcon icon={faCheckCircle} />}
                isBusy={jobsSaving}
                disabled={jobsSaving}
                onClick={onSubmit}
            >
                {jobsSaving
                    ? __('Saving…', 'jobplace')
                    : __('Save', 'jobplace')}
            </Button>
        </>
    );
}
