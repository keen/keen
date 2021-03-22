import convertDate from './convert-date';

test('performs date conversion based on numeric offset (+02:00)', () => {
  const utcISODate = '2021-03-14T15:00:00.000Z';

  expect(convertDate(utcISODate, -120)).toMatchInlineSnapshot(
    `"2021-03-14T13:00:00.000Z"`
  );
});

test('performs date conversion for deprecated named timezone', () => {
  const isoDate = '2021-03-03T05:00:00.000Z';

  expect(convertDate(isoDate, 'US/Eastern')).toMatchInlineSnapshot(
    `"2021-03-03T00:00:00.000Z"`
  );
});

test('performs date conversion for "Africa/Cairo (+02:00)" canonical named timezone', () => {
  const isoDate = '2021-03-03T05:00:00.000Z';

  expect(convertDate(isoDate, 'Africa/Cairo')).toMatchInlineSnapshot(
    `"2021-03-03T07:00:00.000Z"`
  );
});

test('fallbacks to "UTC" date', () => {
  const utcISODate = '2021-03-14T15:00:00.000Z';
  const timeframe: any = {};

  expect(convertDate(utcISODate, timeframe)).toEqual(utcISODate);
});
