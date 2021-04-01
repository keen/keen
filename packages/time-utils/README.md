# `@keen.io/time-utils`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/charts-utils/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/utils/package.json)

Set of utilities and helper functions responsible for dates and time conversion.

## API

### getOffsetFromDate

 Extracts UTC offset from provided date.

```typescript
getOffsetFromDate('2021-03-14T16:00:00+03:00');  // 180
```

### formatDate

Formats date based on provided pattern and timezone.

```typescript
formatDate('2021-03-30T12:00:00+02:00', 'Europe/Warsaw', 'YYYY-MM-DD HH:mm'); // 2021-03-30 12:00
```

### convertDate

Converts date based on provided offset in minutes or named timezone. Respects daylight saving time offsets.

```typescript
convertDate('2021-03-14T16:00:00', 180);  // 2021-03-14T19:00:00
convertDate('2021-03-14T16:00:00', -60);  // 2021-03-14T15:00:00
convertDate('2021-03-14T16:00:00', 'Europe/Warsaw');  // 2021-03-14T17:00:00
```

### setTimezoneOffset

Replaces timezone offset without modifying date.

```typescript
setTimezoneOffset('2021-03-14T16:00:00-12:00', 'Europe/Warsaw');  // 2021-03-14T16:00:00+02:00
```

### getDefaultAbsoluteTime

Creates default date range aligned with Keen API absolute `Timeframe` interface.

```typescript
// new Date() => 2021-03-31T00:00:00

getDefaultAbsoluteTime('Europe/Warsaw');  
/* Object {
  "start": "2021-03-30T00:00:00+02:00",
  "end": "2021-03-31T00:00:00+02:00",
} */
```
