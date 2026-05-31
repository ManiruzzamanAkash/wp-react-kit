const path = require( 'path' );
const glob = require( 'glob' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const dataviewsStyleDir = path.join(
	path.dirname( require.resolve( '@wordpress/dataviews/package.json' ) ),
	'build-style'
);

const blocksConfig = {
	...defaultConfig[ 0 ],
	entry: () => {
		const entries = defaultConfig[ 0 ].entry();

		// Shared styles registered as jobplace-{name} in PHP.
		glob.sync( './src/styles/*.scss' ).forEach( ( file ) => {
			const name = path.basename( file, '.scss' );
			entries[ `styles/${ name }` ] = path.resolve( __dirname, file );
		} );

		entries.index = path.resolve( __dirname, './src/index.tsx' );

		return entries;
	},
	output: {
		...defaultConfig[ 0 ].output,
		path: path.resolve( __dirname, 'build' ),
	},
};

if ( 'production' !== process.env.NODE_ENV ) {
	blocksConfig.devServer = {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'all',
		host: 'localhost',
		port: 8887,
		proxy: {
			'/build': {
				pathRewrite: {
					'^/build': '',
				},
			},
		},
	};
}

blocksConfig.plugins = [
	...( blocksConfig.plugins || [] ),
	new CopyWebpackPlugin( {
		patterns: [
			{
				from: path.join( dataviewsStyleDir, 'style.css' ),
				to: 'dataviews.css',
			},
			{
				from: path.join( dataviewsStyleDir, 'style-rtl.css' ),
				to: 'dataviews-rtl.css',
			},
		],
	} ),
];

const modulesConfig = {
	...defaultConfig[ 1 ],
	entry: () => {
		const entries = {};

		glob.sync( './src/scripts/**/index.js' ).forEach( ( file ) => {
			const relative = file.replace( /^\.\//, '' );
			const name = relative
				.replace( /^src\/scripts\//, '' )
				.replace( /\/index\.js$/, '' );
			entries[ `scripts/${ name }/index` ] = path.resolve( __dirname, file );
		} );

		return entries;
	},
	output: {
		...defaultConfig[ 1 ].output,
		path: path.resolve( __dirname, 'build' ),
	},
	externals: {
		...defaultConfig[ 1 ]?.externals,
		'@jobplace/api-fetch': '@jobplace/api-fetch',
		'@jobplace/jobs-service': '@jobplace/jobs-service',
	},
};

module.exports = [ blocksConfig, modulesConfig ];
