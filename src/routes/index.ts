/**
 * Internal dependencies
 */
import HomePage from '../pages/HomePage';
import JobsPage from '../pages/jobs/JobsPage';
import CreateJob from '../pages/jobs/CreateJob';
import EditJob from '../pages/jobs/EditJob';
import JobCategoriesPage from '../pages/job-categories/JobCategoriesPage';
import CompaniesPage from '../pages/companies/CompaniesPage';

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
    {
        path: '/companies',
        element: CompaniesPage,
    },
];

export default routes;
