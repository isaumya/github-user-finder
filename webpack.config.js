module.exports = {
	mode: 'production',
	devtool: "source-map",
	entry: ["babel-polyfill", './assets/js/source/app.js'],
	output: {
		path: __dirname + '/assets/js/build',
		filename: 'app.bundle.min.js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	}
};