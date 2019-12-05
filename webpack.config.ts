const merge = require('webpack-merge');
const path = require('path');

const common = require('../../webpack.common');

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
