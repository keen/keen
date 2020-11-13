import createLabelFormatter from './create-label-formatter';

const date = '2019-01-01T00:00:00.000-00:00';

test('fallbacks to "month" precision formatter', () => {
  const format = createLabelFormatter('not-supported-precision');

  expect(format(date)).toMatchInlineSnapshot(`"Jan 19"`);
});

test('creates formatter for "day" precision', () => {
  const format = createLabelFormatter('day');

  expect(format(date)).toMatchInlineSnapshot(`" 1 Tue 19"`);
});

test('creates formatter for "week" precision', () => {
  const format = createLabelFormatter('week');

  expect(format(date)).toMatchInlineSnapshot(`"01 Tue"`);
});

test('creates formatter for "month" precision', () => {
  const format = createLabelFormatter('month');

  expect(format(date)).toMatchInlineSnapshot(`"Jan 19"`);
});

test('creates formatter for "year" precision', () => {
  const format = createLabelFormatter('year');

  expect(format(date)).toMatchInlineSnapshot(`"Jan, 2019"`);
});
