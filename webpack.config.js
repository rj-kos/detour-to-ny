var webpack = require('webpack');

var rootDir = __dirname;

module.exports = {
	context: __dirname,
	entry: "./entry.js",
	output: {
		path: __dirname + "/public/dist",
		filename: "bundle.js"
	}
}