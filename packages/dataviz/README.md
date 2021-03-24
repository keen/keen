# `@keen.io/dataviz`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/dataviz/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/dataviz/package.json)

The `@keen.io/dataviz` is abstraction layer that connects `Keen API` with visualization components.
It allows to seamlessly embed and deliver metrics within your user interface with minimal effort.

## Installing

For Front-End applications use standard `npm` or [yarn](https://yarnpkg.com/lang/en/) package manager.

```sh
yarn add @keen.io/dataviz
```

For direct website integration embed a script with `@keen.io/dataviz` that is hosted on CDN.

```js
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@keen.io/dataviz@latest/dist/dataviz.min.js"></script>
```

## API

### render

Renders metrics based on specified settings and analysis results.

```typescript
const result = await client.query({
 analysisType: 'count',
 eventCollection: 'pageviews',
 timeframe: 'this_14_days'
});

const chart = new DataViz({ type: 'bar', container: '#container' })
 .render(result);
```

## Timezones

The **presentationTimezone** argument could be used to adjust visualizations to specified timezone or convert UTC ISO string dates based on defined offset in minutes.

```typescript
const result = await client.query({
 analysisType: 'count',
 eventCollection: 'pageviews',
 interval: 'daily',
 timeframe: 'this_7_days'
});

const chart = new DataViz({
  type: 'area',
  container: '#container',
  presentationTimezone: 'America/New_York' // -600
}).render(result);
```

For more code examples check the Keen [Storybook](https://keen.github.io/keen/).

## Supported Browsers

This project targeting all modern browsers.
