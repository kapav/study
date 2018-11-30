'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('NODE_ENV', NODE_ENV);
module.exports = {
  mode: NODE_ENV,
  entry: {
	  webVideoSimple: './src/js/app/main.js',
	  webVideoApp: './src/js/app/modules/webVideoApp.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
	publicPath: path.resolve(__dirname, 'dist', 'js') + '/',
    filename: '[name].bundle.js',
	library: '[name]'
  },
  watchOptions: {
    ignored: ['node_modules', 'bower_components', 'dist', 'src/*.html']
  },
  devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,
  module: {
	  rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				'css-loader'
			]
		}
	  ]
  },
  plugins: [
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV)
	}),
	new MiniCssExtractPlugin({
		filename: '../css/[name].css'
	})
  ]
}
