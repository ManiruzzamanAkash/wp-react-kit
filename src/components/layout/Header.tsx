/**
 * External dependencies
 */
import { memo } from '@wordpress/element';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NavMenu from './NavMenu';

function Header() {
    return (
        <header className="sticky top-6 bg-white z-30 shadow-sm mb-2">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    <div className="flex lg:block">
                        <Link
                            to="/"
                            onClick={() => {}}
                            className="text-gray-900 font-medium text-lg focus:outline-none focus:shadow-none"
                        >
                            <span className="text-primary">WP React Kit</span>
                        </Link>
                    </div>
                    <div className="flex items-center mb-1">
                        <NavMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
