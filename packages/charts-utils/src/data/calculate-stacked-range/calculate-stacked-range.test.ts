import calculateStackedRange from './calculate-stacked-range';

test('calculates "minimum" and "maximum" values', () => {
  const data = [
    { amount: 10, profit: 20 },
    { amount: -30, profit: -10 },
    { amount: 20, profit: 100 },
    { amount: -20, profit: 0 },
  ];

  const result = calculateStackedRange(data, 'auto', 'auto', [
    'amount',
    'profit',
  ]);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "maximum": 120,
      "minimum": -40,
    }
  `);
});

test('setup "minimum" based on provided value', () => {
  const data = [
    { amount: 10 },
    { amount: 30 },
    { amount: 20 },
    { amount: -15 },
  ];

  const result = calculateStackedRange(data, -40, 'auto', ['amount']);

  expect(result).toEqual({
    minimum: -40,
    maximum: 30,
  });
});

test('setup "maximum" based on provided value', () => {
  const data = [
    { profit: 10 },
    { profit: 300 },
    { profit: 20 },
    { profit: 10 },
  ];

  const result = calculateStackedRange(data, 'auto', 100, ['amount']);

  expect(result).toEqual({
    minimum: 0,
    maximum: 100,
  });
});
