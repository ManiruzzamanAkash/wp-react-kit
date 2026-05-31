/**
 * URL helpers for the public jobs board.
 */

export function getBoardUrlParams() {
	const params = new URLSearchParams( window.location.search );

	return {
		search: ( params.get( 'search' ) || '' ).trim(),
		page: Math.max( 1, parseInt( params.get( 'page' ) || '1', 10 ) ),
	};
}

export function syncBoardUrlParams( { search, page } ) {
	const url = new URL( window.location.href );

	if ( search ) {
		url.searchParams.set( 'search', search );
	} else {
		url.searchParams.delete( 'search' );
	}

	if ( page > 1 ) {
		url.searchParams.set( 'page', String( page ) );
	} else {
		url.searchParams.delete( 'page' );
	}

	window.history.replaceState( window.history.state, '', url );
}
