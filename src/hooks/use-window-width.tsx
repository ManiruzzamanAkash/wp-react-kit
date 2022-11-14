/**
 * External dependencies.
 */
import { useEffect, useState } from '@wordpress/element';
import { debounce } from 'lodash';

function useWindowWidth(delay: number = 500) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        const debouncedHandleResize = debounce(handleResize, delay);
        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [delay]);

    return width;
}

export default useWindowWidth;
