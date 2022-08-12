/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import SelectedItem from '../../components/page-partials/SelectedItem';
import SelectListItem from '../../components/page-partials/SelectListItem';
import Badge from '../../components/badge/Badge';
import Button from '../../components/button/Button';
import Input from '../../components/inputs/Input';
import Layout from '../../components/layout/Layout';
import Table from '../../components/table/Table';
import TableLoading from '../../components/loading/TableLoading';
import PageHeading from '../../components/layout/PageHeading';
//  import ListItemMenu from '../../components/email/ListItemMenu';
import { ITableRow } from '../../components/table/TableInterface';
import { useSelect, useDispatch } from '@wordpress/data';
import { capitalize } from '../../utils/StringHelper';
import store from '../../data/jobs';
import ListItemMenu from '../../components/jobs/ListItemMenu';

//  import {
//      checkedEmailAction,
//      deleteEmailTemplateAction,
//      getEmailTemplates,
//      emptyEmailTemplateDataAction,
//  } from '../../redux/actions/EmailsAction';
//  import {
//      IRootReducer,
//      IDefaultEmailTemplate,
//  } from '../../interfaces/ReducerInterface';
//  import { changeDateFilterAction } from '../../redux/actions/GlobalAction';
//  import DatePickerData, {
// IDatePickerData,
//  } from '../../components/date-picker/DatePickerData';

export default function JobsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const searched = new URLSearchParams(location.search).get('s');
    const [search, setSearch] = useState<string>(
        typeof searched === 'string' ? searched : ''
    );
    const [checkedAll, setCheckedAll] = useState(false);

    //  const { emails, loading, totalEmails, checked, applyActionLoading } =
    //      useSelector((state: IRootReducer) => state.emails);
    // const jobs = [];
    const loading = false;
    const totalJobs = 0;
    const checked = [];
    const applyActionLoading = false;

    const jobs = useSelect((select) => select(store).getJobs({}), []);
    const loadingJobs = useSelect(
        (select) => select(store).getLoadingJobs(),
        false
    );

    useEffect(() => {
        //  dispatch(
        //      getEmailTemplates(
        //          typeof page === 'number' ? page : 1,
        //          search === '' ? '' : search
        //      )
        //  );
    }, [page, search]);

    // Reload global start_date and end_date with last 30 days data.
    useEffect(() => {
        // dispatch(store)
        //     // .setFilters({
        //     // 	...deliveryRequestFilter,
        //     // 	status: statusObject.status,
        //     // })
        //     .setJobs({})
        //     .then((success) => {})
        //     .catch((error) => {});
        // Clear existing form data.
        //  dispatch(emptyEmailTemplateDataAction());
        //  const last30Days = DatePickerData().find(
        //      (date: IDatePickerData) => date.value === 'last30Days'
        //  );
        //  if (typeof last30Days !== 'undefined') {
        //      dispatch(
        //          changeDateFilterAction(
        //              last30Days.startDate,
        //              last30Days.endDate,
        //              last30Days.value
        //          )
        //      );
        //  }
    }, []);

    /**
     * Process search-bar, tab and pagination clicks.
     *
     * @param  page   number
     * @param  search string
     *
     * @return {void}
     */
    const processAndNavigate = (page = 0, search = '') => {
        //  setPage(page !== 0 ? page : 1);
        //  dispatch(
        //      getEmailTemplates(
        //          typeof page === 'number' ? page : 1,
        //          search === '' ? '' : search
        //      )
        //  );
    };

    /**
     * Check Job.
     *
     * @param {number}  jobId
     * @param {boolean} isChecked
     *
     * @return {void}
     */
    const checkJob = (jobId: number, isChecked = false) => {
        const jobsData = [];
        if (jobId === 0) {
            if (isChecked) {
                jobsData.push(...jobs.map((job) => job.id));
            }
            //  dispatch(checkedEmailAction(templateId, jobsData));
        } else {
            //  dispatch(checkedEmailAction(templateId, checked));
        }
    };

    /**
     * Handle Checked and unchecked.
     */
    useEffect(() => {
        if (jobs.length === checked.length && checked.length > 0) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [jobs, checked]);

    const [action, setAction] = useState('');

    const handleApplyAction = () => {
        if (action === '') {
            toast.warning(__('Please select an action.', 'jobplace'));
            return;
        }

        if (action === 'delete') {
            //  dispatch(deleteEmailTemplateAction(checked));
        }

        // finally clear the action
        setAction('');
    };

    /**
     * Get Page Content - Title and New Email button.
     *
     * @return JSX.Element
     */
    const getPageTitleContent = () => (
        <div className="flex">
            <div className="flex-6 mr-3">
                <PageHeading text={__('Jobs', 'jobplace')} />
            </div>
            <div className="flex-1 text-left">
                <Button
                    text={__('New', 'jobplace')}
                    type="primary"
                    icon={faPlus}
                    disabled={loading}
                    onClick={() => navigate('/jobs/new')}
                    style={{ background: '#256D85' }}
                />
            </div>
        </div>
    );

    /**
     * Get Right Side Content - Emails Search Input
     *
     * @return JSX.Element
     */
    const getRightSideContent = () => (
        <Input
            type="text"
            placeHolder={__('Search Jobs…', 'jobplace')}
            onChange={(data) => {
                setSearch(data.value);
                processAndNavigate(page, data.value);
            }}
            value={search}
            inputClass="w-36 sm:w-auto"
        />
    );

    const getHeaders = () => {
        return [
            {
                key: 'checkbox',
                title: '',
                className: '',
            },
            {
                key: 'title',
                title: __('Job', 'jobplace'),
                className: '',
            },
            {
                key: 'job_type',
                title: __('Job type', 'jobplace'),
                className: '',
            },
            {
                key: 'company',
                title: __('Company', 'jobplace'),
                className: '',
            },
            {
                key: 'status',
                title: __('Status', 'jobplace'),
                className: '',
            },
            {
                key: 'actions',
                title: __('Action', 'jobplace'),
                className: '',
            },
        ];
    };

    const getRows = () => {
        const rowsData = [];
        jobs.forEach((row) => {
            rowsData.push({
                id: row.id,
                cells: [
                    {
                        key: 'checkbox',
                        value: (
                            <Input
                                value={checked.includes(row.id) ? '1' : '0'}
                                type="checkbox"
                                //  onChange={() => checkJob(row.id)}
                            />
                        ),
                        className: '',
                    },
                    {
                        key: 'title',
                        value: row.title,
                        className: '',
                    },
                    {
                        key: 'job_type',
                        value: row.job_type?.name,
                        className: '',
                    },
                    {
                        key: 'company',
                        value: row.company?.name,
                        className: '',
                    },
                    {
                        key: 'status',
                        value: (
                            <Badge
                                text={capitalize(row.status)}
                                type={
                                    row.status === 'published'
                                        ? 'success'
                                        : 'default'
                                }
                                hasIcon={true}
                            />
                        ),
                        className: '',
                    },
                    {
                        key: 'actions',
                        value: (
                            <div>
                                <ListItemMenu id={row.id} />
                            </div>
                        ),
                        className: '',
                    },
                ],
            });
        });

        return rowsData;
    };

    return (
        <Layout
            title={getPageTitleContent()}
            slug="jobs"
            hasRightSideContent={true}
            rightSideContent={getRightSideContent()}
        >
            {loadingJobs ? (
                <TableLoading headers={getHeaders()} count={5} />
            ) : (
                <>
                    {checked.length > 0 && (
                        <div className="bg-white p-3">
                            <SelectListItem
                                action={action}
                                setAction={setAction}
                                applyActionLoading={applyActionLoading}
                                handleApplyAction={handleApplyAction}
                            />
                            <SelectedItem checked={checked} />
                        </div>
                    )}

                    <Table
                        headers={getHeaders()}
                        rows={getRows()}
                        totalItems={totalJobs}
                        perPage={10}
                        onCheckAll={(isChecked) => {
                            checkJob(0, isChecked);
                            setCheckedAll(isChecked);
                        }}
                        checkedAll={checkedAll}
                        noDataMessage={__(
                            'Sorry !! No jobs found…',
                            'jobplace'
                        )}
                        currentPage={
                            typeof page === 'number' ? parseInt(page) : 1
                        }
                        onChangePage={(page) =>
                            processAndNavigate(page, search)
                        }
                    />
                </>
            )}
        </Layout>
    );
}
