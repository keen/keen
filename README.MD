# <a href="https://www.keen.io"><img src="https://user-images.githubusercontent.com/7753369/79746003-91115d00-8309-11ea-8b61-9d566a5b260d.png"></a>

# Keen

The Complete Event Data Management Solution

[![written in typescript](https://img.shields.io/badge/written%20in-typescript-blue.svg)](https://www.typescriptlang.org) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-yellow.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://facebook.github.io/jest/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![yarn](https://img.shields.io/badge/maintained%20with-yarn-cc00ff.svg)](https://yarnpkg.com/en/) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-green.svg)](https://lerna.js.org/)
[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg)](https://snyk.io/test/github/keen/keen)

This project contains mono-repository for Keen.io Front-End projects and applications.

## Documentation

All documentation, including charts, widgets and dataviz can be found at [Storybook](https://keen.github.io/keen)

## Contribution guide

This is an open source project and we love involvement from the community! Hit us up with pull requests and issues.

### Project structure

```
.
├── ...
├── packages            
│   ├── charts    
│   ├── widgets
│   ├── dataviz
│   ├── parser
│   ├── ui-core
│   ├── colors
│   ├── tracking-lite
│   └── storybook-utils
└── ...
```

### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command               | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `storybook`           | run storybook for development on port `3000`                                      |
| `build-storybook`     | build storybook production distribution.                                          |
| `lint`                | run linter against current application codebase.                                  |
| `test`                | run unit tests.                                                                   |
| `test:cov`            | run unit tests with coverage reporter.                                            |
| `prettier`            | run code formatter process against current codebase.                              |

### commit

This project uses [Conventional Commits](https://www.conventionalcommits.org) to enforce common commit standards.

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx git-cz` | run commit command line interface. |

### build packages

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx lerna run build` | run build script from `package.json` for each package |

### add dependency to package

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx lerna add <name>[@ver] packages/<name> [--dev]` | Add dependency to specific package in mono-repository. |

### deployments

The all commits pushed into master branch will be picked by CircleCI workflow that perform npm packages version and publish.
