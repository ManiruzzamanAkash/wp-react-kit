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
        <nav className="job-place-navbar">
            <ul>
                <li>
                    <Link to="/">{__('Home', 'jobplace')}</Link>
                </li>
                <li>
                    <Link to="/jobs">{__('Jobs', 'jobplace')}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
