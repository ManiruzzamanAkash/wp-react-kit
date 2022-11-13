/**
 * External dependencies.
 */
import { Link } from 'react-router-dom';
import { Fragment } from '@wordpress/element';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

interface IListItemMenu {
    /**
     * Email template id.
     */
    id: number;
}

export default function ListItemMenu({ id }: IListItemMenu) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full pr-3 pl-0 py-2 text-sm font-medium">
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        color={'#ddd'}
                        className="mr-1"
                    />
                </Menu.Button>
            </div>

            {/* Todo: Add this functionality later */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute w-28 z-10 top-4 -left-28 mt-2 origin-top-right rounded-md shadow-lg bg-white p-2 border-gray-dark">
                    <div className="px-1 py-1 bg-white">
                        <Menu.Item>
                            <Link
                                to={`/jobs/edit/${id}`}
                                className="text-slate-600 hover:text-slate-700 group items-center w-full px-3 text-sm bg-white outline-none hover:outline-none focus:outline-none focus:shadow-none"
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                                <span className="ml-2">
                                    {__('Edit', 'jobplace')}
                                </span>
                            </Link>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
