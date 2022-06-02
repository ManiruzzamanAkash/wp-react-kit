/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <div>
            <h2 className="app-title">{__('Job Place App', 'job-place')}</h2>
            <hr />
            <Dashboard />
        </div>
    );
};

export default App;
