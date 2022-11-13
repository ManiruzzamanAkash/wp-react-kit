/**
 * External dependencies.
 */
import { scroller } from 'react-scroll';
import { __ } from '@wordpress/i18n';

type Props = {
    loading?: boolean;
};

export default function JobFormSidebar({ loading }: Props) {
    const goToSection = (className: string) => {
        scroller.scrollTo(className, {
            duration: 800,
            delay: 0,
            offset: -90,
            smooth: 'easeInOutQuart',
        });
    };

    const menus = [
        {
            slug: 'job-general-info',
            label: __('General Information', 'jobplace'),
        },
        {
            slug: 'job-description-info',
            label: __('Job Description', 'jobplace'),
        },
        {
            slug: 'job-company-info',
            label: __('Company Information', 'jobplace'),
        },
    ];

    return (
        <div className="bg-white py-5 pl-4 pr-10 mb-3 md:sticky md:top-24">
            <h3 className="text-center font-bold">
                {__('Quick Jump', 'jobplace')}
            </h3>
            <ul>
                {loading ? (
                    <>
                        <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                        <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                        <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                    </>
                ) : (
                    <>
                        {menus.map((menu, index) => (
                            <li
                                key={index}
                                className="cursor-pointer text-center transition bg-slate-100 hover:bg-slate-200 p-2.5 rounded-lg mt-5"
                                onClick={() => goToSection(menu.slug)}
                                onKeyDown={() => goToSection(menu.slug)}
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                role="button"
                            >
                                {menu.label}
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}
