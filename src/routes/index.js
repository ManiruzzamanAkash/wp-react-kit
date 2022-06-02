/**
 * Internal dependencies
 */
import HomePage from '../pages/HomePage';
import JobsPage from '../pages/JobsPage';

const routes = [
    {
        path: '/',
        element: HomePage,
    },
    {
        path: '/jobs',
        element: JobsPage,
    },
];

export default routes;
