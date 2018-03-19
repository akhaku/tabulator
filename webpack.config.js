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
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {'loader': 'file-loader', 'options': {'name': '[name].css'}},
        {'loader': 'extract-loader', 'options': {'publicPath': ''}},
        {'loader': 'css-loader'},
        {'loader': 'less-loader'}
      ]
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
