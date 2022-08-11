/**
 * External dependencies
 */
import { Fragment, useState, useRef } from '@wordpress/element';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useOutsideClick from '../../hooks/useOutsideClick';

function HelpMenu() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // Use outside click to close the dropdown.
    useOutsideClick(trigger, dropdown, () => setDropdownOpen(false));

    return (
        <div className="relative inline-flex ml-3">
            <button
                ref={trigger}
                className={`w-8 h-8 flex items-center justify-center bg-gray-100 bg-gray-lite transition duration-150 rounded-full ${
                    dropdownOpen && 'bg-gray-lite focus:outline-none'
                }`}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <span className="sr-only">{__('Help', 'jobplace')}</span>
                <FontAwesomeIcon icon={faInfo} className="text-sm" />
            </button>

            <Transition
                as={Fragment}
                show={dropdownOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 min-w-80 bg-white border border-gray-lite py-1.5 rounded shadow-lg overflow-hidden mt-1">
                    <div
                        ref={dropdown}
                        onFocus={() => setDropdownOpen(true)}
                        onBlur={() => setDropdownOpen(false)}
                    >
                        <div className="text-xs font-semibold text-gray-400 uppercase pt-3 pb-3 px-4">
                            {__('Documentation', 'jobplace')}
                        </div>
                        <ul className="list-none ml-0">
                            <li className="border-b border-gray-lite first:border-t last:border-0">
                                <a
                                    className="block py-2 px-4 hover:bg-opacity-80 hover:text-primary"
                                    href="https://cartpulse.co/faq"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="block text-sm mb-2">
                                        {__(
                                            'Frequently Asked Questions (FAQ)',
                                            'jobplace'
                                        )}
                                    </span>
                                </a>
                            </li>
                            <li className="border-b border-gray-lite first:border-t last:border-0">
                                <a
                                    className="block py-2 px-4 hover:bg-opacity-80 hover:text-primary"
                                    href="https://cartpulse.co/docs/getting-started"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="block text-sm mb-2">
                                        {__('How to start', 'jobplace')}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Transition>
        </div>
    );
}

export default HelpMenu;
