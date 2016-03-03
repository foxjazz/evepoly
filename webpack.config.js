const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// server address
const SERVER_HOST = 'localhost';
const SERVER_PORT = '5000';

module.exports = {
  cache: true,

  entry: [
      './src/vendor',
      './src/main',
  ],

  devtool: 'cheap-eval-source-map',

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
      title: '',
      chunksSortMode: 'none',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
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
