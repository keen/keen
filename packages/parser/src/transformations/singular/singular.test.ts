import { transformSingular } from './singular';

test('transform singular result', () => {
  const result = transformSingular({
    result: 120,
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "Result",
          "keen.value": 120,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
