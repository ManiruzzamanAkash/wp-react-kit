/**
 * External dependencies
 */
import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '../../components/layout/Layout';
import PageHeading from '../../components/layout/PageHeading';
import JobForm from '../../components/jobs/JobForm';
import JobSubmit from '../../components/jobs/JobSubmit';

export default function CreateJob() {
    const navigate = useNavigate();

    const backToJobsPage = () => {
        navigate('/jobs');
    };

    /**
     * Get Page Content - Title and New Job button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="">
            <div className="mr-3 mb-4">
                <button
                    onClick={backToJobsPage}
                    className="text-gray-dark border-none"
                >
                    ← {__('Back to jobs', 'jobplace')}
                </button>
            </div>
            <div className="text-left">
                <PageHeading text={__('Create New Job', 'jobplace')} />
            </div>
        </div>
    );

    /**
     * Get Right Side Content - Create Job form data.
     */
    const pageRightSideContent = (
        <div className="mt-7 fixed invisible md:visible md:top-28 right-10 z-50">
            <JobSubmit />
        </div>
    );

    return (
        <Layout
            title={pageTitleContent}
            slug="create-job"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            <JobForm />
        </Layout>
    );
}
