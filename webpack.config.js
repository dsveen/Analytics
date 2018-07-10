const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: { path: `${__dirname}/build`, filename: 'bundle.js' },
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      },
      { test: /\.html$/,
        loader: 'html-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new CleanWebpackPlugin(['build'])
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
