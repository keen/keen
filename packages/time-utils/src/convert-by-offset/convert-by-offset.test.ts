import convertByOffset from './convert-by-offset';

test('converts date by "1 hour" positive offset', () => {
  const utcISODate = '2021-03-14T21:00:00.000Z';

  expect(convertByOffset(utcISODate, 60)).toMatchInlineSnapshot(
    `"2021-03-14T22:00:00.000Z"`
  );
});

test('converts date by "5 hours" negative offset', () => {
  const utcISODate = '2021-03-14T21:00:00.000Z';

  expect(convertByOffset(utcISODate, -300)).toMatchInlineSnapshot(
    `"2021-03-14T16:00:00.000Z"`
  );
});

test('fallbacks to "UTC" when offset is not recognized', () => {
  const utcISODate = '2021-03-14T21:00:00.000Z';

  expect(convertByOffset(utcISODate, '+300' as any)).toMatchInlineSnapshot(
    `"2021-03-14T21:00:00.000Z"`
  );
});
