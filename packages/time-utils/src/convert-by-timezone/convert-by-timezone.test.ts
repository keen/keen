import convertByTimezone from './convert-by-timezone';

test('supports date conversion for "US/Eastern (−05:00)" deprecated timezone', () => {
  const isoDate = '2021-03-03T05:00:00.000Z';

  expect(convertByTimezone(isoDate, 'US/Eastern')).toMatchInlineSnapshot(
    `"2021-03-03T00:00:00.000Z"`
  );
});

test('applies "America/New_York (-04:00)" timezone according to "Daylight Saving Time"', () => {
  const isoDate = '2021-03-24T16:00:00.000Z';

  expect(convertByTimezone(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2021-03-24T12:00:00.000Z"`
  );
});

test('applies "America/New_York (-05:00)" timezone according to "Standard Time"', () => {
  const isoDate = '2021-12-10T16:00:00.000Z';

  expect(convertByTimezone(isoDate, 'America/New_York')).toMatchInlineSnapshot(
    `"2021-12-10T11:00:00.000Z"`
  );
});

test('applies "Europe/Warsaw (+01:00)" timezone according to "Standard Time"', () => {
  const isoDate = '2021-03-01T12:00:00.000Z';

  expect(convertByTimezone(isoDate, 'Europe/Warsaw')).toMatchInlineSnapshot(
    `"2021-03-01T13:00:00.000Z"`
  );
});

test('applies "Europe/Warsaw (+02:00)" timezone according to "Daylight Saving Time"', () => {
  const isoDate = '2021-05-02T12:00:00.000Z';

  expect(convertByTimezone(isoDate, 'Europe/Warsaw')).toMatchInlineSnapshot(
    `"2021-05-02T14:00:00.000Z"`
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
