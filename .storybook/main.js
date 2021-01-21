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
    '@storybook/addon-notes',
    '@storybook/addon-actions',
    'storybook-addon-performance',
    '@storybook/addon-docs',
  ],
  typescript: {
    /** Start type checking in separate process */
    check: process.env.NODE_ENV === 'development',
    checkOptions: {
      eslint: false,
      async: true,
      checkSyntacticErrors: true,
      tsconfig: path.resolve(__dirname, '../tsconfig.checker.json'),
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
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
  }
};
