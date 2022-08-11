/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { ComponentMeta } from '@storybook/react';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Modal from './Modal';
import Button from '../button/Button';

export default {
    title: 'Common/Modal',
    component: Modal,
} as ComponentMeta<typeof Modal>;

export const DefaultModal = () => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <Button
                text="Open Modal"
                type="primary"
                onClick={() => setOpen(true)}
            />

            <Modal
                title={'Are you sure to delete the items...'}
                open={open}
                setOpen={setOpen}
                children={
                    <>
                        <p>Items will be deleted permanently.</p>
                    </>
                }
            />
        </div>
    );
};
