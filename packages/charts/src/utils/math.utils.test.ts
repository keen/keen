import { calculateHypotenuse, calculateHypotenuseHeight } from './math.utils';

describe('@keen.io/charts - math utils', () => {
  describe('calculateHypotenuseHeight()', () => {
    it('should calculate hypotenuse height', () => {
      const result = calculateHypotenuseHeight(2, 4);
      expect(result).toEqual(4.47213595499958);
    });
  });

  describe('calculateHypotenuse()', () => {
    it('should calculate hypotenuse', () => {
      const result = calculateHypotenuse(5, 10, 5);
      expect(result).toMatchInlineSnapshot(`
        Array [
          2.23606797749979,
          4.47213595499958,
        ]
      `);
    });
  });
});
