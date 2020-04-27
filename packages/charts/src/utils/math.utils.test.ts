import {
  convertDegreesToRadians,
  calculateHypotenuse,
  calculateHypotenuseHeight,
  calculateCross,
} from './math.utils';

import { CartesianCords } from './math.utils';

describe('@keen.io/charts - math utils', () => {
  describe('calculateCross()', () => {
    const firstPoint: CartesianCords = [0, 10, 5];
    const secondPoint: CartesianCords = [5, 20, 25];
    const result = calculateCross(firstPoint, secondPoint);

    expect(result).toMatchInlineSnapshot(`
      Array [
        150,
        25,
        -50,
      ]
    `);
  });

  describe('convertDegreesToRadians()', () => {
    it('should calculate radians based on provided degrees', () => {
      const result = convertDegreesToRadians(90);

      expect(result).toMatchInlineSnapshot(`1.5707963267948966`);
    });
  });

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
