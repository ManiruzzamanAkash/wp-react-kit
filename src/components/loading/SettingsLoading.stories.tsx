import { ComponentStory, ComponentMeta } from '@storybook/react';

import SettingsLoading from './SettingsLoading';

export default {
    title: 'Common/Loading/SettingsLoading',
    component: SettingsLoading,
} as ComponentMeta<typeof SettingsLoading>;

const Template: ComponentStory<typeof SettingsLoading> = (args) => (
    <SettingsLoading {...args} />
);

export const DefaultSettingsLoading = Template.bind({});
