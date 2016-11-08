var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: [
    './src/app'
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, 'src')
    },
    {
    test: /\.css$/,
    loader: "style-loader!css-loader"
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  }
    ]
  }
};