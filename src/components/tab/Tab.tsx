/**
 * External dependencies
 */
import { useState, useEffect } from '@wordpress/element';

interface ITabItem {
    /**
     * Tab Item Title.
     */
    title: string;

    /**
     * Tab Item slug or key.
     */
    key: string;
}

interface ITab {
    /**
     * Table items.
     */
    groups: Array<ITabItem>;

    /**
     * On click tab group item.
     */
    onClickGroup?: (group: ITabItem) => void;

    /**
     * Active tab item group.
     */
    activeTab?: ITabItem | string;

    /**
     * Set active tab group.
     */
    setActiveTab?: (group: ITabItem) => void;

    /**
     * Custom tab wrapper class if any.
     */
    customTabWrapperClass?: string;
}

export const defaultTabProps = {
    groups: [],
    onClickGroup: () => {},
    activeTab: '',
    setActiveTab: () => {},
    customTabWrapperClass: '',
};

const Tab = (props: ITab) => {
    const {
        groups,
        onClickGroup,
        activeTab,
        setActiveTab,
        customTabWrapperClass,
    } = props;
    const [groupClassName, setGroupClassName] = useState('');
    const [customTabWrapperClassName, setCustomTabWrapperClassName] =
        useState('');

    useEffect(() => {
        setGroupClassName(
            'flex-none text-base pb-2 w-auto pl-5 pr-5 cursor-pointer'
        );

        setCustomTabWrapperClassName(
            typeof customTabWrapperClass !== 'undefined'
                ? customTabWrapperClass
                : ''
        );
    }, [groups]);

    const onSelectTab = (group: ITabItem) => {
        if (
            typeof setActiveTab === 'function' &&
            typeof onClickGroup === 'function'
        ) {
            setActiveTab(group);
            onClickGroup(group);
        }
    };

    return (
        <div
            className={`p-2 border-b border-gray-lite pl-4 ${customTabWrapperClassName}`}
        >
            <div className="flex mb-[-9px] ml-[-16px]">
                {groups.map((group, index: number) => (
                    <div
                        className={`${
                            activeTab === group
                                ? ' text-primary border-solid border-b-2 border-y border-t-0 font-medium '
                                : ' text-gray-dark '
                        } ${groupClassName}`}
                        key={index}
                        onClick={() => onSelectTab(group)}
                    >
                        {group.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

Tab.defaultProps = defaultTabProps;

export default Tab;
