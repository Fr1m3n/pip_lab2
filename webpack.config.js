const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: "./src/front/index.js",
    output: {
        path: path.join(__dirname, "src", "main", 'webapp', 'WEB-INF', 'static'),
        filename: "index_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[contenthash]',
                        },
                    },
                ],
            },
            {
                test: /\.js|jsx$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}], 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy', 'react-html-attrs']
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)\/react-toolbox/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                })
            },
            {
                test: /\.css$/,
                include: /(node_modules)\/react-toolbox/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    "postcss-loader"
                ]
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new ExtractTextPlugin('[name].styles.css'),
    ],
};