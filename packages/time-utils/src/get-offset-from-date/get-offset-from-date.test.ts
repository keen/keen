import getOffsetFromDate from './get-offset-from-date';

test('extracts positive offset from UTC ISO string date', () => {
  const offset = getOffsetFromDate('2021-03-14T16:00:00+03:00');

  expect(offset).toEqual(180);
});

test('extracts negative offset from UTC ISO string date', () => {
  const offset = getOffsetFromDate('2021-03-14T12:00:00-05:00');

  expect(offset).toEqual(-300);
});

test('extracts zero offset from UTC ISO string date', () => {
  const offset = getOffsetFromDate('2020-02-01T00:00:00.000-00:00');

  expect(offset).toEqual(-0);
});

test('returns "null" for not defined offset', () => {
  const offset = getOffsetFromDate('2021-03-14T16:00:00');

  expect(offset).toBeNull();
});

test('extracts negative offset with mintues precision from UTC ISO string date', () => {
  const offset = getOffsetFromDate('2021-03-14T16:00:00-02:30');

  expect(offset).toEqual(-150);
});
