const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
    const { NODE_ENV } = env;
    return merge([
        {
            entry: ['@babel/polyfill', APP_DIR],
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    {
                        test: /\.css$/,
                        loaders: [NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                    },
                    {
                        test: /\.scss$/,
                        loaders: [NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
                    },
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({ 
                    title: 'Weather App',
                    template: './src/index.html', 
                    filename: './index.html',
                }),
                new webpack.DefinePlugin({ 
                    'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
                }),
                new CopyWebpackPlugin([ 
                    { from: 'assets', to: 'assets' },
                ]),
                new CompressionPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                    threshold: 10240,
                    minRatio: 0.8
                }),
            ]
        }
    ])
}