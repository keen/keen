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

test('all keys should be strings', () => {
  const { data, keys } = transformSingular({
    result: 120,
  });

  const dataKeys = [];

  for (const property in data[0]) {
    dataKeys.push(property);
  }

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
  expect(dataKeys.every((key) => typeof key === 'string')).toBeTruthy();
});
