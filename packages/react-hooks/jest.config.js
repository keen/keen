const package = require('./package');

module.exports = {
  ...require('../../jest.config.base'),
  displayName: package.name,
  name: package.name,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@keen.io/(.*)$': '<rootDir>/../$1/src',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
};
