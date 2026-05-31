/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Modal from './Modal';

export default {
    title: 'Common/Modal',
    component: Modal,
} as ComponentMeta<typeof Modal>;

export const DefaultModal = () => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Modal
            </Button>

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
