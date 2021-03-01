# `@keen.io/ui-core`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/ui-core/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/ui-core/package.json)

Set of reusable visual `React` components used in `keen.io` Front-End projects.

## Build

The `@keen.io/ui-core` use two step build to address issues with CSS specificity.

##### Typescript

First stage is responsible for transpilation Typescript code to `esnext` and emiting type declarations.

##### Babel

Second stage is responsible for code transpilation based on supported `.browserslistrc` file and increasing `styled-components` css specificity by using plugins from `.babelrc` file.

### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command | Description                      |
| ------- | -------------------------------- |
| `test`  | run unit tests.                  |
| `build` | builds application distribution. |
