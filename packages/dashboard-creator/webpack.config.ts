import path from 'path';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackCommon from '../../webpack.common';

const config = merge(webpackCommon, {
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'DashboardCreator',
    libraryExport: 'DashboardCreator',
    libraryTarget: 'umd',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
});

export default config;
