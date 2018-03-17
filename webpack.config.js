const path = require('path');

module.exports = {
  entry: {
    background: './src/background/index.js',
    newtab: './src/newtab/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'static/bundles')
  },
  mode: process.env.NODE_ENV
};
