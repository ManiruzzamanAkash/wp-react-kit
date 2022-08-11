/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';

export default function useOutsideClick(
    triggerRef: any,
    areaRef: any,
    callback: () => void
) {
    // Close on outside click.
    useEffect(() => {
        const clickHandler = (e: any) => {
            if (areaRef === null || areaRef?.current === null) {
                if (triggerRef.current.contains(e.target as Node)) {
                    return;
                }
            } else if (
                triggerRef?.current?.contains(e.target as Node) ||
                areaRef?.current?.contains(e.target as Node)
            ) {
                return;
            }

            callback();
        };

        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [triggerRef, areaRef, callback]);

    // Close on escape key press.
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (keyCode !== 27) return;

            callback();
        };

        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return null;
}
