import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import createDateFormatter from './create-date-formatter';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

const date = '2019-01-01T00:00:00.000-00:00';

test('fallbacks to "month" precision formatter', () => {
  const format = createDateFormatter('not-supported-precision');

  expect(format(date)).toMatchInlineSnapshot(`"Jan 19"`);
});

test('creates formatter for "day" precision', () => {
  const format = createDateFormatter('day');

  expect(format(date)).toMatchInlineSnapshot(`" 1 Jan 19"`);
});

test('creates formatter for "week" precision', () => {
  const format = createDateFormatter('week');

  expect(format(date)).toMatchInlineSnapshot(`"01 Jan"`);
});

test('creates formatter for "month" precision', () => {
  const format = createDateFormatter('month');

  expect(format(date)).toMatchInlineSnapshot(`"Jan 19"`);
});

test('creates formatter for "year" precision', () => {
  const format = createDateFormatter('year');

  expect(format(date)).toMatchInlineSnapshot(`"2019"`);
});
