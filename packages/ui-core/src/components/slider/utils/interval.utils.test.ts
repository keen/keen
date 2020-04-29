import {
  calculateIntervalValue,
  getIndex,
  getInitialOffset,
} from './interval.utils';

describe('@keen.io/ui-core - interval utils', () => {
  describe('calculateIntervalValue()', () => {
    const interval = {
      minimum: 0,
      maximum: 100,
      step: 1,
    };

    it('should return "0" for initial position', () => {
      const result = calculateIntervalValue({
        controlPosition: 0,
        currentIndex: 0,
        stepDimension: 100,
        interval,
      });

      expect(result).toEqual(0);
    });

    it('should return "50" for middle position', () => {
      const result = calculateIntervalValue({
        controlPosition: 50,
        currentIndex: 0,
        stepDimension: 100,
        interval,
      });

      expect(result).toEqual(50);
    });

    it('should calculate value for custom interval', () => {
      const interval = {
        minimum: 100,
        maximum: 1000,
        step: 100,
      };

      const result = calculateIntervalValue({
        controlPosition: 150,
        currentIndex: 1,
        stepDimension: 100,
        interval,
      });

      expect(result).toEqual(600);
    });
  });

  describe('getIndex()', () => {
    const stepDimension = 100;

    it('should return 0 index', () => {
      const x = 0;
      expect(getIndex(x, stepDimension)).toEqual(0);
    });

    it('should return 0 index for x equals stepDimension', () => {
      const x = 100;
      expect(getIndex(x, stepDimension)).toEqual(0);
    });

    it('should return 1 index', () => {
      const x = 120;
      expect(getIndex(x, stepDimension)).toEqual(1);
    });
  });

  describe('getInitialOffset()', () => {
    const stepDimension = 100;
    const intervals = [
      {
        minimum: 0,
        maximum: 100,
        step: 10,
      },
      {
        minimum: 100,
        maximum: 500,
        step: 100,
      },
    ];

    it('should return offset and index equal to 0 for 0 as initialValue', () => {
      const initialValue = 0;
      expect(
        getInitialOffset(initialValue, stepDimension, intervals).index
      ).toEqual(0);
      expect(
        getInitialOffset(initialValue, stepDimension, intervals).offset
      ).toEqual(0);
    });

    it('should return offset 200 and index 1 for 500 as initialValue', () => {
      const initialValue = 500;
      expect(
        getInitialOffset(initialValue, stepDimension, intervals).index
      ).toEqual(1);
      expect(
        getInitialOffset(initialValue, stepDimension, intervals).offset
      ).toEqual(200);
    });

    it('should return offset 20 and index 0 for 20 as initialValue', () => {
      const initialValue = 20;
      expect(
        getInitialOffset(initialValue, stepDimension, intervals).index
      ).toEqual(0);
      expect(
        getInitialOffset(initialValue, stepDimension, intervals).offset
      ).toEqual(20);
    });
  });
});
