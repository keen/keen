import { calculateBarProperties } from './hover-bar.utils';

describe('@keen.io/charts', () => {
  describe('<HoverBar /> - utils', () => {
    const margins = { top: 10, bottom: 10, left: 10, right: 10 };
    const svgDimensions = { width: 100, height: 100 };

    const xMin = margins.left;
    const xMax = svgDimensions.width - margins.right;

    it('should calculate "barX" position', () => {
      const { barX } = calculateBarProperties({
        margins,
        svgDimensions,
        xMin,
        xMax,
        x: 50,
      });

      expect(barX).toEqual(25);
    });

    it('should adjust "barX" position for left overflow', () => {
      const { barX } = calculateBarProperties({
        margins,
        svgDimensions,
        xMin,
        xMax,
        x: 15,
      });

      expect(barX).toEqual(10);
    });

    it('should adjust "barX" position for right overflow', () => {
      const { barX } = calculateBarProperties({
        margins,
        svgDimensions,
        xMin,
        xMax,
        x: 90,
      });

      expect(barX).toEqual(40);
    });

    it('should set "barY" property based on top margin', () => {
      const { barY } = calculateBarProperties({
        margins,
        svgDimensions,
        xMin,
        xMax,
        x: 15,
      });

      expect(barY).toEqual(10);
    });

    it('should set "barY" based on "y" argument', () => {
      const { barY } = calculateBarProperties({
        margins,
        svgDimensions,
        xMin,
        xMax,
        y: 20,
        x: 15,
      });

      expect(barY).toEqual(20);
    });
  });
});
