import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import normalizeDate from './normalize-date';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

test('normalizes date with "month" precision', () => {
  const normalizedDate = normalizeDate('2020-02-01T10:45:00.000Z', 'month');

  expect(normalizedDate).toMatchInlineSnapshot(`"2020-02-01T00:00:00.000Z"`);
});

test('normalizes date with "day" precision', () => {
  const normalizedDate = normalizeDate('2020-02-15T12:30:00.000Z', 'day');

  expect(normalizedDate).toMatchInlineSnapshot(`"2020-02-15T00:00:00.000Z"`);
});

test('normalizes date with "week" precision', () => {
  const normalizedDate = normalizeDate('2020-02-15T12:30:00.000Z', 'week');

  expect(normalizedDate).toMatchInlineSnapshot(`"2020-02-15T00:00:00.000Z"`);
});

test('normalizes date with "minute" precision', () => {
  const normalizedDate = normalizeDate('2021-01-10T12:30:30.000Z', 'minute');

  expect(normalizedDate).toMatchInlineSnapshot(`"2021-01-10T12:30:00.000Z"`);
});

test('normalizes date with "hour" precision', () => {
  const normalizedDate = normalizeDate('2021-01-10T12:30:45.000Z', 'hour');

  expect(normalizedDate).toMatchInlineSnapshot(`"2021-01-10T12:00:00.000Z"`);
});

test('normalizes date with "year" precision', () => {
  const normalizedDate = normalizeDate('2021-05-15T12:30:45.000Z', 'year');

  expect(normalizedDate).toMatchInlineSnapshot(`"2021-01-01T00:00:00.000Z"`);
});
