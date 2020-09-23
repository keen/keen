import getKeysDifference from './get-keys-difference';

test('returns filtered collection of keys', () => {
  const keys = ['books', 'cars', 'phones', 'names'];
  const disabledKeys = ['phones', 'names'];

  expect(getKeysDifference(keys, disabledKeys)).toMatchInlineSnapshot(`
    Array [
      "books",
      "cars",
    ]
  `);
});
