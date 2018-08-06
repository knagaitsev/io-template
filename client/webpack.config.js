const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[chunkhash].js'
    },

    devServer: {
        contentBase: './public',
        watchContentBase: true
    },

    module: {
        rules: [
            {
                test: [ /\.vert$/, /\.frag$/ ],
                use: 'raw-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            template: "html/index.html"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(["public"]),
        new CopyWebpackPlugin([
            { from: 'asset/**', to: '' }
        ])
    ]

};