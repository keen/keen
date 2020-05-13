# `@keen.io/widgets`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/widgets/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/ui-core/package.json)

The `@keen.io/widgets` package is a higher visualization layer that connects `@keen.io/charts` with other components
that could be used to interact with charts plots.

## Installing

For Front-End applications use standard `npm` or [yarn](https://yarnpkg.com/lang/en/) package manager.

```sh
yarn add @keen.io/widgets
```

## Examples

```js
import { FunnelChartWidget } from '@keen.io/widgets';

const chartData = [
  { name: 'Emails', value: 17000 },
  { name: 'Visits', value: 13050 },
  { name: 'Logins', value: 5900 },
  { name: 'Purchases', value: 4021 },
  { name: 'Payments', value: 3011 },
];

<FunnelChartWidget data={chartData} labelSelector="name" />
```

For more examples check the Keen [Storybook](https://keen.github.io/keen/).
