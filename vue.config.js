// vue.config.js
const path = require('path');
const webpack = require('webpack');

// We will not include plotly.js-dist into lib bundle, to keep lib size reasonable.
// plotly.js-dist is ~6M
// App that uses dashblocks should have plotly.js-dist in it's dependencies
// Also not including dygraphs as it must be loaded on demand
// TODO Enable for Demo app build
function getProdExternals() {
  return {
    'plotly.js-dist': {
      commonjs: 'plotly.js-dist',
      commonjs2: 'plotly.js-dist'
    }
    /*
    dygraphs: {
      commonjs: 'dygraphs',
      commonjs2: 'dygraphs'
    }
    */
  };
}

module.exports = {
  publicPath: '/demo/',

  devServer: {
    proxy: 'http://localhost:3400'
  },

  configureWebpack: {
    //externals: process.env.NODE_ENV === 'production' ? getProdExternals() : {},
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
      alias: {
        dashblocks: path.resolve(__dirname, 'src/index.esm.js')
      }
    },
    module: {
      rules: [
        {
          sideEffects: true
        }
      ]
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      treeShake: true
    }
  }

  //transpileDependencies: ['quasar']
};
