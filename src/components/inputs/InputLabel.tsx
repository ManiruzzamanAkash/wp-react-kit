/**
 * External dependencies.
 */
import { twMerge } from 'tailwind-merge';

interface IInputLabel {
    /**
     * Input level children props.
     */
    children: React.ReactNode | string;

    /**
     * Input html for attribute.
     */
    htmlFor?: string;

    /**
     * Custom Class name.
     */
    className?: string;

    /**
     * Label tooltip (if has any)
     */
    tooltip?: string | React.ReactNode | undefined;
}

export default function InputLabel({
    children = <></>,
    htmlFor,
    className = '',
}: IInputLabel) {
    return (
        <label
            className={twMerge(
                `block text-black font-bold text-[14px] !ml-0 mb-[13px] mt-4 ${className}`
            )}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}
