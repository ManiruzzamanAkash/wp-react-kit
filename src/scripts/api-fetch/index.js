const apiFetch = wp.apiFetch;
const { addQueryArgs } = wp.url;

apiFetch.fetchAllMiddleware = null;

apiFetch.use(
	apiFetch.createRootURLMiddleware(
		window?.parent?.jobPlaceFetchData?.root_url ||
			window?.jobPlaceFetchData?.root_url
	)
);

if ( window?.jobPlaceFetchData?.nonce ) {
	apiFetch.nonceMiddleware = apiFetch.createNonceMiddleware(
		window?.jobPlaceFetchData?.nonce
	);
	apiFetch.use( apiFetch.nonceMiddleware );
}

apiFetch.use( ( options, next ) => {
	options.path = addQueryArgs( options.path, { t: Date.now() } );
	return next( options );
} );

export default apiFetch;
