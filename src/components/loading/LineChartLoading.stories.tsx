import { ComponentStory, ComponentMeta } from '@storybook/react';

import LineChartLoading from './LineChartLoading';

export default {
    title: 'Common/Loading/LineChartLoading',
    component: LineChartLoading,
} as ComponentMeta<typeof LineChartLoading>;

const Template: ComponentStory<typeof LineChartLoading> = (args) => (
    <LineChartLoading {...args} />
);

export const DefaultLineChartLoading = Template.bind({});
