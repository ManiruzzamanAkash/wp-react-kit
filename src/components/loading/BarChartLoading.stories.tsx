import { ComponentStory, ComponentMeta } from '@storybook/react';

import BarChartLoading from './BarChartLoading';

export default {
    title: 'Common/Loading/BarChartLoading',
    component: BarChartLoading,
} as ComponentMeta<typeof BarChartLoading>;

const Template: ComponentStory<typeof BarChartLoading> = (args) => (
    <BarChartLoading {...args} />
);

export const DefaultBarChartLoading = Template.bind({});
