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

  const keys = transformNominal({ result }).keys;

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
});
