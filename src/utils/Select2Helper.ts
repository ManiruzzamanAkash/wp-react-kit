/**
 * Internal dependencies.
 */
import { ISelect2Input } from '../components/inputs/Select2Input';

/**
 * Format array to accept as select2 array.
 *
 * @param  data array
 *
 * @return array
 */
export function formatSelect2Data(data: Array<ISelect2Input> | object) {
    // If data is array and empty, return empty array.
    if (Array.isArray(data) && data.length === 0) {
        return [];
    }

    // If data is an array, format it with label and value
    if (Array.isArray(data)) {
        return data.map((item, key) => {
            // Check if it's already formatted with label and value
            if (item.hasOwnProperty('label') && item.hasOwnProperty('value')) {
                // if value is empty, return null
                if (item.value === '') {
                    return null;
                }

                return item;
            }

            // Otherwise, format it with label and value
            let itemValue: any = item.id;
            if (typeof itemValue === 'undefined' || itemValue === null) {
                itemValue =
                    typeof item.value !== 'undefined' ? item.value : key;
            }

            return {
                label: item?.name || item,
                value: itemValue,
            };
        });
    }

    // If data is object, then make an array of object with key value pair.
    if (typeof data === 'object') {
        return Object.keys(data).map((key) => {
            // data is empty, return null
            if (data[key] === '') {
                return null;
            }

            return {
                label: data[key],
                value: key,
            };
        });
    }
}

export const getSelectedOption = (options: Array<any>, value: string) => {
    if (
        typeof options !== 'undefined' &&
        Array.isArray(options) &&
        typeof value !== 'undefined' &&
        value !== null &&
        value !== ''
    ) {
        const optionValues = options.filter((option) => option.value == value);

        if (optionValues.length > 0) {
            return optionValues[0];
        }
    }

    return null;
};
