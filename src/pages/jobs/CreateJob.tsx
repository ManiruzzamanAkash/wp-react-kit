/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import JobForm from '../../components/jobs/JobForm';
import JobSubmit from '../../components/jobs/JobSubmit';
import Notices from '../../components/Notices';
import jobStore from '../../data/jobs';
import { jobDefaultFormData } from '../../data/jobs/default-state';

export default function CreateJob() {
    const navigate = useNavigate();

    const backToJobsPage = () => {
        navigate( '/jobs' );
    };

    useEffect( () => {
        dispatch( jobStore ).setFormData( {
            ...jobDefaultFormData,
        } );
    }, [] );

    return (
        <div className="wprk-form-page">
            <header className="wprk-form-page__header">
                <div className="wprk-form-page__heading">
                    <button onClick={ backToJobsPage }>
                        ← { __( 'Back to jobs', 'jobplace' ) }
                    </button>
                    <h2>{ __( 'Create New Job', 'jobplace' ) }</h2>
                </div>
                <div className="wprk-form-page__actions">
                    <JobSubmit />
                </div>
            </header>

            <div className="wprk-form-page__body">
                <JobForm />
            </div>

            <Notices />
        </div>
    );
}
