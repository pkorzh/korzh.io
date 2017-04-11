var path = require('path')
var webpack = require('webpack')

var config = Object.create(require('./webpack.base.config.js'));

config.devtool = 'source-map';

config.output.publicPath = 'http://localhost:3010/'

config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        __DEBUG__: true,
    })
])

config.module.loaders = config.module.loaders.concat([{
	test: /.*\.(gif|png|jpe?g)$/i,
	loader: 'url-loader?limit=8192'
}])

module.exports = config