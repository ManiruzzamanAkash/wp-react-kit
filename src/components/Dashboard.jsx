/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="card">
                <h3>{__('Dashboard', 'job-place')}</h3>
                <p>
                    {__('Edit Dashboard component at ', 'job-place')}
                    <code>src/components/Dashboard.jsx</code>
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
