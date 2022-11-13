/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies.
 */
import Badge from '../Badge';
import SvgCirclePrimaryIcon from '../../svg/SvgCirclePrimaryIcon';

const props = {
    text: 'Simple Badge',
    type: 'primary',
};

const renderBadge = (customProps = {}) => {
    return render(<Badge {...{ ...props, ...customProps }} />);
};

describe('Badge', () => {
    it('should render without crashing', () => {
        renderBadge();
        const badgeText = screen.getByText(props.text);
        expect(badgeText).toBeInTheDocument();
    });

    // Check hasIcon prop and svgIcon is given or not.
    it('should render svg icon if hasIcon is true', () => {
        const { container } = renderBadge({
            hasIcon: true,
            svgIcon: SvgCirclePrimaryIcon,
        });

        const svgIcon = container.querySelector('svg');
        expect(svgIcon).toBeInTheDocument();
    });

    // Check if customClass is given and the class is present or not.
    it('should render with custom class if it has been given', () => {
        const customClass = 'bg-red-500';

        const { container } = renderBadge({
            customClass,
        });

        expect(container.firstChild).toHaveClass(customClass);
    });
});
