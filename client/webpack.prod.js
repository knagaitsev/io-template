const merge = require('webpack-merge');
const common = require("./webpack.common.js");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: '[name].[chunkhash].js'
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({}),
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].[chunkhash].css"
        })
    ]
});