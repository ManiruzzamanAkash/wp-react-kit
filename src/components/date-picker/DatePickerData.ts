/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { add, endOfWeek, startOfMonth, startOfYear, sub } from 'date-fns';

/**
 * Internal dependencies
 */
import {
    getCurrentDate,
    getSubOrAddDaysDate,
    getFormattedDate,
} from '../../../utils/DateHelper';

export interface IDatePickerData {
    /**
     * Date Range option name.
     */
    name: string;

    /**
     * Date Range option slug.
     */
    value: string;

    /**
     * Start date of the date range.
     */
    startDate: string;

    /**
     * End date of the date range.
     */
    endDate: string;
}

export default function DatePickerData(): Array<IDatePickerData> {
    const currentDate = getCurrentDate();

    return [
        {
            name: __('Today', 'cp'),
            value: 'today',
            startDate: currentDate,
            endDate: currentDate,
        },
        {
            name: __('Yesterday', 'cp'),
            value: 'yesterday',
            startDate: getSubOrAddDaysDate('sub', 1),
            endDate: getSubOrAddDaysDate('sub', 1),
        },
        {
            name: __('This Month', 'cp'),
            value: 'thisMonth',
            startDate: getFormattedDate(startOfMonth(new Date())),
            endDate: getFormattedDate(
                sub(add(startOfMonth(new Date()), { months: 1 }), {
                    seconds: 1,
                })
            ),
        },
        {
            name: __('Last 7 Days', 'cp'),
            value: 'last7Days',
            startDate: getSubOrAddDaysDate('sub', 7),
            endDate: currentDate,
        },
        {
            name: __('Last 30 Days', 'cp'),
            value: 'last30Days',
            startDate: getSubOrAddDaysDate('sub', 30),
            endDate: currentDate,
        },
        {
            name: __('Last Week', 'cp'),
            value: 'lastWeek',
            startDate: getFormattedDate(
                sub(endOfWeek(new Date()), { days: 14 })
            ),
            endDate: getFormattedDate(sub(endOfWeek(new Date()), { days: 8 })),
        },
        {
            name: __('Last Month', 'cp'),
            value: 'lastMonth',
            startDate: getFormattedDate(
                sub(startOfMonth(new Date()), { months: 1 })
            ),
            endDate: getFormattedDate(
                sub(startOfMonth(new Date()), { days: 1 })
            ),
        },
        {
            name: __('Last Quarter', 'cp'),
            value: 'lastQuarter',
            startDate: getFormattedDate(
                sub(startOfMonth(new Date()), { months: 3 })
            ),
            endDate: getFormattedDate(
                sub(startOfMonth(new Date()), { days: 1 })
            ),
        },
        {
            name: __('Last Year', 'cp'),
            value: 'lastYear',
            startDate: getFormattedDate(
                sub(startOfYear(new Date()), { years: 1 })
            ),
            endDate: getFormattedDate(
                sub(startOfYear(new Date()), { days: 1 })
            ),
        },
        {
            name: __('Last 6 months', 'cp'),
            value: 'last6Months',
            startDate: getFormattedDate(
                sub(startOfMonth(new Date()), { months: 6 })
            ),
            endDate: getFormattedDate(
                sub(startOfMonth(new Date()), { days: 1 })
            ),
        },
        {
            name: __('Last 12 months', 'cp'),
            value: 'last12Months',
            startDate: getFormattedDate(
                sub(startOfMonth(new Date()), { months: 12 })
            ),
            endDate: getFormattedDate(
                sub(startOfMonth(new Date()), { days: 1 })
            ),
        },
        {
            name: __('All Time', 'cp'),
            value: 'allTime',
            startDate: '-1',
            endDate: '-1',
        },
        {
            name: __('Custom Range', 'cp'),
            value: 'customRange',
            startDate: '',
            endDate: '',
        },
    ];
}
