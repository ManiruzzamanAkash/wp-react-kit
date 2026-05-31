/**
 * Internal dependencies
 */
import HomePage from '../pages/HomePage';
import JobsPage from '../pages/jobs/JobsPage';
import CreateJob from '../pages/jobs/CreateJob';
import EditJob from '../pages/jobs/EditJob';
import JobCategoriesPage from '../pages/job-categories/JobCategoriesPage';

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
    {
        path: '/job-categories',
        element: JobCategoriesPage,
    },
];

export default routes;
