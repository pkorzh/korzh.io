var webpack = require('webpack')

var config = Object.create(require('./webpack.base.config.js'))

config.plugins = config.plugins.concat([
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	}),

	// keeps hashes consistent between compilations
	new webpack.optimize.OccurenceOrderPlugin(),

	// minifies your code
	new webpack.optimize.UglifyJsPlugin({
		compressor: {
			warnings: false
		}
	}),

    new webpack.DefinePlugin({
        __DEBUG__: false,
    })
])

config.module.loaders = config.module.loaders.concat([{
    test: /\.(jpe?g|png|gif)$/i,
    loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    ]
}])

module.exports = config