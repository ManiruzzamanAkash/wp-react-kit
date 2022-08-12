import { ComponentStory, ComponentMeta } from '@storybook/react';

import DatePicker from './DatePicker';

export default {
    title: 'Common/DatePicker',
    component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
    <DatePicker {...args} />
);

export const DefaultDatePicker = Template.bind({});
DefaultDatePicker.args = {
    type: 'date-picker',
};

export const DateRangePicker = Template.bind({});
DateRangePicker.args = {
    type: 'date-range-picker',
};
