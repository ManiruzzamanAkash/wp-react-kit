/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { menuFix } from '../utils/MenuFix';

export default function useMenuFix() {
    const location = useLocation();

    /**
     * Call menuFix after any route changes.
     *
     * fix the admin menu for the slug
     */
    useEffect(() => {
        menuFix();
    }, [location.pathname]);

    return null;
}
