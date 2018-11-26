'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

console.log('NODE_ENV', NODE_ENV);
module.exports = {
  mode: NODE_ENV,
  entry: {
    main: [
      './src/js/app/main.js',
      './src/js/app/modules/webVideoApp.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'bundle.js'
  },
  watchOptions: {
    ignored: ['node_modules', 'bower_components', 'dist', 'src/*.html']
  },
  devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,
  plugins: [
	new webpack.DefinePlugin({
		'NODE_ENV': JSON.stringify(NODE_ENV)
	})
  ]
}
