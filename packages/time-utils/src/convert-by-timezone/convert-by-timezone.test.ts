import convertByTimezone from './convert-by-timezone';

test('supports date conversion for "US/Eastern (−05:00)" deprecated timezone', () => {
  const isoDate = '2021-03-03T05:00:00.000Z';

  expect(convertByTimezone(isoDate, 'US/Eastern')).toMatchInlineSnapshot(
    `"2021-03-03T00:00:00.000Z"`
  );
});

test('supports date conversion for "Europe/Warsaw (+01:00)" canonical timezone', () => {
  const isoDate = '2021-03-03T12:00:00.000Z';

  expect(convertByTimezone(isoDate, 'Europe/Warsaw')).toMatchInlineSnapshot(
    `"2021-03-03T13:00:00.000Z"`
  );
});

test('supports date conversion for "Europe/Nicosia (+02:00)" alias timezone', () => {
  const isoDate = '2021-03-03T12:00:00.000Z';

  expect(convertByTimezone(isoDate, 'Europe/Nicosia')).toMatchInlineSnapshot(
    `"2021-03-03T14:00:00.000Z"`
  );
});

test('fallbacks to "UTC" for not recognized timezone', () => {
  const isoDate = '2021-03-03T12:00:00.000Z';

  expect(convertByTimezone(isoDate, 'Timezone/Not-Supported')).toEqual(isoDate);
});
