import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from './Badge';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'Common/Badge',
    component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const DefaultBadge = Template.bind({});
DefaultBadge.args = {
    text: 'Simple Badge',
    type: 'default',
};

export const PrimaryBadge = Template.bind({});
PrimaryBadge.args = {
    text: 'Primary Badge',
    type: 'primary',
};

export const WarningBadge = Template.bind({});
WarningBadge.args = {
    text: 'Warning Badge',
    type: 'warning',
};

export const IconBadge = Template.bind({});
IconBadge.args = {
    text: 'Icon Badge',
    type: 'primary',
    icon: faPlusCircle,
    hasIcon: true,
    customClass: 'border border-solid p-2 border-gray',
};
