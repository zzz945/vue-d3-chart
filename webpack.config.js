const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.js')

let webpackConfig = merge(baseWebpackConfig, {
  entry: './src',
  output: {
    library: 'LibraryExample',
    libraryTarget: 'umd',
    filename: 'vue-d3-chart.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      test: /\.js($|\?)/i
    })
  ]
})

module.exports = webpackConfig
