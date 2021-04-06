import setTimezoneOffset from './set-timezone-offset';

test('converts date with "Europe/Warsaw (+02:00)" timezone offset', () => {
  const isoDate = '2021-03-31T00:00:00+12:00';

  expect(setTimezoneOffset(isoDate, 'Europe/Warsaw')).toMatchInlineSnapshot(
    `"2021-03-31T00:00:00+02:00"`
  );
});

test('converts date with "America/New_York (-04:00)" timezone offset', () => {
  const isoDate = '2019-12-01T10:00:00+02:00';

  expect(setTimezoneOffset(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2019-12-01T10:00:00-04:00"`
  );
});

test('converts date with "UTC" timezone offset', () => {
  const isoDate = '2021-03-31T00:00:00-06:00';

  expect(setTimezoneOffset(isoDate, 'UTC')).toMatchInlineSnapshot(
    `"2021-03-31T00:00:00Z"`
  );
});

test('converts date with "America/New_York (-04:00)" timezone offset', () => {
  const isoDate = '2021-03-31T00:00:00-12:00';

  expect(setTimezoneOffset(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2021-03-31T00:00:00-04:00"`
  );
});

test('converts date with "America/New_York (-04:00)" timezone offset', () => {
  const isoDate = '2021-03-31T00:00:00+12:00';

  expect(setTimezoneOffset(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2021-03-31T00:00:00-04:00"`
  );
});

test('converts UTC date with "America/New_York (-04:00)" timezone offset', () => {
  const isoDate = '2021-03-31T00:00:00Z';

  expect(setTimezoneOffset(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2021-03-31T00:00:00-04:00"`
  );
});
