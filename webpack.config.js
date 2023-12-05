const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const header = require("./src/header");

const isDev = process.argv.some(v => v.includes("development"));

module.exports = {
    mode: isDev ? "development" : "production",
    devtool: isDev ? "inline-source-map" : false,
    entry: {
        main: "./src/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    optimization: {
        minimize: !isDev,
        minimizer: [new TerserPlugin({
            terserOptions: {
                sourceMap: false,
                output: {
                    comments: function(node, comment) {
                        return /^ @\w+/.test(comment.value) || /^ ==/.test(comment.value);
                    }
                },
            },
            extractComments: false,
            include: /\.js$/
        })]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: isDev ? "" : header,
            raw: true
        })
    ]
};
