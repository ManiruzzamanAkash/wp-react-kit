/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { useNavigate, useParams } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import JobForm from '../../components/jobs/JobForm';
import JobSubmit from '../../components/jobs/JobSubmit';
import Notices from '../../components/Notices';
import jobStore from '../../data/jobs';

export default function EditJob() {
    const navigate = useNavigate();
    const { id } = useParams();

    const backToJobsPage = () => {
        navigate( '/jobs' );
    };

    useSelect( ( select ) => select( jobStore ).getJobDetail( id ), [ id ] );

    return (
        <div className="wprk-form-page">
            <header className="wprk-form-page__header">
                <div className="wprk-form-page__heading">
                    <button onClick={ backToJobsPage }>
                        ← { __( 'Back to jobs', 'jobplace' ) }
                    </button>
                    <h2>{ __( 'Edit Job', 'jobplace' ) }</h2>
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
