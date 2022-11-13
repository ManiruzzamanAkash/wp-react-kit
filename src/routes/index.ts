/**
 * Internal dependencies
 */
import HomePage from '../pages/HomePage';
import JobsPage from '../pages/jobs/JobsPage';
import CreateJob from '../pages/jobs/CreateJob';
import EditJob from '../pages/jobs/EditJob';

const routes = [
    {
        path: '/',
        element: HomePage,
    },
    {
        path: '/jobs',
        element: JobsPage,
    },
    {
        path: '/jobs/new',
        element: CreateJob,
    },
    {
        path: '/jobs/edit/:id',
        element: EditJob,
    },
];

export default routes;
