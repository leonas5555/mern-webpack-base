const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  hash: true,
  template: './client/src/index.html',
});

/* const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'My App',
  filename: 'index.html',
});*/

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
/*      {
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        test: /\.css$/,
      },*/
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [extractSass, HtmlWebpackPluginConfig],
};

