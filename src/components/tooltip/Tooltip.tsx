/**
 * External dependencies
 */
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Internal dependencies
 */
import './tooltip-style.scss';

interface ITooltip {
    /**
     * Tooltip child content.
     */
    innerContent?: string | JSX.Element;

    /**
     * Custom class name for content-area.
     */
    className?: string;
}

const defaultTooltipProps = {
    innerContent: '',
    className: '',
};

const Tooltip = (props: ITooltip) => {
    const { children, innerContent, className } = props;

    return (
        <div className="cp-tooltip relative inline-block ml-2">
            {innerContent === '' || innerContent === <></> ? (
                <span className="bg-gray-liter border-gray-dark border-2 rounded-full px-1.5">
                    <FontAwesomeIcon
                        icon={faInfo}
                        className="text-gray-dark"
                        size="xs"
                    />
                </span>
            ) : (
                innerContent
            )}

            <span
                dangerouslySetInnerHTML={{ __html: children }}
                className={`cp-tooltip-text invisible hover:visible bg-black text-white text-center w-72 absolute z-40 rounded-md px-2 py-1 ${className}`}
            />
        </div>
    );
};

Tooltip.defaultProps = defaultTooltipProps;

export default Tooltip;
