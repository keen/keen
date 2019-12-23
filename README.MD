# Keen

[![written in typescript](https://img.shields.io/badge/written%20in-typescript-blue.svg)](https://www.typescriptlang.org) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-yellow.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://facebook.github.io/jest/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![yarn](https://img.shields.io/badge/maintained%20with-yarn-cc00ff.svg)](https://yarnpkg.com/en/) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-green.svg)](https://lerna.js.org/)

This project contains mono-repository for Keen Front-End projects and applications.

## Project structure

```
.
├── ...
├── packages            
│   ├── charts    
│   ├── widgets
│   ├── ui-core
│   ├── colors
│   ├── storybook-utils
└── ...
```

## npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command               | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `storybook`           | run storybook for development on port `3000`                                      |
| `build-storybook`     | build storybook production distribution.                                          |
| `lint`                | run linter against current application codebase.                                  |
| `test`                | run unit tests.                                                                   |
| `test:cov`            | run unit tests with coverage reporter.                                            |
| `prettier`            | run code formatter process against current codebase.                              |

## commit

This project uses [Conventional Commits](https://www.conventionalcommits.org) to enforce common commit standards.

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx git-cz` | run commit command line interface. |
