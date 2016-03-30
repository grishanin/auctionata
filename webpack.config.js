var path = require('path');
var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'client');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(dir_js, 'index.js')
  ],
  output: {
    path: dir_build,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
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
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  }
};
