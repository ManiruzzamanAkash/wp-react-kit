/**
 * External dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal dependencies.
 */
import Badge from '../Badge';

describe('Badge', () => {
    it('should render without crashing', () => {
        render(<Badge text={'Simple'} type="primary" />);
        // expect(screen.getByTitle('testResult')).toHaveTextContent('null');
    });
});
