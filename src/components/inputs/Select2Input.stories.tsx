import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select2Input from './Select2Input';

export default {
    title: 'Common/Input/Select2Input',
    component: Select2Input,
} as ComponentMeta<typeof Select2Input>;

const Template: ComponentStory<typeof Select2Input> = (args) => (
    <Select2Input {...args} />
);

export const DefaultSelect2Input = Template.bind({});
DefaultSelect2Input.args = {
    options: [
        {
            label: 'Apple',
            value: 'apple',
        },
        {
            label: 'Banana',
            value: 'banana',
        },
    ],
    placeholder: 'Select Fruits...',
};
