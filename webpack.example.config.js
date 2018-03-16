const baseWebpackConfig = require('./webpack.base.js')
const path = require('path')
const merge = require('webpack-merge')

let webpackConfig = merge(baseWebpackConfig, {
  entry: './example/index.js',
  output: {
    filename: 'dist/example.js',
    publicPath: '/'
  },
  devServer: {
    compress: true,
    openPage: 'index.html',
    open: true,
    port: 9000
  }
})

module.exports = webpackConfig
