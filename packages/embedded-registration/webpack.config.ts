import path from 'path';
import merge from 'webpack-merge';

import commonConfig from './webpack.common';

const config = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devServer: {
    publicPath: '/assets/',
    compress: true,
    port: 3000,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'KeenEmbeddedRegistration',
    libraryExport: 'KeenEmbeddedRegistration',
    libraryTarget: 'umd',
  },
});

export default config;
