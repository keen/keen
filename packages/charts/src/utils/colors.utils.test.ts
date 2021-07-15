import { calculateColorScale } from './colors.utils';

describe('@keen.io/charts - colors - utils', () => {
  describe('calculateColorScale()', () => {
    describe('colorMode === continuous', () => {
      it('should return specific colors for 3 provided colors', () => {
        const color = calculateColorScale(0, 20, 'continuous', 3, [
          'yellow',
          'green',
          'red',
        ]);

        expect(color(0)).toEqual('rgb(255, 255, 0)');
        expect(color(20)).toEqual('rgb(255, 0, 0)');
        expect(color(10)).toEqual('rgb(127, 64, 0)');
      });
      it('should return specific colors for 2 provided colors', () => {
        const color = calculateColorScale(0, 20, 'continuous', 2, [
          'white',
          'black',
        ]);

        expect(color(0)).toEqual('rgb(255, 255, 255)');
        expect(color(20)).toEqual('rgb(0, 0, 0)');
        expect(color(10)).toEqual('rgb(0, 0, 0)');
      });

      it('should return specific colors for 0 provided colors', () => {
        const color = calculateColorScale(0, 20);

        expect(color(0)).toEqual('rgb(133, 180, 195)');
        expect(color(20)).toEqual('rgb(11, 56, 0)');
        expect(color(10)).toEqual('rgb(72, 118, 80)');
      });
    });
    describe('colorMode === discrete', () => {
      it('should return specific colors for 3 provided colors', () => {
        const color = calculateColorScale(0, 20, 'discrete', 3, [
          'yellow',
          'green',
          'red',
        ]);

        expect(color(0)).toEqual('yellow');
        expect(color(20)).toEqual('red');
        expect(color(10)).toEqual('green');
      });
      it('should return specific colors for 2 provided colors', () => {
        const color = calculateColorScale(0, 20, 'discrete', 2, [
          'white',
          'black',
        ]);

        expect(color(0)).toEqual('white');
        expect(color(20)).toEqual('black');
        expect(color(10)).toEqual('white');
      });
    });
  });
});
