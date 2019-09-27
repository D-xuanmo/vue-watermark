const path = require('path')

module.exports = {
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, './doc/main.js')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@doc': path.resolve(__dirname, './doc')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // data: '@import "@/style/variable.scss";'
      }
    }
  },
  productionSourceMap: false
  // chainWebpack: config => {
  //   config.module
  //     .rule('js')
  //     .include
  //     .add('/src')
  //     .end()
  //     .use('babel')
  //     .loader('babel-loader')
  //     .tap(options => {
  //       // 修改它的选项...
  //       return options
  //     })
  // }
}
