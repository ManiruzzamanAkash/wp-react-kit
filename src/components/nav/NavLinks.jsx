/**
 * External dependencies
 */
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

const NavLinks = () => {
    return (
        <nav className="job-place-navbar mt-4">
            <ul className="list-none">
                <li className="inline-block">
                    <Link
                        to="/"
                        className="bg-[#1d2327] text-white mr-0.5 py-2.5 px-5 transition text-center hover:text-white hover:font-bold"
                    >
                        {__('Home', 'jobplace')}
                    </Link>
                </li>
                <li className="inline-block">
                    <Link
                        to="/jobs"
                        className="bg-[#1d2327] text-white mr-0.5 py-2.5 px-5 transition text-center hover:text-white hover:font-bold"
                    >
                        {__('Jobs', 'jobplace')}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
