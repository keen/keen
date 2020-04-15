import { calculateMarkPosition } from './mark.utils';

describe('@keen.io/charts', () => {
  describe('<BarChart /> - calculateMarkPosition()', () => {
    const barProperties = {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
    };

    it('should calculate position for "vertical" layout', () => {
      const result = calculateMarkPosition({
        ...barProperties,
        layout: 'vertical',
      });

      expect(result).toEqual({
        x: 60,
        y: 10,
      });
    });

    it('should calculate position for "horizontal" layout', () => {
      const result = calculateMarkPosition({
        ...barProperties,
        layout: 'horizontal',
      });

      expect(result).toEqual({
        x: 110,
        y: 60,
      });
    });
  });
});
