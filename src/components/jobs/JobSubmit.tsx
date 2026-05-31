/**
 * External dependencies.
 */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import jobStore from '../../data/jobs';
import { IJobFormData } from '../../interfaces';
import { jobDefaultFormData } from '../../data/jobs/default-state';

export default function JobSubmit() {
    const navigate = useNavigate();
    const { saveJob, setFormData, invalidateResolutionForStoreSelector } =
        useDispatch( jobStore );
    const { createSuccessNotice, createErrorNotice } =
        useDispatch( noticesStore );

    const form: IJobFormData = useSelect(
        ( select ) => select( jobStore ).getForm(),
        []
    );

    const jobsSaving: boolean = useSelect(
        ( select ) => select( jobStore ).getJobsSaving(),
        []
    );

    const backToJobsPage = () => {
        navigate( '/jobs' );
    };

    const validate = () => {
        if ( ! form.title.length ) {
            return __( 'Please give a job title.', 'jobplace' );
        }

        if ( form.job_type_id === 0 ) {
            return __( 'Please select job type.', 'jobplace' );
        }

        if ( ! form.description.length ) {
            return __( 'Please give job description.', 'jobplace' );
        }

        if ( form.company_id === 0 ) {
            return __( 'Please select a company.', 'jobplace' );
        }

        return '';
    };

    const onSubmit = () => {
        const error = validate();

        if ( error.length > 0 ) {
            createErrorNotice( error, { type: 'snackbar' } );
            return;
        }

        saveJob( form )
            .then( () => {
                createSuccessNotice(
                    __( 'Job has been saved successfully.', 'jobplace' ),
                    { type: 'snackbar' }
                );
                invalidateResolutionForStoreSelector( 'getJobStats' );
                setFormData( { ...jobDefaultFormData } );
                navigate( '/jobs' );
            } )
            .catch( ( saveError: { message?: string } ) => {
                createErrorNotice(
                    saveError?.message ||
                        __( 'Could not save the job.', 'jobplace' ),
                    { type: 'snackbar' }
                );
            } );
    };

    return (
        <>
            <Button
                variant="secondary"
                onClick={ backToJobsPage }
                style={ { marginRight: 12 } }
            >
                { __( 'Cancel', 'jobplace' ) }
            </Button>

            <Button
                variant="primary"
                icon={ <FontAwesomeIcon icon={ faCheckCircle } /> }
                isBusy={ jobsSaving }
                disabled={ jobsSaving }
                onClick={ onSubmit }
            >
                { jobsSaving
                    ? __( 'Saving…', 'jobplace' )
                    : __( 'Save', 'jobplace' ) }
            </Button>
        </>
    );
}
