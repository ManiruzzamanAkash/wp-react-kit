import { ComponentStory, ComponentMeta } from '@storybook/react';

import TableLoading from './TableLoading';

export default {
    title: 'Common/Loading/TableLoading',
    component: TableLoading,
} as ComponentMeta<typeof TableLoading>;

const Template: ComponentStory<typeof TableLoading> = (args) => (
    <TableLoading {...args} />
);

export const DefaultTableLoading = Template.bind({});
