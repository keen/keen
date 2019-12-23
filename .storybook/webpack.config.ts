module.exports = ({ config }: { config: any }) => {
  config.module.rules.push({ test: /\.tsx?$/, use: ['ts-loader'] });

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

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
