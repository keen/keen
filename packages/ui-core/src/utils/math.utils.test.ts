import { calculateHypotenuseHeight } from './math.utils';

describe('@keen.io/charts - math utils', () => {
  describe('calculateHypotenuseHeight()', () => {
    it('should calculate hypotenuse height', () => {
      const result = calculateHypotenuseHeight(2, 4);
      expect(result).toEqual(4.47213595499958);
    });
  });
});
