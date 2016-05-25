var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
	output: {
		libraryTarget: 'umd',
		library: 'MapiWkt'
	},
	externals: {
        "jquery": {
        	root: "jQuery",
        	commonjs: "jquery",
        	commonjs2: "jquery",
        	amd: "jquery"
        },
        "underscore": {
        	root: "_",
        	commonjs: "underscore",
        	commonjs2: "underscore",
        	amd: "underscore"
        }
    },
	module: {		
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					plugins: ['transform-object-rest-spread'],
					cacheDirectory: true
				}
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin([
				pkg.name[0].toUpperCase() + pkg.name.slice(1) + ' - ' + pkg.description,
				'Version: ' + pkg.version,
				'Author: ' + pkg.author
			].join('\n'), {entryOnly: true})
	],
	eslint: {
		parser: "babel-eslint"
		
	}
};