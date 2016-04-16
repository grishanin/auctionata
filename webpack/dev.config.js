var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

var DIR_JS = path.resolve(__dirname, '../client');
var DIR_BUILD = path.resolve(__dirname, '../build');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
    path.resolve(DIR_JS, 'index.js')
  ],
  output: {
    path: DIR_BUILD,
    filename: 'bundle.js',
    publicPath: 'http://' + host + ':' + port + '/build/'
  },
  module: {
    loaders: [
      {
        loader: 'react-hot',
        test: DIR_JS,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin()
  ],
  progress: true
};
