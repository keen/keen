module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest"
  },

  verbose: true,

  collectCoverage :true,

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },

 testRunner: "jest-circus/runner",

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

};
