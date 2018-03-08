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
    contentBase: path.join(__dirname, './example'),
    compress: true,
    openPage: 'demo.html',
    open: true,
    port: 9000
  }
})

module.exports = webpackConfig
