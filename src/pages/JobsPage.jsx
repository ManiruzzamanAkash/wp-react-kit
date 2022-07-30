/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const JobsPage = () => {
    return (
        <div className="dashboard">
            <div className="card p-5">
                <h3 className="text-lg">{__('Jobs', 'jobplace')}</h3>
                <p>
                    {__('Edit JobsPage component at ', 'jobplace')}
                    <code>src/pages/JobsPage.jsx</code>
                </p>
            </div>
        </div>
    );
};

export default JobsPage;
