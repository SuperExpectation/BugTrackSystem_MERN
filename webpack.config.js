var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/app'
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/static/' 
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
    test: /\.js$/,
    loaders: ['react-hot','babel'],
    include: __dirname,
    exclude: /node_modules/,
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
    test: /\.(ttf|eot|svg|png|jpg|gif|jpeg|bmp)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },
  
    ]
  }
};