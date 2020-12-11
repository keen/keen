import { fillWithEmptyKeys } from './transform.utils';

describe('fillWithEmptyKeys()', () => {
  test('fills empty dataset keys with empty string', () => {
    const keys = new Set(['city', 'name']);
    const resultsToTransform = [
      {
        name: 'Darek',
      },
      {
        city: 'Krakow',
      },
    ];

    const result = fillWithEmptyKeys(keys, resultsToTransform);

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "city": "",
          "name": "Darek",
        },
        Object {
          "city": "Krakow",
          "name": "",
        },
      ]
    `);
  });

  test('fills empty dataset keys with defined value', () => {
    const keys = new Set(['city', 'name']);
    const resultsToTransform = [
      {
        name: 'Darek',
      },
      {
        city: 'Krakow',
      },
    ];

    const result = fillWithEmptyKeys(keys, resultsToTransform, 0);

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "city": 0,
          "name": "Darek",
        },
        Object {
          "city": "Krakow",
          "name": 0,
        },
      ]
    `);
  });
});
