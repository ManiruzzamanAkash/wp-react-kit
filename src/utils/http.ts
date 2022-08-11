/**
 * External Dependencies.
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies.
 */
import { getGlobalData } from './global-data';

/**
 * Http - Axios Wrapper.
 */
const http = axios.create({
    baseURL: getGlobalData('rest').root + getGlobalData('rest').version,
    headers: {
        'X-WP-Nonce': getGlobalData('rest').nonce,
    },
});

/**
 * Global Error Handler.
 *
 * @param {Object} error
 *
 * @return {void}
 */
const globalErrorHandler = (error: any) => {
    const statusCode = error.response ? error.response.status : null;

    if (statusCode === 400) {
        // Handle input response errors
        const errors = error.response.data.data.params;

        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                // format the error message to show a better error message
                // replace the '_' with a space and capitalize the first letter
                const errorMessage = errors[key]
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (l: any) => l.toUpperCase());

                toast.error(errorMessage);
                break;
            }
        }
    }

    if (statusCode === 404) {
        toast.error(
            __(
                'The requested resource does not exist or has been deleted.',
                'cp'
            )
        );
    }

    if (statusCode === 401) {
        toast.error(
            __('Unauthorized. Please login to access this resource.', 'cp')
        );
    }

    if (statusCode === 500) {
        // Handle server error responses.
        const errors = error.response;
        if (typeof errors.data.message === 'string') {
            toast.error(errors.data.message);
        }
    }
};

// Add interceptor to handle errors
http.interceptors.response.use(undefined, function (error) {
    globalErrorHandler(error);
    return Promise.reject(error);
});

export default http;
