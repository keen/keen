const package = require('./package');

module.exports = {
  ...require('../../jest.config.base'),
  displayName: package.name,
  name: package.name,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
};
