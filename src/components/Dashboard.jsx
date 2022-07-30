/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="card p-5">
                <h3 className="font-medium text-lg">
                    {__('Dashboard', 'jobplace')}
                </h3>
                <p>
                    {__('Edit Dashboard component at ', 'jobplace')}
                    <code>src/components/Dashboard.jsx</code>
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
