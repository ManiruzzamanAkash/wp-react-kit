/**
 * External dependencies
 */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
    formatSelect2Data,
    getSelectedOption,
} from '../../utils/Select2Helper';

export interface Select2SingleRow {
    /**
     * Select2 option label.
     */
    label: string;

    /**
     * Select2 option value.
     */
    value: string;
}

export interface ISelect2Input {
    /**
     * Select2 options.
     */
    options: Array<Select2SingleRow>;

    /**
     * Placeholder text.
     */
    placeholder?: string;

    /**
     * Is Multi-Select or not.
     */
    isMulti?: boolean;

    /**
     * Default selected value.
     */
    defaultValue?: any;

    /**
     * On change select2 input.
     */
    onChange?: (val: any) => void;
}

const Select2Input = (props: ISelect2Input) => {
    const { options, isMulti, placeholder, defaultValue, onChange } = props;

    const animatedComponents = makeAnimated();

    const styles = {
        container: (base: any) => ({
            ...base,
            width: '100%',
            height: '100%',
            margin: '0',
            padding: '0',
            border: 'none',
            borderRadius: '0',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent',
            },
        }),
        control: (base: any, state: any) => ({
            ...base,
            borderColor: state.isFocused ? '#787878' : '#dddddd',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#787878',
            },
            height: '28px',
            minHeight: '36px',
            fontSize: '12px',
        }),
        menuList: (base: any) => ({
            ...base,
            width: 'auto',
            minWidth: '200px',
            backgroundColor: '#FFFFFF',
            fontSize: '12px',
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: '#787878',
            fontWeight: 'normal',
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: '0',
            cursor: 'pointer',
            paddingLeft: '12px',
        }),
        indicatorSeparator: (base: any) => ({
            ...base,
            marginLeft: '10px',
        }),
    };

    return (
        <Select
            styles={styles}
            components={animatedComponents}
            options={formatSelect2Data(options)}
            isMulti={isMulti}
            value={
                isMulti
                    ? formatSelect2Data(defaultValue)
                    : getSelectedOption(options, defaultValue)
            }
            defaultValue={
                isMulti
                    ? formatSelect2Data(defaultValue)
                    : getSelectedOption(options, defaultValue)
            }
            placeholder={
                placeholder ? placeholder : __('-- Select --', 'jobplace')
            }
            onChange={(value) => {
                if (typeof onChange === 'function') {
                    onChange(value);
                }
            }}
        />
    );
};

Select2Input.defaultProps = {
    options: [],
    placeholder: '',
    isMulti: false,
};

export default Select2Input;
