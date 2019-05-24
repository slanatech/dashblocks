// vue.config.js
const webpack = require('webpack');
module.exports = {
  publicPath: '/dashblocks/',
  devServer: {
    proxy: 'http://localhost:3400'
  },
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
};
