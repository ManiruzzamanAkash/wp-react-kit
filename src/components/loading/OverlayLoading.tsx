/**
 * External dependencies.
 */
import { useSelector } from 'react-redux';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { IRootReducer } from '../../../interfaces/ReducerInterface';

const OverlayLoading = () => {
    const { loading, loadingText, loadingDescription } = useSelector(
        (state: IRootReducer) => state.global
    );

    return loading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-80 flex flex-col items-center justify-center bg-[#cccccce8]">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-red text-xl font-semibold">
                {loadingText}
            </h2>
            {loadingDescription.length > 0 && <div>{loadingDescription}</div>}
        </div>
    ) : (
        <></>
    );
};

export default OverlayLoading;
