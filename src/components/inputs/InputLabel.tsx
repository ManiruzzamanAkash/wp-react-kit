interface IInputLabel {
    /**
     * Input level children props.
     */
    children: JSX.Element | string;

    /**
     * Input html for attribute.
     */
    htmlFor?: string;

    /**
     * Custom Class name.
     */
    className?: string;
}

export default function InputLabel({
    children,
    htmlFor,
    className,
}: IInputLabel) {
    return (
        <label className={`block text-sm ${className}`} htmlFor={htmlFor}>
            {children}
        </label>
    );
}
