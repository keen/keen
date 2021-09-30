import calculateTotalValue from './calculate-total-value';

test('calculates total value for provided data series', () => {
  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': 'Edwidge Danticat | Love, Anger, Madness',
      'keen.value': 97,
    },
    {
      'keen.key': 'George R. R. Martin | Game of Thrones',
      'keen.value': 700,
    },
    {
      'keen.key': 'Stephen King | The Shining',
      'keen.value': 3,
    },
  ];

  const result = calculateTotalValue(data, 'keen.key', keys);

  expect(result).toEqual(800);
});
