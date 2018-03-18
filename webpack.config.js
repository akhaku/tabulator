const path = require('path');

module.exports = {
  entry: {
    background: './src/background/index.js',
    newtab: './src/newtab/index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  resolve: {
    alias: {src: `${__dirname}/src`}
  },
  output: {
    path: path.resolve(__dirname, 'static/bundles')
  },
  mode: process.env.NODE_ENV
};
