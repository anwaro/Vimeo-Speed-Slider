const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const header = require('./src/header');
const greasyForkMinify = require('./src/minify');

const isDev = process.argv.some((v) => v.includes('development'));

module.exports = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
        main: './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: isDev ? 'dev.js' : 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    optimization: {
        chunkIds: 'named',
        moduleIds: 'named',
        concatenateModules: true,
        minimize: !isDev,
        minimizer: [
            new TerserPlugin({
                minify: greasyForkMinify,
            }),
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: isDev ? '' : header,
            raw: true,
        }),
    ],
};
