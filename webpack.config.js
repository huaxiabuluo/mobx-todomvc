const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');

const isDevEnv = !process.env.BUILD_DEST;

module.exports = {
  entry: {
    index: ['./src/boot-loader.tsx'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './build')
  },
  mode: isDevEnv ? 'development' : 'production',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    // mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
      },
      {
        test: /\.less\.module$/,
        exclude: /node_modules/,
        use: [
          isDevEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevEnv ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevEnv ? '[id].css' : '[id].[hash].css',
    }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html'
    }),
    new WebpackBar(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './html'),
    publicPath: '/static/',
    stats: { colors: true },
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    port: 8089,
  },
};
