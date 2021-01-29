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
