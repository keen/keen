# `@keen.io/tracking-lite`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/tracking-lite/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/tracking-lite/package.json)

Light version on Keen Tracking library - used for integration with `Google Tag Manager`.

## Installing

For direct website integration embed a script with `@keen.io/tracking-lite` that is hosted on CDN.

```js
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@keen.io/tracking-lite@latest/dist/tracking-lite.min.js"></script>
```

## Examples

Access `KeenTrackingLite` from browser `window` object.

```js
KeenTrackingLite.sendEvent(projectId, authorizationKey, eventCollection, eventPayload);
```

#### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command               | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `start`               | run application on `localhost:3000`.                                              |
| `build`               | build the application UMD distribution.                                           |
