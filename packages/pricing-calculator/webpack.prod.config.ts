/* eslint-disable @typescript-eslint/camelcase */
import path from 'path';
import merge from 'webpack-merge';

import TerserPlugin from 'terser-webpack-plugin';

import commonConfig from './webpack.common';

export default merge(commonConfig, {
  mode: 'production',
  entry: {
    main: `./src/index.tsx`,
  },
  output: {
    filename: 'pricing-calculator.min.js',
    path: path.join(__dirname, 'dist'),
    library: 'KeenPricingCalculator',
    libraryExport: 'KeenPricingCalculator',
    libraryTarget: 'umd',
  },
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
});
