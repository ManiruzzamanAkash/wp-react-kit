/**
 * External dependencies
 */
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faJoint,
    faProjectDiagram,
    faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useMenuFix from '../../hooks/useMenuFix';

function NavMenu() {
    const location = useLocation();

    // Fix admin menu sidebar links.
    useMenuFix();

    const navRoutes = location.pathname.split('/');

    const isActive = (path: string) => {
        const routeName: string =
            typeof navRoutes[1] !== 'undefined' ? navRoutes[1] : path;

        if ('/' + routeName === path) {
            return true;
        }

        return false;
    };

    return (
        <div className="flex justify-center align-baseline">
            <Link
                to="/"
                className={`flex-grow text-slate-500 hover:text-primary border-b-2 hover:border-primary focus:border-primary py-6 px-4 sm:p-6 hover:bg-gray-liter max-w-[9rem] focus:outline-none focus:shadow-none ${
                    isActive('/')
                        ? 'bg-gray-liter text-primary border-primary'
                        : 'border-transparent'
                }`}
            >
                <span className="inline float-left">
                    <FontAwesomeIcon icon={faHome} />
                </span>
                <span className="sm:inline hidden float-left md:ml-3">
                    {__('Home', 'jobplace')}
                </span>
            </Link>
            <Link
                to="/jobs"
                className={`flex-grow text-slate-500 hover:text-primary border-b-2 hover:border-primary focus:border-primary py-6 px-4 sm:p-6 hover:bg-gray-liter max-w-[9rem] focus:outline-none focus:shadow-none ${
                    isActive('/jobs')
                        ? 'bg-gray-liter text-primary border-primary'
                        : 'border-transparent'
                }`}
            >
                <span className="inline float-left">
                    <FontAwesomeIcon icon={faProjectDiagram} />
                </span>
                <span className="sm:inline hidden float-left md:ml-3">
                    {__('Jobs', 'jobplace')}
                </span>
            </Link>
        </div>
    );
}

export default NavMenu;
