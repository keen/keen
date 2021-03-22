import convertDate from './convert-date';

test('performs date conversion based on date with offset', () => {
  const utcISODate = '2021-03-14T15:00:00.000Z';

  const timeframe = {
    start: '2021-03-14T16:00:00-02:00',
    end: '2021-03-15T19:00:00-02:00',
  };

  expect(convertDate(utcISODate, timeframe)).toMatchInlineSnapshot(
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
