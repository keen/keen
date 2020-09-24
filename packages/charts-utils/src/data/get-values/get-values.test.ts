import getValues from './get-values';

const data = [
  { buy: 11, revenue: 30, products: 10 },
  { buy: 3, revenue: 21, products: undefined },
];

test('extracts values based on provided keys', () => {
  const result = getValues(data, ['revenue']);

  expect(result).toMatchInlineSnapshot(`
    Array [
      30,
      21,
    ]
  `);
});

test('omits "undefined" values', () => {
  const result = getValues(data, ['products']);

  expect(result).toEqual([10]);
});
