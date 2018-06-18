const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		app: ['babel-polyfill', './assets/js/source/github-finder-classes.js', './assets/js/source/ui-classes.js', './assets/js/source/app.js']
	},
	output: {
		path: path.resolve(__dirname , './assets/js/build/'),
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env', 'minify']
			}
		}]
	}
}