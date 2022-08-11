import { useState } from '@wordpress/element';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tab from './Tab';

export default {
    title: 'Common/Tab',
    component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

const groupTabs = [
    {
        title: 'All Carts',
        key: 'all',
    },
    {
        title: 'Abandoned Carts',
        key: 'abandoned',
    },
    {
        title: 'Recovered Carts',
        key: 'recovered',
    },
];

export const ControlledTab = () => {
    const [activeTab, setActiveTab] = useState(groupTabs[0]);
    return (
        <Tab
            groups={groupTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
    );
};

export const DefaultTab = Template.bind({});

DefaultTab.args = {
    groups: groupTabs,
};
