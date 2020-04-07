import {
  calculateVerticalOffset,
  calculateHorizontalOffset,
  getTextAnchor,
} from './axis-title.utils';
import { X_AXIS_PADDING } from '../axes.component';

describe('@keen.io/charts - <AxisTitle /> utils', () => {
  const svgDimensions = { width: 100, height: 100 };
  const margins = { top: 10, right: 10, bottom: 10, left: 10 };

  describe('calculateVerticalOffset()', () => {
    it('should return offset for "top" alignment', () => {
      const top = calculateVerticalOffset('top', svgDimensions, margins);
      expect(top).toEqual(-margins.top);
    });

    it('should return offset for "bottom" alignment', () => {
      const bottom = calculateVerticalOffset('bottom', svgDimensions, margins);
      expect(bottom).toEqual(
        -svgDimensions.height - X_AXIS_PADDING + margins.bottom
      );
    });

    it('should return offset for "center" alignment', () => {
      const center = calculateVerticalOffset('center', svgDimensions, margins);
      expect(center).toEqual(-svgDimensions.height / 2);
    });
  });
  describe('calculateHorizontalOffset()', () => {
    it('should return offset for "left" alignment', () => {
      const left = calculateHorizontalOffset('left', svgDimensions, margins);
      expect(left).toEqual(margins.left);
    });

    it('should return offset for "right" alignment', () => {
      const right = calculateHorizontalOffset('right', svgDimensions, margins);
      expect(right).toEqual(svgDimensions.width - margins.right);
    });

    it('should return offset for "center" alignment', () => {
      const center = calculateHorizontalOffset(
        'center',
        svgDimensions,
        margins
      );
      expect(center).toEqual(svgDimensions.height / 2);
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

    it('should return "middle" anchor', () => {
      const center = getTextAnchor('center');
      const empty = getTextAnchor('');

      expect(center).toEqual('middle');
      expect(empty).toEqual('middle');
    });
  });
});
