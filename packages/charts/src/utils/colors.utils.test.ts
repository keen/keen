import { calculateColorScale } from './colors.utils';

describe('@keen.io/charts - colors - utils', () => {
  describe('calculateColorScale()', () => {
    describe('colorMode === continuous', () => {
      it('should return specific colors for 3 provided colors', () => {
        const color = calculateColorScale(0, 20, ['yellow', 'green', 'red'], 3);

        expect(color(0)).toEqual('rgb(255, 255, 0)');
        expect(color(20)).toEqual('rgb(255, 0, 0)');
        expect(color(10)).toEqual('rgb(0, 128, 0)');
      });
      it('should return specific colors for 2 provided colors', () => {
        const color = calculateColorScale(0, 20, ['white', 'black'], 2);

        expect(color(0)).toEqual('rgb(255, 255, 255)');
        expect(color(20)).toEqual('rgb(0, 0, 0)');
        expect(color(10)).toEqual('rgb(128, 128, 128)');
      });

      it('should return specific colors for 0 provided colors', () => {
        const color = calculateColorScale(0, 20);

        expect(color(0)).toEqual('rgb(133, 180, 195)');
        expect(color(20)).toEqual('rgb(203, 86, 35)');
        expect(color(10)).toEqual('rgb(168, 133, 115)');
      });
    });
    describe('colorMode === discrete', () => {
      it('should return specific colors for 3 provided colors', () => {
        const color = calculateColorScale(
          0,
          20,
          ['yellow', 'green', 'red'],
          3,
          'discrete'
        );

        expect(color(0)).toEqual('yellow');
        expect(color(20)).toEqual('red');
        expect(color(10)).toEqual('green');
      });
      it('should return specific colors for 2 provided colors', () => {
        const color = calculateColorScale(
          0,
          20,
          ['white', 'black'],
          2,
          'discrete'
        );

        expect(color(0)).toEqual('white');
        expect(color(20)).toEqual('black');
        expect(color(10)).toEqual('white');
      });
    });
  });
});
