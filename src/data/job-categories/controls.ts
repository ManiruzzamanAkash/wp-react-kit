import apiFetch from '@wordpress/api-fetch';
import { jobCategoriesEndpoint } from './endpoint';

const controls = {
    FETCH_FROM_API( action: { path: string } ) {
        return apiFetch( { path: action.path } );
    },

    FETCH_FROM_API_UNPARSED( action: { path: string } ) {
        return apiFetch( { path: action.path, parse: false } ).then(
            ( response: { headers: Headers; json: () => Promise< unknown > } ) =>
                Promise.all( [ response.headers, response.json() ] ).then(
                    ( [ headers, data ] ) => ( { headers, data } )
                )
        );
    },

    CREATE_JOB_CATEGORY( action: { payload: Record< string, unknown > } ) {
        return apiFetch( {
            path: jobCategoriesEndpoint,
            method: 'POST',
            data: action.payload,
        } );
    },

    UPDATE_JOB_CATEGORY( action: { payload: Record< string, unknown > } ) {
        const path = `${ jobCategoriesEndpoint }/${ action.payload.id }`;
        return apiFetch( { path, method: 'PUT', data: action.payload } );
    },

    DELETE_JOB_CATEGORIES( action: { payload: { ids: number[] } } ) {
        return apiFetch( {
            path: jobCategoriesEndpoint,
            method: 'DELETE',
            data: action.payload,
        } );
    },
};

export default controls;
