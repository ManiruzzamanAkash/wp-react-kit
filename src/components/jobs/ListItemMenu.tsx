/**
 * External dependencies.
 */
import { Menu } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
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
        </Menu>
    );
}
