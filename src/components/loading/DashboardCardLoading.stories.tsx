import { ComponentStory, ComponentMeta } from '@storybook/react';

import DashboardCardLoading from './DashboardCardLoading';

export default {
    title: 'Common/Loading/DashboardCardLoading',
    component: DashboardCardLoading,
} as ComponentMeta<typeof DashboardCardLoading>;

const Template: ComponentStory<typeof DashboardCardLoading> = (args) => (
    <DashboardCardLoading {...args} />
);

export const DefaultDashboardCardLoading = Template.bind({});
