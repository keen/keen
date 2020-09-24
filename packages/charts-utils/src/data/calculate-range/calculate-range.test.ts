import calculateRange from './calculate-range';

const data = [
  { label: 'January', sale: -3, buy: 11, revenue: 30 },
  { label: 'February', sale: 12, buy: 3, revenue: 21 },
];

test('calculates minimum and maximum values', () => {
  const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [
    'sale',
    'revenue',
  ]);

  expect(minimum).toEqual(-3);
  expect(maximum).toEqual(30);
});

test('should return defined minimum and maximum values', () => {
  const minValue = -2;
  const maxValue = 10;

  const { minimum, maximum } = calculateRange([], minValue, maxValue, [
    'sale',
    'revenue',
  ]);

  expect(minimum).toEqual(minValue);
  expect(maximum).toEqual(maxValue);
});

test('should return 0 for "auto" minimum value', () => {
  const minValue = 'auto';
  const maxValue = 10;

  const { minimum, maximum } = calculateRange(data, minValue, maxValue, [
    'buy',
    'revenue',
  ]);

  expect(minimum).toEqual(0);
  expect(maximum).toEqual(maxValue);
});
