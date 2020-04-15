/* eslint-disable @typescript-eslint/camelcase */
import path from 'path';
import merge from 'webpack-merge';

import TerserPlugin from 'terser-webpack-plugin';

import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',
  entry: {
    main: `./src/index.ts`,
  },
  output: {
    filename: 'tracking-lite.min.js',
    path: path.join(__dirname, 'dist'),
    library: 'KeenTrackingLite',
    libraryExport: 'KeenTrackingLite',
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
