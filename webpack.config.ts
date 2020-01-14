import merge from 'webpack-merge';
import path from 'path';
import common from './webpack.common';

const config = merge(common, {
  mode: 'production',
  entry: {
    main: `./src/index.ts`,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
});

module.exports = config;
