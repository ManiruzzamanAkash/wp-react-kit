import apiFetch from '@wordpress/api-fetch';
import { companiesEndpoint } from './endpoint';

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

    CREATE_COMPANY( action: { payload: Record< string, unknown > } ) {
        return apiFetch( {
            path: companiesEndpoint,
            method: 'POST',
            data: action.payload,
        } );
    },

    UPDATE_COMPANY( action: { payload: Record< string, unknown > } ) {
        const path = `${ companiesEndpoint }/${ action.payload.id }`;
        return apiFetch( { path, method: 'PUT', data: action.payload } );
    },

    DELETE_COMPANIES( action: { payload: { ids: number[] } } ) {
        return apiFetch( {
            path: companiesEndpoint,
            method: 'DELETE',
            data: action.payload,
        } );
    },
};

export default controls;
