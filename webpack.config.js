const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaults = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const config = { ...defaults };

// Location of the DataViews stylesheet, copied into build/ and enqueued via PHP.
const dataviewsStyleDir = path.join(
    path.dirname( require.resolve('@wordpress/dataviews/package.json') ),
    'build-style'
);

// Add server only for development mode and not for production.
if ('production' !== process.env.NODE_ENV) {
    config.devServer = {
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

module.exports = {
    ...config,
    entry: {
        ...getWebpackEntryPoints(), // For blocks.

        index: './src/index.tsx', // For admin scripts.
    },
    plugins: [
        ...config.plugins,
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(dataviewsStyleDir, 'style.css'),
                    to: 'dataviews.css',
                },
                {
                    from: path.join(dataviewsStyleDir, 'style-rtl.css'),
                    to: 'dataviews-rtl.css',
                },
            ],
        }),
    ],
};
