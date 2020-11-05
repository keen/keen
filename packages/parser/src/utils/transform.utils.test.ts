import { fillWithEmptyKeys } from './transform.utils';

describe('fillWithEmptyKeys()', () => {
  it('should return array with added keys filled with empty string', () => {
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
});
