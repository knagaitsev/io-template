const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require("./webpack.common.js");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require("./../config.json");

module.exports = merge(common, {
    mode: 'development',

    output: {
        filename: '[name].js'
    },

    devServer: {
        contentBase: './public',
        watchContentBase: true,
        port: config.webpackDevPort
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "html/index.html",
            livereloadScript: `<script type="text/javascript" src="http://livejs.com/live.js"></script>`
        }),
        new WriteFilePlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});