module.exports = ({ config }: { config: any }) => {
  config.module.rules.push({ test: /\.tsx?$/, use: ['ts-loader'] });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
