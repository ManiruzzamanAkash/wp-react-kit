import { useState } from '@wordpress/element';
import { ComponentMeta } from '@storybook/react';

import Input from './Input';

export default {
    title: 'Common/Input/SwitchInput',
    component: Input,
} as ComponentMeta<typeof Input>;

export const SwitchInput = () => {
    const [switchActive, setSwitchAActive] = useState(false);
    return (
        <Input
            type="switch"
            value={switchActive ? '1' : '0'}
            onChange={() => setSwitchAActive(!switchActive)}
        />
    );
};
