const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  output: {
    path: path.resolve(__dirname, 'static/bundles'),
    filename: '[name].js',
    clean: true
  },
  mode: process.env.NODE_ENV || 'production',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map'
};
