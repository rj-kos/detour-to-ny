var webpack = require('webpack');

var rootDir = __dirname;

module.exports = {
	context: __dirname,
	entry: "./entry.js",
	output: {
		path: __dirname + "/public/dist",
		filename: "bundle.js"
	},
	module: {
    // `loaders` is an array of loaders to use.
    // here we are only configuring vue-loader
    loaders: [
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      }
    ]
  }
}