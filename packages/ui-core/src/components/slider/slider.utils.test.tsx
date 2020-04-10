import {
  calculatePercentage,
  colorsString,
  onChangeValue,
  calculateValueStep,
  calculateTicks,
  arrowReverse,
} from './slider.utils';

describe('slider - utils', () => {
  describe('calculatePercentage()', () => {
    describe('calculate without steps', () => {
      it('should return 0', () => {
        const result = calculatePercentage(0, 200, 100, 0, 1);
        expect(result).toEqual(0);
      });
      it('should return 25', () => {
        const result = calculatePercentage(50, 200, 100, 0, 1);
        expect(result).toEqual(25);
      });
      it('should return 75', () => {
        const result = calculatePercentage(150, 200, 100, 0, 1);
        expect(result).toEqual(75);
      });
    });
    describe('calculate with steps', () => {
      it('should return 0', () => {
        const result = calculatePercentage(0, 200, 100, 0, 10);
        expect(result).toEqual(0);
      });
      it('should return 30', () => {
        const result = calculatePercentage(50, 200, 100, 0, 10);
        expect(result).toEqual(30);
      });
      it('should return 80', () => {
        const result = calculatePercentage(150, 200, 100, 0, 10);
        expect(result).toEqual(80);
      });
    });
  });

  describe('colorsString()', () => {
    it('should return "white, red, green"', () => {
      const result = colorsString(['white', 'red', 'green'], 3);
      expect(result).toEqual('white, red, green');
    });
    it('should return "white, red"', () => {
      const result = colorsString(['white', 'red', 'green'], 2);
      expect(result).toEqual('white, red');
    });
    it('should return "blue, yellow, grey"', () => {
      const result = colorsString(['blue', 'yellow', 'grey'], 3);
      expect(result).toEqual('blue, yellow, grey');
    });
  });

  describe('onChangeValue()', () => {
    it('should return min and max value', () => {
      const result = onChangeValue(2, 10, 30);
      expect(result).toEqual({ min: 10, max: 30 });
    });
    it('should return 10', () => {
      const result = onChangeValue(1, 10, 20);
      expect(result).toEqual(10);
    });
  });

  describe('calculateValueStep()', () => {
    it('should return 10', () => {
      const result = calculateValueStep(12, 10);
      expect(result).toEqual(10);
    });
    it('should return 30', () => {
      const result = calculateValueStep(28, 5);
      expect(result).toEqual(30);
    });
  });

  describe('calculateTicks()', () => {
    it('should return 10', () => {
      const result = calculateTicks(0, 10, 3, 500);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "child": 0,
            "value": 0,
          },
          Object {
            "child": 3.3333333333333335,
            "value": 3.3333333333333335,
          },
          Object {
            "child": 6.666666666666667,
            "value": 6.666666666666667,
          },
          Object {
            "child": 10,
            "value": 10,
          },
        ]
      `);
    });
    it('should return 30', () => {
      const result = calculateTicks(10, 100, 10, 500);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "child": 0,
            "value": 0,
          },
          Object {
            "child": 10,
            "value": 10,
          },
          Object {
            "child": 20,
            "value": 20,
          },
          Object {
            "child": 30,
            "value": 30,
          },
          Object {
            "child": 40,
            "value": 40,
          },
          Object {
            "child": 50,
            "value": 50,
          },
          Object {
            "child": 60,
            "value": 60,
          },
          Object {
            "child": 70,
            "value": 70,
          },
          Object {
            "child": 80,
            "value": 80,
          },
          Object {
            "child": 90,
            "value": 90,
          },
          Object {
            "child": 100,
            "value": 100,
          },
        ]
      `);
    });
  });

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
