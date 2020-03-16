import {
  getKeysDifference,
  normalizeToPercent,
  calculateRange,
} from './data.utils';

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

  describe('calculateRange()', () => {
    const data = [
      { label: 'January', sale: -3, buy: 11, revenue: 30 },
      { label: 'February', sale: 12, buy: 3, revenue: 21 },
    ];

    it('should calculate minimum and maximum values for provided keys', () => {
      const { minimum, maximum } = calculateRange(data, 'auto', 'auto', [
        'sale',
        'revenue',
      ]);

      expect(minimum).toEqual(-3);
      expect(maximum).toEqual(30);
    });

    it('should return defined minimum and maximum values', () => {
      const minValue = -2;
      const maxValue = 10;

      const { minimum, maximum } = calculateRange([], minValue, maxValue, []);

      expect(minimum).toEqual(minValue);
      expect(maximum).toEqual(maxValue);
    });

    it('should return default value for minimum greater than 0', () => {
      const minValue = 3;
      const maxValue = 10;

      const { minimum } = calculateRange([], minValue, maxValue, []);

      expect(minimum).toEqual(0);
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
