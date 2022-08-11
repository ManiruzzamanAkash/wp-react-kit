import { format, subDays, addDays } from 'date-fns';

/**
 * Get default date format.
 *
 * @return string
 */
export function getDefaultFormat() {
    return 'yyyy-MM-dd';
}

/**
 * Get Current Formatted Date.
 *
 * @param  viewFormat string; Default: 'yyyy-MM-dd'
 *
 * @return {Object} Date
 */
export function getCurrentDate(viewFormat: string = getDefaultFormat()) {
    return format(new Date(), viewFormat);
}

/**
 * Get formatted date.
 *
 * @param  date      {Date}
 * @param  formation
 * @return string
 */
export function getFormattedDate(date: Date, formation = getDefaultFormat()) {
    try {
        date = new Date(date);
        return format(date, formation);
    } catch (error) {
        // Fix for any fall-back date format.
        if (typeof date === 'object') {
            return '';
        }
        return date;
    }
}

/**
 * Get Subtracted or Added Days Date.
 *
 * @param  type
 * @param  days
 * @param  date
 * @param  viewFormat
 *
 * @return string
 */
export function getSubOrAddDaysDate(
    type: string,
    days: number,
    date = new Date(),
    viewFormat: string = getDefaultFormat()
): string {
    date = date === null ? new Date() : date;
    viewFormat = viewFormat === null ? getDefaultFormat() : viewFormat;

    if (type === 'sub') {
        return format(subDays(date, days), viewFormat);
    } else if (type === 'add') {
        return format(addDays(date, days), viewFormat);
    }

    return getCurrentDate();
}
