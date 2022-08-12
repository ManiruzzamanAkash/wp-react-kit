/**
 * External dependencies.
 */
import { useState } from '@wordpress/element';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import SelectListItem from '../page-partials/SelectListItem';
import SelectedItem from '../page-partials/SelectedItem';

type Props = {
    checked: number[];

    onChange: (checked: number[]) => void;
};

export default function SelectCheckBox({ checked }: Props) {
    const [action, setAction] = useState('');
    const applyActionLoading = false;

    const handleApplyAction = () => {
        if (action === '') {
            toast.warning(__('Please select an action.', 'jobplace'));
            return;
        }

        if (action === 'delete') {
            //  dispatch(deleteEmailTemplateAction(checked));
        }

        // finally clear the action
        setAction('');
    };

    return (
        <div className="bg-white p-3">
            <SelectListItem
                action={action}
                setAction={setAction}
                applyActionLoading={applyActionLoading}
                handleApplyAction={handleApplyAction}
            />
            <SelectedItem checked={checked} />
        </div>
    );
}
