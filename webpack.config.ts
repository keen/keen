const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const path = require('path');

module.exports = ({ config }: { config: any }) => {
  config.context = path.resolve(__dirname, '..');

  config.devServer = {
    stats: 'errors-only',
  };

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          /** Do not perform type checking during build - only transpile files */
          transpileOnly: process.env.NODE_ENV === 'development',
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  config.module.rules.push({
    test: /\.mdx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  });

  if (process.env.NODE_ENV === 'development') {
    /** Start type checking in separate process */
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        eslint: false,
        async: true,
        checkSyntacticErrors: true,
        tsconfig: path.resolve(__dirname, '../tsconfig.checker.json'),
      })
    );

    /** Show type check notifications */
    config.plugins.push(new ForkTsCheckerNotifierWebpackPlugin());
  }

  config.resolve.extensions.push('.ts', '.tsx', '.mdx');

  config.addons.push('storybook-addon-performance/register');

  return config;
};
