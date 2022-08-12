/**
 * External dependencies
 */
import { useRef, useState, useEffect } from '@wordpress/element';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, Calendar } from 'react-date-range';
import { format, subDays } from 'date-fns';

/**
 * Internal dependencies
 */
import DatePickerData, { IDatePickerData } from './DatePickerData';
import { changeDateFilterAction } from '../../../redux/actions/GlobalAction';
import { getCurrentDate, getFormattedDate } from '../../../utils/DateHelper';
import { getGlobalData } from '../../../utils/global-data';

enum Type {
    DatePicker = 'date-picker',
    DateRangePicker = 'date-range-picker',
}

export type DatePickerType = Type;

export interface IDatePicker {
    /**
     * Date Picker type.
     * It's for both single date-picker and date-range picker.
     */
    type: DatePickerType;

    /**
     * Show months count no in date picker.
     * We can show more than 2 months in date-range picker calendar.
     */
    showMonthsCount?: number;

    /**
     * Start date in calendar.
     */
    startDate?: Date | undefined;

    /**
     * Update start date.
     */
    setStartDate?: Function;

    /**
     * End date of date-range picker type calendar.
     */
    endDate?: Date | undefined;

    /**
     * Update end date.
     */
    setEndDate?: Function;
}

const DatePickerProps = {
    type: 'date-picker' as DatePickerType,
    showMonthsCount: 2,
    startDate: new Date(),
    setStartDate: () => {},
    endDate: undefined,
    setEndDate: () => {},
};

const DatePicker = (props: IDatePicker) => {
    const { type, startDate, setStartDate, endDate, setEndDate } = props;
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [showDate, setShowDate] = useState(false);
    const last30DayPicker = DatePickerData().filter(
        (item: IDatePickerData) => item.value === 'last30Days'
    )[0];
    const [selectedPicker, setSelectedPicker] = useState(last30DayPicker);
    const showMonthsCount =
        typeof props.showMonthsCount !== 'undefined'
            ? props.showMonthsCount
            : DatePickerProps.showMonthsCount;
    const [dateData, setDateData] = useState([
        {
            startDate: subDays(new Date(), 30),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    /**
     * Handle Outside click of date picker.
     *
     * @param  event object
     */
    const handleClickOutside = (event: object) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowDate(false);
        }
    };

    /**
     * Handle Outside click of the component.
     */
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    /**
     * Select Date Picker.
     *
     * @param  data IDatePickerData
     */
    const selectPicker = (data: IDatePickerData) => {
        setSelectedPicker(data);

        if (data.value !== 'customRange') {
            setShowDate(false);

            // if data.value is for allTime, then set startDate and endDate to biggest date
            if (data.value === 'allTime') {
                const initialStartDate =
                    typeof getGlobalData('installed_at') !== 'string'
                        ? new Date(0)
                        : new Date(getGlobalData('installed_at'));

                data.startDate = getFormattedDate(initialStartDate);
                data.endDate = getCurrentDate();
            }

            dispatch(
                changeDateFilterAction(data.startDate, data.endDate, data.value)
            );
            typeof setStartDate === 'function' &&
                setStartDate(new Date(data.startDate));
            typeof setEndDate === 'function' &&
                setEndDate(new Date(data.endDate));
        }

        if (data.value === 'customRange' && data.startDate && data.endDate) {
            typeof setStartDate === 'function' && setStartDate(data.startDate);
            typeof setEndDate === 'function' && setEndDate(data.endDate);

            setShowDate(false);
            dispatch(
                changeDateFilterAction(
                    getFormattedDate(new Date(data.startDate)),
                    getFormattedDate(new Date(data.endDate)),
                    data.value
                )
            );
        }
    };

    return (
        <span ref={ref}>
            <span
                className="bg-white border border-solid border-gray-lite text-gray-dark rounded h-9 w-24 justify-end justify-self-end pb-2 pt-2 pr-3 md:pl-4 sm:pl-2 cursor-pointer"
                onClick={() => setShowDate(!showDate)}
            >
                <span className="w-10 mr-2 md:text-sm sm:text-xs">
                    {typeof startDate !== 'undefined'
                        ? format(startDate, 'MMM dd, yyyy')
                        : ''}
                    {typeof endDate !== 'undefined' && endDate !== null && (
                        <> — {format(endDate, 'MMM dd, yyyy')}</>
                    )}
                </span>
                <span className=" pl-2 w-6 h-6 border-l border-solid">
                    <FontAwesomeIcon icon={faBars} className="text-base" />
                </span>
            </span>

            {showDate && (
                <div className="absolute bg-white right-7 p-2 mt-4 shadow z-10 mr-4">
                    {type === 'date-picker' && (
                        <Calendar
                            date={new Date()}
                            onChange={(date) => {
                                if (typeof setStartDate !== 'undefined') {
                                    setStartDate(date);
                                }
                                if (typeof setEndDate !== 'undefined') {
                                    setEndDate(date);
                                }
                                setShowDate(false);
                            }}
                            editableDateInputs={true}
                        />
                    )}
                    <div className="bg-white">
                        <ul className="list-none ml-0">
                            {DatePickerData().map((data, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`border-b border-solid border-gray-liter p-2 cursor-pointer hover:bg-gray-liter text-left min-w-36 ${
                                            selectedPicker.value === data.value
                                                ? 'bg-gray-liter'
                                                : ''
                                        }`}
                                        onClick={() => selectPicker(data)}
                                    >
                                        {data.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {selectedPicker.value === 'customRange' &&
                        type === 'date-range-picker' && (
                            <DateRangePicker
                                onChange={(item) => {
                                    setDateData([item.selection]);

                                    const customDateRange =
                                        DatePickerData().filter(
                                            (item: IDatePickerData) =>
                                                item.value === 'customRange'
                                        )[0];
                                    customDateRange.startDate =
                                        item.selection.startDate;
                                    customDateRange.endDate =
                                        item.selection.endDate;
                                    selectPicker(customDateRange);
                                }}
                                showSelectionPreview={false}
                                showDateDisplay={false}
                                moveRangeOnFirstSelection={false}
                                months={showMonthsCount}
                                ranges={dateData}
                                direction="horizontal"
                                editableDateInputs={true}
                                onRangeFocusChange={() => setShowDate(false)}
                            />
                        )}
                </div>
            )}
        </span>
    );
};

DatePicker.defaultProps = DatePickerProps;

export default DatePicker;
