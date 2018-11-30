'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('NODE_ENV', NODE_ENV);
module.exports = {
  mode: NODE_ENV,
  entry: {
	  webVideoSimple: './src/js/app/main.js',
	  webVideoApp: './src/js/app/modules/webVideoApp.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
	library: 'myLibrary'
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
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		},
		{
			test: /\.html$/,
			use: 'raw-loader'
		}
	  ]
  },
  plugins: [
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV)
	}),
	new MiniCssExtractPlugin({
		filename: 'css/[name].css'
	}),
	new CleanWebpackPlugin(['dist']),
	new HtmlWebpackPlugin({
		template: './src/index.html'
	})
  ]
}
