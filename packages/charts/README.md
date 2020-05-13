# `@keen.io/charts`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/charts/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/charts/package.json)

The `@keen.io/charts` is set of reusable plots components built with [React](https://reactjs.org/) and [D3](https://d3js.org/).
Charts are part of a `@keen.io/widgets` and `@keen.io/dataviz` packages that could be used to seamlessly embed and deliver metrics within your user interface.

Charts plots theme could be fully customized by providing `theme` object. Each of chart plot supports a lot of configuration options to adjust it to Your own needs.

## Installing

For Front-End applications use standard `npm` or [yarn](https://yarnpkg.com/lang/en/) package manager.

```sh
yarn add @keen.io/charts
```

## Examples

```js
import { BarChart } from '@keen.io/charts';

const chartData = [
  { name: 'Windows', users: 3, licenses: 52, shops: 12 },
  { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
  { name: 'Linux', users: 20, licenses: 15, shops: 23 },
  { name: 'Android', users: 3, licenses: 15, shops: 30 },
];

<BarChart data={chartData} labelSelector="name" keys={['users', 'licenses', 'shops']} />
```

For more examples check the Keen [Storybook](https://keen.github.io/keen/).
