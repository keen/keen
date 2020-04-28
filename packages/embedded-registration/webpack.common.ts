/* @FIXME: https://github.com/jantimon/html-webpack-plugin/issues/1383 */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.umd.json',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, 'index.html'),
    }) as any,
  ],
};
