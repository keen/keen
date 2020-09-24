/* eslint-disable @typescript-eslint/naming-convention */
import webpack from 'webpack';
import path from 'path';

import TerserPlugin from 'terser-webpack-plugin';

const babelOptions = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        corejs: '3.6.5',
        useBuiltIns: 'entry',
      },
    ],
  ],
};

export default {
  mode: 'production',
  entry: {
    dataviz: './src/index.ts',
    polyfills: './src/polyfills.ts',
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    library: 'KeenDataviz',
    libraryExport: 'KeenDataviz',
    libraryTarget: 'umd',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.umd.json',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      SC_ATTR: 'keen-dataviz',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};
