import { getKeysDifference } from './data.utils';

describe('@keen.io/charts - data utils', () => {
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
