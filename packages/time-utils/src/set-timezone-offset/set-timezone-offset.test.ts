import setTimezoneOffset from './set-timezone-offset';

test('formats date with "Etc/GMT-14" timezone offset', () => {
  const isoDate = '2021-03-31T00:00:00+12:00';

  expect(setTimezoneOffset(isoDate, 'Etc/GMT-14')).toMatchInlineSnapshot(
    `"2021-03-31T02:00:00+14:00"`
  );
});

test('formats "UTC" date with "America/New_York" timezone offset', () => {
  const isoDate = '2021-03-11T00:00:00Z';

  expect(setTimezoneOffset(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2021-03-10T19:00:00-04:00"`
  );
});
