/* @FIXME: https://github.com/jantimon/html-webpack-plugin/issues/1383 */

import path from 'path';
import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import commonConfig from './webpack.common';

const config = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'KeenPricingCalculator',
    libraryExport: 'KeenPricingCalculator',
    libraryTarget: 'umd',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }) as any,
  ],
});

export default config;
