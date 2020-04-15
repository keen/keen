import {
  sortByValue,
  opacityScale,
  radiusScale,
  verticalPositionScale,
} from './bubble-legend.utils';

describe('@keen/components', () => {
  describe('<BubbleLegend /> - utils', () => {
    const domain = [10, 20, 40, 15, 60, 80, 25, 50, 70, 30];

    describe('sortByValue()', () => {
      it('should sort items provided by value', () => {
        const sortedValues = sortByValue(domain);
        expect(sortedValues).toEqual([10, 15, 20, 25, 30, 40, 50, 60, 70, 80]);
      });
    });

    describe('opacityScale()', () => {
      it('should return correct opacity scale for object', () => {
        const getOpacityScale = opacityScale([10, 80], 0.1);
        expect(getOpacityScale(10)).toEqual(1);
        expect(getOpacityScale(80)).toEqual(0.1);
        expect(getOpacityScale(50)).toEqual(0.30342157153379123);
      });
    });

    describe('radiusScale()', () => {
      it('should return radius scale for specific range', () => {
        const getRadiusScale = radiusScale(5, 40, 100);
        expect(getRadiusScale(5)).toEqual(0);
        expect(getRadiusScale(40)).toEqual(100);
        expect(getRadiusScale(25)).toEqual(57.14285714285714);
      });
    });

    describe('verticalPositionScale()', () => {
      it('should return vertical offset', () => {
        const getVerticalPosition = verticalPositionScale(50);
        expect(getVerticalPosition(0)).toEqual(0);
        expect(getVerticalPosition(30)).toEqual(60);
        expect(getVerticalPosition(50)).toEqual(100);
      });
    });
  });
});
