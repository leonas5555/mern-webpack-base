const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
    path: path.resolve('./client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [new ExtractTextPlugin({
    filename: 'styles.css',
    disable: false,
    allChunks: true,
  }), HtmlWebpackPluginConfig],
};

