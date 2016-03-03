const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')

// server address
const SERVER_HOST = 'localhost';
const SERVER_PORT = '5000';

module.exports = {
  cache: true,

  entry: [
      './src/vendor',
      './src/main',
  ],

  output: {
    filename: 'app.js',
    path: path.resolve('./build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src'),
    alias: { }
  },

  module: {
    loaders: [
        { test: /\.ts$/, exclude: [/\.spec\.ts$/, 'node_modules'], loader: 'ts' },
    ],

    noParse: [ /angular2\/bundles\/.+/ ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Angular2 Webpack Polyfill Demo',
      chunksSortMode: 'none',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJsPlugin({
      beautify: false,
      mangle: false,
      compress : { screw_ie8 : true },
      comments: false
    }),
  ],

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: SERVER_HOST,
    port: SERVER_PORT,
    inline: true,
    publicPath: '/'
  }
};
