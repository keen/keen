import sortKeysByValuesSum from './sort-keys-by-values-sum';

const data = [
  { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
  { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
  { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: 11, revenue: 30 },
];

const keys = ['sale', 'buy', 'revenue'];

test('should sort keys based of series values sum from biggest values to smallest', () => {
  const sortedKeys = sortKeysByValuesSum(data, keys);

  expect(sortedKeys).toMatchInlineSnapshot(`
    Array [
      "revenue",
      "buy",
      "sale",
    ]
  `);
});
