'use strict';
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/config.js',
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'bundle.js'
  }	
}
