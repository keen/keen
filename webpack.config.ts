const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = ({ config }: { config: any }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      require.resolve('ts-loader'),
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
            }
          ],
        });

  config.resolve.extensions.push('.ts', '.tsx', '.mdx');
  return config;
};
