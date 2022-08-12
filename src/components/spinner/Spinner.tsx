/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

export interface ISpinner {
    /**
     * Spinner size
     */
    size?: string;

    /**
     * Spinner text alignment.
     */
    align?: string;

    /**
     * Spinner text.
     */
    text?: string;
}

const SpinnerDefaultProps = {
    size: 'sm',
    align: 'center',
    text: __('Loading…', 'cp'),
};

const Spinner = ({ align, text }: ISpinner) => {
    const textAlignClassName =
        typeof align !== 'undefined'
            ? `text-${align}`
            : `text-${SpinnerDefaultProps.align}`;
    const spinnerText =
        typeof text !== 'undefined' ? text : SpinnerDefaultProps.text;

    return (
        <div>
            <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${textAlignClassName}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <span className="text-gray-dark">{spinnerText}</span>
        </div>
    );
};

Spinner.defaultProps = SpinnerDefaultProps;

export default Spinner;
