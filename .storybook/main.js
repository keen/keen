const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const path = require('path');

module.exports = {
  stories: [
    '../packages/**/*.stories.tsx',
    '../packages/**/*.stories.mdx',
    '../docs/**/*.stories.mdx'
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    'storybook-addon-performance',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    /** Omit HarmonyExportImportedSpecifierDependency errors */
    config.stats = {
      all: false,
    };

    config.devServer = {
      stats: 'errors-only',
    };

    if (process.env.NODE_ENV === 'development') {
      /** Show type check notifications */
      config.plugins.push(new ForkTsCheckerNotifierWebpackPlugin());
    }
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      })
    ];

    return config;
  },
  babel: async (options) => ({
    ...options,
    plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  }),
};
