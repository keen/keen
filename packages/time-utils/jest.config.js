const package = require('./package');

module.exports = {
  ...require('../../jest.config.base'),
  displayName: package.name,
  name: package.name,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@keen.io/(.*)$': '<rootDir>/../$1/src',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
};
