import { arrowReverse } from './tooltip.utils';

describe('@keen.io/ui-core - tooltip utils', () => {
  describe('arrowReverse()', () => {
    it('should return top', () => {
      const result = arrowReverse('bottom');
      expect(result).toBe('top');
    });

    it('should return left', () => {
      const result = arrowReverse('right');
      expect(result).toBe('left');
    });

    it('should return right', () => {
      const result = arrowReverse('left');
      expect(result).toBe('right');
    });

    it('should return bottom', () => {
      const result = arrowReverse('top');
      expect(result).toBe('bottom');
    });
  });
});
