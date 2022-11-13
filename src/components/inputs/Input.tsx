/**
 * External dependencies.
 */
import { twMerge } from 'tailwind-merge';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import Label from './InputLabel';
import Select2Input, { Select2SingleRow } from './Select2Input';
import SwitchCheckbox from './SwitchCheckbox';
import TextEditor from './TextEditor';
import { parseHtml } from '../../utils/text-parser';
import { getGlobalData } from '../../utils/global-data';

export type IInputResponse = {
    /**
     * Input ID or name.
     */
    name: string;

    /**
     * Value after onChange input.
     */
    value: any;
};

type InputType =
    | 'text'
    | 'url'
    | 'email'
    | 'radio'
    | 'search'
    | 'password'
    | 'number'
    | 'select'
    | 'textarea'
    | 'switch'
    | 'multiselect'
    | 'checkbox'
    | 'currency'
    | 'date'
    | 'date-picker'
    | 'text-editor'
    | undefined;

export interface InputProps {
    /**
     * Input type - text, email, password, number, textarea, select, switch, multiselect, currency
     */
    type?: InputType;

    /**
     * Input label - If given, then a <Label component will be rendered at top
     */
    label?: string;

    /**
     * Input label - If given, then a <Label component will be rendered at top
     */
    labelTooltip?: React.ReactNode;

    /**
     * Input label class if given label.
     */
    labelClass?: string;

    /**
     * Input name or ID.
     */
    id?: string;

    /**
     * Input shown value.
     */
    value?: string | number | Array<any>;

    /**
     * Input placeholder text.
     */
    placeholder?: React.CSSProperties['placeholder'];

    /**
     * Is input required or not.
     */
    required?: boolean;

    /**
     * Input class.
     */
    className?: React.CSSProperties['className'];

    /**
     * Input Area class.
     */
    areaClassName?: React.CSSProperties['className'];

    /**
     * Ref
     */
    ref?: LegacyRef<HTMLInputElement> | null;

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

    /**
     * Left text or node.
     */
    left?: string | React.ReactNode;

    /**
     * Right text or node.
     */
    right?: string | React.ReactNode;

    /**
     * Height of editor-textarea.
     */
    editorHeight?: string;

    /**
     * Has any input error or not.
     */
    hasError?: boolean;

    /**
     * Show error message or not.
     */
    showErrorMessage?: boolean;

    /**
     * Error message.
     */
    errorMessage?: string;

    /**
     * Floating label.
     */
    floatingLabel?: string;

    /**
     * Is async request API call
     */
    isAsync?: boolean;

    /**
     * Async API URL.
     */
    asyncCallback?: (val: any, resolve: any) => void;

    /**
     * Is the select field will render creatable option.
     */
    isSelectCreatable?: boolean;

    /**
     * On create async callback for select2 input.
     */
    onCreateAsyncCallback?: (val: any) => void;
}

export function Input(props: InputProps) {
    const {
        type = 'text',
        label = '',
        labelClass = '',
        labelTooltip = '',
        placeholder = '',
        className = '',
        areaClassName = '',
        onChange = () => {},
        onInput = () => {},
        id = '',
        value = '',
        required = false,
        ref = null,
        options = [],
        rows = 4,
        cols = 90,
        style = {},
        autoComplete = 'off',
        min = 0,
        max,
        left = <></>,
        right = <></>,
        editorHeight = '200px',
        hasError = false,
        showErrorMessage = false,
        errorMessage = '',
        isAsync = false,
        asyncCallback = (val, resolve) => {},
        onCreateAsyncCallback = (val) => {},
        isSelectCreatable = false,
    } = props;

    const getClassName = () => {
        let classNames = `bg-white placeholder:text-placeholder transition px-4 rounded-md font-medium placeholder:font-normal text-sm border border-b border-solid border-slate-300 border-outline-none !shadow-none focus:!outline-none focus:!border-[#EBEFF8] focus:!shadow-[#EBEFF8] required:border-red-500 w-full`;

        switch (type) {
            case 'text':
            case 'url':
            case 'number':
            case 'date':
            case 'email':
            case 'search':
            case 'currency':
                classNames += ` !min-h-[40px]`;
                break;

            case 'textarea':
                classNames += ``;
                break;

            case 'checkbox':
                classNames += ` !h-6 !w-6 !indeterminate:bg-gray-300 accent-[#1BBC9C]`;
                break;

            default:
                break;
        }

        // For currency, add ml-8 from input
        if ('currency' === type) {
            classNames += ' ml-9';
        }

        if (className?.length) {
            classNames = `${classNames} ${className} `;
        }

        return twMerge(classNames);
    };

    const changeInput = (e: any) => {
        let { name, value: targetValue }: IInputResponse = e.target;

        if ('checkbox' === type) {
            targetValue = e.target.checked ? 'yes' : 'no';
        }

        onChange({ name, value: targetValue });
    };

    const updatedStyle = {
        ...style,
        // @TODO: Refactor this border, shadow later.
        ...{
            border: `1px solid ${hasError ? '#E9485E' : '#EBEFF8'}`,
            boxShadow: 'none',
        },
    };

    const printErrorMessage = () => {
        if (hasError && showErrorMessage && errorMessage?.length > 0) {
            return <p className="text-error text-xs">{errorMessage}</p>;
        }
    };

    const typeMapper = {
        currency: 'number',
    };

    return (
        <>
            {label.length ? (
                <Label
                    htmlFor={id}
                    className={labelClass}
                    tooltip={
                        isEmpty(labelTooltip) ? '' : parseHtml(labelTooltip)
                    }
                >
                    {label}
                </Label>
            ) : (
                ''
            )}

            <div
                className={`flex relative ${areaClassName} ${
                    hasError ? 'text-error' : ''
                }`}
            >
                {'currency' === type ? (
                    <div className="bg-[#F1F1F4] h-10 w-10 pl-4 pt-2 flex-none absolute top-0 left-0 rounded-none rounded-l-[4px]">
                        {getGlobalData('currency')?.symbol}
                    </div>
                ) : (
                    left
                )}

                {(type === 'text' ||
                    type === 'url' ||
                    type === 'number' ||
                    type === 'radio' ||
                    type === 'checkbox' ||
                    type === 'date' ||
                    type === 'email' ||
                    type === 'currency' ||
                    type === 'search') && (
                    <input
                        type={typeMapper[type] ?? type}
                        ref={ref}
                        required={required}
                        placeholder={placeholder}
                        className={getClassName()}
                        style={updatedStyle}
                        onChange={changeInput}
                        onInput={onInput}
                        name={id}
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
                                onChange({
                                    name: id,
                                    value: val ? true : false,
                                });
                            }
                        }}
                    />
                )}

                {type === 'text-editor' && (
                    <div className="w-full">
                        <TextEditor
                            id={id}
                            height={editorHeight}
                            onChange={onChange}
                            value={value}
                            placeholder={placeholder}
                        />
                    </div>
                )}

                {type === 'textarea' && (
                    <textarea
                        ref={ref}
                        required={required}
                        placeholder={placeholder}
                        className={getClassName()}
                        style={updatedStyle}
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
                        placeholder={placeholder}
                        onChange={(val) => {
                            if (typeof onChange === 'function') {
                                onChange({ name: id, value: val });
                            }
                        }}
                        isAsync={isAsync}
                        asyncCallback={asyncCallback}
                        isCreatable={isSelectCreatable}
                        onCreateAsyncCallback={onCreateAsyncCallback}
                    />
                )}

                {right}
            </div>

            {printErrorMessage()}
        </>
    );
}
