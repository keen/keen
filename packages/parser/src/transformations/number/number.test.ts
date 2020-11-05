import { transformFromNumber } from './number';

test('creates structure for numeric value', () => {
  const result = transformFromNumber(12);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "keys": Array [
        "keen.value",
      ],
      "results": Array [
        Object {
          "keen.key": "Result",
          "keen.value": 12,
        },
      ],
    }
  `);
});
