import { ComponentStory, ComponentMeta } from '@storybook/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Common/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    type: 'primary',
    text: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    type: 'default',
    text: 'Default Button',
};

export const Warning = Template.bind({});
Warning.args = {
    type: 'warning',
    text: 'Warning Button',
};

export const Large = Template.bind({});
Large.args = {
    text: 'Large Button',
};

export const Small = Template.bind({});
Small.args = {
    text: 'Small Button',
};

export const CustomButton = Template.bind({});
CustomButton.args = {
    text: 'Custom Button Example',
    type: 'default',
    buttonCustomClass:
        'bg-red-400 hover:bg-white hover:text-black text-white hover:bg-gray-liter',
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
    text: 'Outline Button',
    type: 'primary',
    outline: true,
};

export const IconButtonRight = Template.bind({});
IconButtonRight.args = {
    text: 'Icon Button Right',
    icon: faPlus,
    iconPosition: 'right',
    type: 'primary',
    outline: true,
};

export const IconButtonLeft = Template.bind({});
IconButtonLeft.args = {
    text: 'Icon Button Left',
    icon: faPlus,
    iconPosition: 'left',
    type: 'primary',
    outline: true,
};
