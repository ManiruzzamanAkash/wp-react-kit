/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SvgCircleDefaultIcon from '../svg/SvgCircleDefaultIcon';
import SvgCirclePrimaryIcon from '../svg/SvgCirclePrimaryIcon';
import SvgCircleSuccessIcon from '../svg/SvgCircleSuccessIcon';
import SvgCircleWarningIcon from '../svg/SvgCircleWarningIcon';

export interface BadgeProps {
    /**
     * Badge text.
     */
    text: string | JSX.Element;

    /**
     * Badge type - primary, success, warning, default.
     */
    type?: string;

    /**
     * Custom class for badge area.
     */
    customClass?: string;

    /**
     * Will icon show or not.
     */
    hasIcon?: boolean;

    /**
     * Icon if any icon shows.
     */
    icon?: undefined | JSX.Element;
}

/**
 * Get Badge Default Props.
 */
export const BadgeDefaultProps = {
    text: '',
    type: 'default',
    customClass: '',
    hasIcon: false,
    icon: undefined,
};

const Badge = (props: BadgeProps) => {
    const { text, type, customClass, hasIcon, icon } = props;

    const [svgIcon, setSvgIcon] = useState(<></>);

    useEffect(() => {
        if (typeof icon !== 'undefined' && icon !== <></>) {
            setSvgIcon(icon);
        }

        switch (type) {
            case 'success':
                setSvgIcon(SvgCircleSuccessIcon);
                break;

            case 'warning':
                setSvgIcon(SvgCircleWarningIcon);
                break;

            case 'primary':
                setSvgIcon(SvgCirclePrimaryIcon);
                break;

            case 'default':
                setSvgIcon(SvgCircleDefaultIcon);
                break;

            default:
                setSvgIcon(SvgCirclePrimaryIcon);
                break;
        }
    }, [type]);

    const getBadgeClassName = () => {
        let className =
            'rounded-md ml-0 px-3 text-center py-2 w-auto min-w-[80px] whitespace-nowrap inline-block';

        switch (type) {
            case 'success':
                className += ' bg-success-lite';
                break;

            case 'warning':
                className += ' bg-warning-lite';
                break;

            case 'default':
                className += ' bg-gray-liter';
                break;

            default:
                className += ' bg-white';
                break;
        }

        if (typeof customClass !== 'undefined' && customClass.length) {
            className += ` ${customClass}`;
        }

        return className;
    };

    return (
        <span className={getBadgeClassName()}>
            {hasIcon && <span className="w-4 h-4 mr-2">{svgIcon}</span>}

            <span className="text-left pr-1">{text}</span>
        </span>
    );
};

Badge.defaultProps = BadgeDefaultProps;

export default Badge;
