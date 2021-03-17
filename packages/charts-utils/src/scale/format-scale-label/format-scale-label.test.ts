import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

import formatScaleLabel from './format-scale-label';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

test('returns original scale value', () => {
  const value = 'marketing';
  const result = formatScaleLabel(value, { type: 'band' });

  expect(result).toEqual(value);
});

test('applies default formatter for time scale based on ticks precision', () => {
  const value = new Date('2020-02-01T10:45:00.000Z');
  const result = formatScaleLabel(
    value,
    { type: 'time', formatLabel: null },
    'day'
  );

  expect(result).toMatchInlineSnapshot(`" 1 Sat 20"`);
});

test('applies formatter function from scale settings ', () => {
  const value = 'formatted';
  const formatFunction = () => 'formatted';
  const result = formatScaleLabel(100, {
    type: 'band',
    formatLabel: formatFunction,
  });

  expect(result).toEqual(value);
});

test('formats "Date" instance as ISO string', () => {
  const value = new Date('2020-09-12T12:00:00Z');
  const result = formatScaleLabel(value);

  expect(result).toMatchInlineSnapshot(
    `"2020-09-12T12:00:00.000Z UTC (MockDate: GMT+0000)"`
  );
});
