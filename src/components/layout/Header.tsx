/**
 * External dependencies
 */
import { memo } from '@wordpress/element';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import HelpMenu from './HelpMenu';
import NavMenu from './NavMenu';
import { getGlobalData } from '../../utils/global-data';

function Header() {
    return (
        <header className="sticky top-1 bg-white z-30 shadow-sm mb-2">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    <div className="flex lg:block">
                        <Link
                            to="/"
                            onClick={() => {}}
                            className="text-gray-900 font-medium text-lg focus:outline-none focus:shadow-none"
                        >
                            <span className="">
                                <img
                                    src={getGlobalData('logo_full')}
                                    alt=""
                                    className="w-32 inline"
                                />
                            </span>

                            {/* <span className="p-2 bg-gray-liter border border-primary-dark text-black font-semibold rounded-full pl-4 pr-4 ml-4 text-[12px]">
                                0.0.1
                            </span> */}
                        </Link>
                    </div>
                    <div className="flex items-center mb-1">
                        <NavMenu />
                        <div className="ml-6">
                            <HelpMenu />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
