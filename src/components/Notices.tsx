/**
 * External dependencies.
 */
import { SnackbarList } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies.
 */
import './notices.scss';

/**
 * Renders the snackbar notices created through the `core/notices` store.
 */
export default function Notices() {
    const notices = useSelect(
        ( select ) => select( noticesStore ).getNotices(),
        []
    );
    const { removeNotice } = useDispatch( noticesStore );

    const snackbarNotices = notices.filter(
        ( notice ) => notice.type === 'snackbar'
    );

    if ( ! snackbarNotices.length ) {
        return null;
    }

    return (
        <SnackbarList
            notices={ snackbarNotices }
            onRemove={ removeNotice }
            className="wprk-snackbar-notices"
        />
    );
}
