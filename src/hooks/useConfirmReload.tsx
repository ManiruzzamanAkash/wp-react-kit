/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';

export default function useConfirmReload() {
    // If user tries to reload or close the tab,
    // then show him a warning
    useEffect(() => {
        const unloadCallback = (event: any) => {
            event.preventDefault();
            event.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', unloadCallback);
        return () => window.removeEventListener('beforeunload', unloadCallback);
    }, []);

    return null;
}
