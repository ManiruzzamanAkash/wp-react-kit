/**
 * Internal dependencies
 */
import Select2Input, { Select2SingleRow } from './Select2Input';
import SwitchCheckbox from './SwitchCheckbox';

export interface InputProps {
    /**
     * Input type - text, email, password, number, textarea, select, switch, multiselect
     */
    type: string;

    /**
     * Input name or ID.
     */
    id?: string;

    /**
     * Input shown value.
     */
    value?: string | number;

    /**
     * Input placeholder text.
     */
    placeHolder?: string;

    /**
     * Input class.
     */
    inputClass?: string;

    /**
     * If select2 is type, then pass options.
     */
    options?: Array<Select2SingleRow>;

    /**
     * On change input.
     */
    onChange?: (val: any) => void;

    /**
     * On input handle.
     */
    onInput?: (val: any) => void;

    /**
     * For textarea input, rows.
     */
    rows?: number;

    /**
     * For textarea input, cols.
     */
    cols?: number;

    /**
     * Custom button style.
     */
    style?: any;

    /**
     * Autocomplete enable or not.
     */
    autoComplete?: string;

    /**
     * Min value.
     */
    min?: number;

    /**
     * Max value.
     */
    max?: number;
}

export const InputDefaultProps = {
    type: 'text',
    id: '',
    value: '',
    placeHolder: '',
    inputClass: '',
    onChange: () => {},
    onInput: () => {},
    rows: 4,
    cols: 90,
    style: {},
    autoComplete: 'off',
    min: 0,
};

const Input = (props: InputProps) => {
    const {
        type,
        placeHolder,
        inputClass,
        onChange,
        onInput,
        id,
        value,
        options,
        rows,
        cols,
        style,
        autoComplete,
        min,
        max,
    } = props;

    const getClassName = () => {
        let className = `bg-white transition px-4 rounded-md font-medium text-sm border border-solid !border-gray-lite !shadow-none focus:!outline-none focus:!border-gray-dark focus:!shadow-gray-dark required:border-red-500`;

        switch (type) {
            case 'text':
            case 'number':
            case 'email':
            case 'search':
                className += ` h-9`;
                break;

            case 'textarea':
                className += ` w-full`;
                break;

            case 'checkbox':
                className += ` !h-6 !w-6 !appearance-none !indeterminate:bg-gray-300`;
                break;

            default:
                break;
        }

        if (inputClass?.length) {
            className = `${inputClass} ${className}`;
        }

        return className;
    };

    const changeInput = (e: any) => {
        const { name, value } = e.target;

        if (typeof onChange === 'function') {
            onChange({ name, value });
        }
    };

    return (
        <>
            {(type === 'text' ||
                type === 'number' ||
                type === 'checkbox' ||
                type === 'radio' ||
                type === 'email' ||
                type === 'search') && (
                <input
                    type={type}
                    placeholder={placeHolder}
                    className={getClassName()}
                    style={style}
                    onChange={changeInput}
                    onInput={onInput}
                    name={id}
                    checked={type === 'checkbox' && value == '1' ? true : false}
                    id={id}
                    value={value}
                    min={min}
                    max={max}
                    autoComplete={autoComplete}
                />
            )}

            {type === 'switch' && (
                <SwitchCheckbox
                    enabled={value == '1' || value == 'true'}
                    setEnabled={(val: any) => {
                        if (typeof onChange === 'function') {
                            onChange({ name: id, value: val ? true : false });
                        }
                    }}
                />
            )}

            {type === 'textarea' && (
                <textarea
                    placeholder={placeHolder}
                    className={getClassName()}
                    style={style}
                    onChange={changeInput}
                    onInput={onInput}
                    id={id}
                    name={id}
                    value={value}
                    rows={rows}
                    cols={cols}
                    autoComplete={autoComplete}
                ></textarea>
            )}

            {(type === 'select' || type === 'multiselect') && (
                <Select2Input
                    defaultValue={value}
                    isMulti={type === 'multiselect'}
                    options={typeof options !== 'undefined' ? options : []}
                    placeholder={placeHolder}
                    onChange={(val) => {
                        if (typeof onChange === 'function') {
                            onChange({ name: id, value: val });
                        }
                    }}
                />
            )}
        </>
    );
};

Input.defaultProps = InputDefaultProps;

export default Input;
