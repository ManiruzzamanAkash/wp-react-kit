/**
 * Internal dependencies.
 */
import { getGlobalData } from '../../utils/global-data';

export default function LogoIcon({
    className = '',
    isFull = false,
    style = {},
}) {
    return (
        <img
            src={
                !isFull
                    ? getGlobalData('logo_icon')
                    : getGlobalData('logo_full')
            }
            alt=""
            className={className}
            style={style}
        />
    );
}
