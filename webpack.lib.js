
var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: { bundle:'./src/main.js', lib:'./src/lib.js' },
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].js",
		library: ["imageviewr", "[name]"],
		libraryTarget: "umd"
	},
	externals: [
      'react',
      'react-dom',
      'dicom-parser'
    ],
  module: {
    loaders: [
    	{ test: /\.(jpg|png)$/, loader: 'url?limit=25000' },
    	{ test: /\.scss$/, loader: "style!css!sass" },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
};
