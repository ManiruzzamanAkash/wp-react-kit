import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './Loading';

export default {
    title: 'Common/Loading/Loading',
    component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
    <Loading {...args} />
);

export const DefaultLoading = Template.bind({});
