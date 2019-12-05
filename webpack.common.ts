module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ['ts-loader'] },
    ],
  },

};
