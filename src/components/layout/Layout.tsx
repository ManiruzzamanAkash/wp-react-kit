/**
 * External dependencies
 */
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export interface ILayout {
    // Page Heading Section: Required
    title: JSX.Element;
    slug: string;
    headingCustomClass?: string;

    // Back buttons
    hasBackButton?: boolean;
    backButtonTitle?: string;
    backButtonLink?: string;

    // Page Right Side Contents
    hasRightSideContent?: boolean;
    rightSideContent?: JSX.Element;

    children: React.ReactNode;
}

export default function Layout({
    title = <></>,
    slug = '',
    headingCustomClass = '',
    hasBackButton = false,
    backButtonTitle = '',
    backButtonLink = '',
    hasRightSideContent = false,
    rightSideContent = <></>,
    children,
}: ILayout) {
    const getClassNames = () => {
        let leftSideClassNames = 'flex-1';
        const rightSideClassNames = 'flex-end text-right';

        // For overview/dashboard page, remove right side flex for mobile devices.
        if ('overview' === slug || 'email-template-create' === slug) {
            leftSideClassNames = 'flex-none';
        }

        return {
            leftSideClassNames,
            rightSideClassNames,
        };
    };

    return (
        <div className={`cp-${slug}-page`}>
            {hasBackButton && (
                <div className="w-full mb-2">
                    <Link
                        to={
                            typeof backButtonLink !== 'undefined'
                                ? backButtonLink
                                : ''
                        }
                        className="focus:shadow-none focus:outline-none"
                    >
                        <span className="text-gray-dark text-sm">
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="mr-3"
                            />
                            {backButtonTitle}
                        </span>
                    </Link>
                </div>
            )}

            {/* Page Heading Section */}
            <div
                className={`relative flex mt-5 mb-2 mx-8 ${headingCustomClass}`}
            >
                <div className={getClassNames().leftSideClassNames}>
                    {title}
                </div>

                {/* Page Right Side Section */}
                {hasRightSideContent && (
                    <div className={getClassNames().rightSideClassNames}>
                        {rightSideContent}
                    </div>
                )}
            </div>

            {/* Page Content Section */}
            <div className="cp-content-area mx-8">{children}</div>
        </div>
    );
}
