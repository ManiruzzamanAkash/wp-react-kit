/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

interface ISelectedItem {
    checked: Array<any>;
}

const SelectedItem: React.FC<ISelectedItem> = ({ checked }) => {
    return (
        <span className="ml-2">
            <b className="mr-2">{checked.length}</b>
            <span className="mr-2">
                {checked.length > 1
                    ? __('items', 'jobplace')
                    : __('item', 'jobplace')}{' '}
                {__('selected', 'jobplace')}
            </span>
        </span>
    );
};

export default SelectedItem;
