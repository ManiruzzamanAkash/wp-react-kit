/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { Input } from '../inputs/Input';
import Badge from '../badge/Badge';
import ListItemMenu from './ListItemMenu';
import { ITableHeader, ITableRow } from '../table/TableInterface';
import { capitalize } from '../../utils/StringHelper';

export const useTableHeaderData = (): ITableHeader[] => {
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

export const useTableRowData = (jobs = [], checked: number[]): ITableRow[] => {
    const rowsData: ITableRow[] = [];

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
                    value: (
                        <div className="flex">
                            <div className="flex-6">
                                <img
                                    src={row.company?.avatar_url}
                                    alt=""
                                    className="mr-3 w-7 rounded-full"
                                />
                            </div>
                            <div className="flex-6">{row.company?.name}</div>
                        </div>
                    ),
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
