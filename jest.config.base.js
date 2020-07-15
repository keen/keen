module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest"
  },

  verbose: true,

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },

 testEnvironment: 'jest-environment-jsdom-sixteen',

  moduleNameMapper: {
   '^@keen.io/(.*)$': '<rootDir>/../$1/src',
  },

  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],

  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },

  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
};
