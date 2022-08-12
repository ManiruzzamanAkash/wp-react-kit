import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from './Pagination';

export default {
    title: 'Common/Pagination',
    component: Pagination
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const DefaultPagination = Template.bind({});
DefaultPagination.args = {
    perPage: 10,
    total: 1000,
    // paginate: () => { }
}

export const PaginationSmallItems = Template.bind({});
PaginationSmallItems.args = {
    perPage: 20,
    total: 6,
    // paginate: () => { }
}
