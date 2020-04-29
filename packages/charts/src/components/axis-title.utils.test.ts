import {
  getHorizontalPosition,
  getVerticalPosition,
  getTextAnchor,
} from './axis-title.utils';

describe('@keen.io/charts - <AxisTitle /> utils', () => {
  const line = { x1: 0, x2: 100, y1: 100, y2: 0 };
  const { x1, x2, y1, y2 } = line;

  describe('getVerticalPosition()', () => {
    it('should return offset for "top" alignment', () => {
      const top = getVerticalPosition('top', line);
      expect(top).toEqual(-y2);
    });

    it('should return offset for "bottom" alignment', () => {
      const bottom = getVerticalPosition('bottom', line);
      expect(bottom).toEqual(-y1);
    });

    it('should return offset for "center" alignment', () => {
      const center = getVerticalPosition('center', line);
      expect(center).toEqual(-(y1 + (y2 - y1) / 2));
    });
  });

  describe('getHorizontalPosition()', () => {
    it('should return offset for "left" alignment', () => {
      const left = getHorizontalPosition('left', line);
      expect(left).toEqual(x1);
    });

    it('should return offset for "right" alignment', () => {
      const right = getHorizontalPosition('right', line);
      expect(right).toEqual(x2);
    });

    it('should return offset for "center" alignment', () => {
      const center = getHorizontalPosition('center', line);
      expect(center).toEqual(x1 + (x2 - x1) / 2);
    });
  });

  describe('getTextAnchor()', () => {
    it('should return "start" anchor', () => {
      const left = getTextAnchor('left');
      const bottom = getTextAnchor('bottom');

      expect(left).toEqual('start');
      expect(bottom).toEqual('start');
    });

    it('should return "end" anchor', () => {
      const right = getTextAnchor('right');
      const top = getTextAnchor('top');

      expect(right).toEqual('end');
      expect(top).toEqual('end');
    });
  });
});
