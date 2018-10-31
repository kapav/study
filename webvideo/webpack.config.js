'use strict';
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: [
      './src/js/app/main.js',
      './src/js/app/modules/webVideoApp.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'bundle.js'
  }	
}
