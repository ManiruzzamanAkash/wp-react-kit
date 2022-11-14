/**
 * External dependencies.
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies.
 */
import { jobsEndpoint } from './endpoint';

const controls = {
    FETCH_FROM_API(action) {
        return apiFetch({ path: action.path });
    },

    FETCH_FROM_API_UNPARSED(action: { path: any }) {
        return apiFetch({ path: action.path, parse: false }).then(
            (response: { headers: object; json: any }) =>
                Promise.all([response.headers, response.json()]).then(
                    ([headers, data]) => ({ headers, data })
                )
        );
    },

    CREATE_JOBS(action) {
        return apiFetch({
            path: jobsEndpoint,
            method: 'POST',
            data: action.payload,
        });
    },

    UPDATE_JOBS(action) {
        const path = jobsEndpoint + '/' + action.payload.id;
        return apiFetch({ path, method: 'PUT', data: action.payload });
    },

    DELETE_JOBS(action) {
        const path = jobsEndpoint;
        return apiFetch({ path, method: 'DELETE', data: action.payload });
    },
};

export default controls;
