const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'less-loader']
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    alias: {src: `${__dirname}/src`}
  },
  output: {
    path: path.resolve(__dirname, 'static/bundles')
  },
  mode: process.env.NODE_ENV
};
