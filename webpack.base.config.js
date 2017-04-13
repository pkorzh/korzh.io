var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var RobotsPlugin = require('@tanepiper/robots-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,

    entry: './webpack/entry.js',

    output: {
        path: path.resolve('./public/'),
        filename: '[hash].js'
    },

    plugins: [
        new ExtractTextPlugin('[contenthash].css'),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html')
        }),
        new FaviconsWebpackPlugin('./src/logo.png'),
        new RobotsPlugin({
            userAgents: [
                {
                    name: '*',
                    allow: ['*'],
                }
            ]
        }),
        new CopyWebpackPlugin([
            {
                from: './src/static/',
                to: 'static'
            }
        ])
    ],

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'css!' +
                    'sass'
                )
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&minetype=application/font-woff" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader" 
            },
            {
                test: /\.html$/,
                loader: 'html?interpolate'
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules') 
    }
}