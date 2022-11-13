/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface IButton {
    /**
     * Button Inside text.
     */
    text: string;

    /**
     * Button icon, a font-awesome icon.
     */
    icon?: IconDefinition | undefined;

    /**
     * Icon position left or right.
     */
    iconPosition?: string;

    /**
     * Button type - primary, success, error, warning, default.
     */
    type?: string;

    /**
     * Outline button or not.
     */
    outline?: boolean;

    /**
     * Onclick button handler.
     */
    onClick?: () => void;

    /**
     * Button class if any.
     */
    buttonCustomClass?: string;

    /**
     * Icon custom class if any.
     */
    iconCustomClass?: string;

    /**
     * Button inside text custom class, if any.
     */
    textClassName?: string;

    /**
     * Detect if in smaller screen text should be hidden or not.
     */
    smTextHidden?: boolean;

    /**
     * Is button disabled or not.
     */
    disabled?: boolean;

    /**
     * Button Inline style.
     */
    style?: React.CSSProperties;
}

const defaultButtonProps = {
    text: '',
    icon: undefined,
    iconPosition: 'left',
    type: 'default',
    outline: false,
    onClick: () => {},
    buttonCustomClass: '',
    iconCustomClass: '',
    textClassName: '',
    smTextHidden: false,
    disabled: false,
    style: {},
};

const Button = (props: IButton) => {
    const {
        text,
        icon,
        iconPosition,
        type,
        outline,
        onClick,
        buttonCustomClass,
        iconCustomClass,
        disabled,
        textClassName,
        smTextHidden,
        style,
    } = { ...defaultButtonProps, ...props };

    /**
     * Get class Name for button from props.
     *
     * @return string
     */
    const getClassName = () => {
        let className = `transition px-4 pl-4 py-2 leading-5 rounded-md font-medium text-sm`;
        let textColor = 'white';
        let bgColor = '';
        let borderColor = '';
        let bgActiveColor = '';
        let hoverTextColor = 'white';

        switch (type) {
            case 'primary':
                textColor = outline ? 'primary' : 'white';
                bgColor = outline ? 'white' : 'primary';
                bgActiveColor = outline ? 'primary-dark' : 'primary-dark';
                borderColor = outline ? 'blue-800' : 'transparent';
                break;

            case 'warning':
                textColor = outline ? 'yellow-500' : 'white';
                bgColor = outline ? 'white' : 'yellow-500';
                bgActiveColor = outline ? 'yellow-600' : 'yellow-600';
                borderColor = outline ? 'yellow-500' : 'transparent';
                break;

            case 'error':
                textColor = outline ? 'error' : 'white';
                bgColor = outline ? 'white' : 'bg-red-500';
                bgActiveColor = outline ? 'error-dark' : 'error';
                borderColor = outline ? 'error' : 'transparent';
                break;

            case 'success':
                textColor = outline ? 'success' : 'white';
                bgColor = outline ? 'white' : 'success-dark';
                bgActiveColor = outline ? 'success-dark' : 'success';
                borderColor = outline ? 'success' : 'transparent';
                break;

            case 'default':
                textColor = 'black';
                bgColor = outline ? 'white' : 'gray-liter';
                bgActiveColor = outline ? 'gray-liter' : 'gray-liter';
                borderColor = outline ? 'transparent' : 'gray-dark';
                hoverTextColor = 'black'; // outline ? 'black' : 'white';
                break;

            default:
                break;
        }

        // Add background and text colors
        className += ` !bg-${bgColor} hover:!bg-${bgActiveColor} hover:!bg-opacity-80 !focus:bg-${bgActiveColor} text-${textColor} hover:text-${hoverTextColor} focus:text-${textColor} hover:rounded-md focus:rounded-md focus:outline-none`;

        // Add border with color
        className += ` border ${
            outline ? ' border-solid ' : ''
        } border-${borderColor} hover:border-${borderColor} focus:border-${borderColor}`;

        // Add opacity for disabled button
        if (disabled) {
            className += ' opacity-50 cursor-not-allowed';
        }

        // Add custom class name if provided
        if (
            typeof buttonCustomClass !== 'undefined' &&
            buttonCustomClass !== null
        ) {
            className = `${buttonCustomClass} ${className}`;
        }

        return className;
    };

    return (
        <button
            className={getClassName()}
            style={{ ...style }}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {typeof icon !== 'undefined' && iconPosition === 'left' && (
                <span
                    className={`${
                        smTextHidden ? 'px-0 sm:px-2' : 'px-2'
                    } pl-0 ${iconCustomClass}`}
                >
                    <FontAwesomeIcon icon={icon} />
                </span>
            )}

            <span className={textClassName}>{text}</span>

            {typeof icon !== 'undefined' && iconPosition === 'right' && (
                <span className={`px-2 ${iconCustomClass}`}>
                    <FontAwesomeIcon icon={icon} />
                </span>
            )}
            <br />
        </button>
    );
};

Button.defaultProps = defaultButtonProps;

export default Button;
