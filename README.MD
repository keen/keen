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

## Examples

Example dashboards build with `keen.io` visualization libraries.

#### Smart Home Monitoring

<img width="100%" alt="widgets" src="https://user-images.githubusercontent.com/7753369/90902582-f87d0d80-e3cc-11ea-8ebf-9fbd33e535d4.png">

[Smart Home Dashboard](https://static.keen.io/dashboard/iot/index.html)

#### Marketing performance dashboard

<img width="1401" alt="widgets2" src="https://user-images.githubusercontent.com/7753369/90903382-26af1d00-e3ce-11ea-8096-778938061a8e.png">

[Marketing Dashboard](https://static.keen.io/dashboard/marketing/index.html)

## Packages

##### @keen.io/charts

Set of reusable plots components built with `React` and `D3`.

##### @keen.io/colors

Color palette used by Keen.

##### @keen.io/dataviz

The DataViz is abstraction layer that connects **Keen Analytics API** with visualization components. It allows to seamlessly embed and deliver metrics within your user interface with minimal effort.

##### @keen.io/embedded-registration

Embeddable registration component used by `keen.io` for HubSpot integration.

##### @keen.io/forms

Set of form helpers used in `keen.io` projects.

##### @keen.io/icons

Set of icons used in `keen.io` projects.

##### @keen.io/parser

Set of parsers that are used internally to transform Keen API responses into `@keen.io/charts` friendly format.

##### @keen.io/pricing-calculator

Codebase for `keen.io` pricing calculator.

##### @keen.io/pubsub

Implementation of `PubSub` messaging service.

##### @keen.io/react-hooks

Custom hooks used in `keen.io` projects.

##### @keen.io/storybook-utils

Helper functions used internally in Keen [Storybook](https://keen.github.io/keen/).

##### @keen.io/toast-notifications

`keen.io` wrapper for `react-toast-notifications` package.

##### @keen.io/tracking-lite

Light and simple version on Keen Tracking library - used for integration with `Google Tag Manager`.

##### @keen.io/ui-core

Set of reusable visual `React` components used in `keen.io` Front-End projects.

##### @keen.io/widgets

Higher visualization layer that connects `@keen.io/charts` with other `React` components that could be used to interact with charts plots.

### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `storybook`       | run storybook for development on port `3000`         |
| `build-storybook` | build storybook production distribution.             |
| `lint`            | run linter against current application codebase.     |
| `test`            | run unit tests.                                      |
| `test:cov`        | run unit tests with coverage reporter.               |
| `prettier`        | run code formatter process against current codebase. |

### commit

This project uses [Conventional Commits](https://www.conventionalcommits.org) to enforce common commit standards.

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx git-cz` | run commit command line interface. |

### build packages

| Command               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `npx lerna run build` | run build script from `package.json` for each package |

### add dependency to package

| Command                                              | Description                                            |
| ---------------------------------------------------- | ------------------------------------------------------ |
| `npx lerna add <name>[@ver] packages/<name> [--dev]` | Add dependency to specific package in mono-repository. |

### updating dependencies

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `update-packages` | run update wizard command line interface. |

### deployments

The all commits pushed into master branch will be picked by CircleCI workflow that perform npm packages version and publish.

### license

MIT

Copyright (c) 2019-2020 Keen.io.
