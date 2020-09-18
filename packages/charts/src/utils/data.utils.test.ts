import { getKeysDifference, normalizeToPercent } from './data.utils';

describe('@keen.io/charts - data utils', () => {
  describe('normalizeToPercent()', () => {
    const fixture = [
      { day: 'Monday', woman: 10, man: 5 },
      { day: 'Tuesday', woman: 20, man: 20 },
    ];

    it('should convert values to percents', () => {
      expect(normalizeToPercent(fixture, ['man', 'woman']))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "day": "Monday",
            "man": 33.33333333333333,
            "woman": 66.66666666666666,
          },
          Object {
            "day": "Tuesday",
            "man": 50,
            "woman": 50,
          },
        ]
      `);
    });
  });

  describe('getKeysDifference()', () => {
    it('should return difference "array" collection', () => {
      const keys = ['books', 'cars', 'phones', 'names'];
      const disabledKeys = ['phones', 'names'];

      expect(getKeysDifference(keys, disabledKeys)).toMatchInlineSnapshot(`
        Array [
          "books",
          "cars",
        ]
      `);
    });
  });
});
