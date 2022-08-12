import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from './Input';

export default {
    title: 'Common/Input/Input',
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
    type: 'text',
};

export const TextareaInput = Template.bind({});
TextareaInput.args = {
    type: 'textarea',
};
