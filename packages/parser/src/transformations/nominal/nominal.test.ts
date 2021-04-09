import { transformNominal } from './nominal';

test('transform nominal data', () => {
  const result = ['Miss', 'Mr.', 'Mrs.', 'Ms.'];

  expect(transformNominal({ result })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.value": "Miss",
        },
        Object {
          "keen.value": "Mr.",
        },
        Object {
          "keen.value": "Mrs.",
        },
        Object {
          "keen.value": "Ms.",
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('all keys should be strings', () => {
  const result = ['Miss', 'Mr.', 'Mrs.', 'Ms.'];

  const { data, keys } = transformNominal({ result });

  const dataKeys = [];

  for (const property in data[0]) {
    dataKeys.push(property);
  }

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
  expect(dataKeys.every((key) => typeof key === 'string')).toBeTruthy();
});
