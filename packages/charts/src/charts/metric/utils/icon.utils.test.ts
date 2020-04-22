import { generateCircles } from './icon.utils';

describe('@keen.io/charts - <MetricChart /> utils', () => {
  describe('generateCircles()', () => {
    it('should set color for "solid" circle style', () => {
      const color = 'black';
      const circles = generateCircles({ circleStyle: 'solid', color });

      expect(circles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            color,
          }),
        ])
      );
    });

    it('should add color opacity for "regular" style', () => {
      const color = 'black';
      const circles = generateCircles({ circleStyle: 'regular', color });

      expect(circles).toMatchSnapshot();
    });
  });
});
