---
title: Data Visualization
sort_weight: 2
tags:
 - data-visualization

include_bootstrap_js: true

---

### Description

Use the `Data Visualization` SDK to build, customize, and seamlessly embed customer-facing analytics in your sites and applications.

### Installing

For Front-End applications use standard `npm` or [yarn](https://yarnpkg.com/lang/en/) package manager.

```sh
yarn install @keen.io/dataviz
```

For direct website integration embed a script with `@keen.io/dataviz` that is hosted on CDN.

```sh
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@keen.io/dataviz@latest/dist/dataviz.min.js"></script>
```

- Replace the `latest` tag in the URL to freeze package version.
- For latest versions and changes check the [release log](https://github.com/keen/keen/blob/develop/packages/dataviz/CHANGELOG.md).

### Example

- Setup [keen-analysis](https://github.com/keen/keen-analysis.js) client to perform request to `Keen API`.

```js
const client = new KeenAnalysis({
  projectId: $PROJECT_ID,
  readKey: $READ_KEY,
});
```

- Create and define a visualization widget.

```js
const dataviz = new KeenDataviz({
  type: 'line',
  container: '#container',
  widget: {
    title: {
      content: 'Book purchases',
    },
    subtitle: {
      content: 'Monthly results',
    },
  },
  settings: {
    curve: 'spline',
  },
});
```

- Define query, execute it and render widget.

```js
client.query({
  analysis_type: 'count',
  event_collection: 'book_purchase',
  timeframe: 'last_14_days',
  group_by: ['author'],
  interval: 'monthly',
}).then((res) => dataviz.render(res));
```
