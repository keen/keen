# `@keen.io/time-utils`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/charts-utils/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/utils/package.json)

Set of utilities and helper functions responsible for dates and time conversion.

## API

### getOffsetFromDate

 Extracts UTC offset from provided date.

```typescript
getOffsetFromDate('2021-03-14T16:00:00+03:00');  // 180
```

### convertDate

Converts date based on provided offset in minutes or named timezone.

```typescript
convertDate('2021-03-14T16:00:00', 180);  // 2021-03-14T19:00:00
convertDate('2021-03-14T16:00:00', -60);  // 2021-03-14T15:00:00
convertDate('2021-03-14T16:00:00', 'Europe/Warsaw');  // 2021-03-14T17:00:00
```
