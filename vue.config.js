// vue.config.js
const webpack = require('webpack');

// We will not include plotly.js-dist into lib bundle, to keep lib size reasonable.
// plotly.js-dist is ~6M
// App that uses dashblocks should have plotly.js-dist in it's dependencies
function getProdExternals() {
  return {
    'plotly.js-dist': {
      commonjs: 'plotly.js-dist',
      commonjs2: 'plotly.js-dist'
    }
  };
}

module.exports = {
  publicPath: '/dashblocks/',
  devServer: {
    proxy: 'http://localhost:3400'
  },
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production' ? getProdExternals() : {},
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
};
