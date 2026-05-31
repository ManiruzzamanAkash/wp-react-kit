/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard mx-8">
            <div className="card p-5">
                <h3 className="font-medium text-lg">
                    {__('Dashboard', 'jobplace')}
                </h3>
                <p>
                    {__('Edit Dashboard component at ', 'jobplace')}
                    <code>src/components/Dashboard.jsx</code>
                </p>

                <div className="mt-4">
                    <Button
                        variant="primary"
                        style={{ backgroundColor: '#00a0d2' }}
                        onClick={() => navigate('/jobs')}
                    >
                        {__('View Jobs', 'jobplace')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
