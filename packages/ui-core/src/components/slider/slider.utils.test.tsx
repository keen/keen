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
            "pos": 0,
            "val": 0,
          },
          Object {
            "pos": 167,
            "val": 3,
          },
          Object {
            "pos": 333,
            "val": 7,
          },
          Object {
            "pos": 500,
            "val": 10,
          },
        ]
      `);
    });
    it('should return 30', () => {
      const result = calculateTicks(10, 100, 10, 500);
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "pos": 0,
            "val": 10,
          },
          Object {
            "pos": 50,
            "val": 19,
          },
          Object {
            "pos": 100,
            "val": 28,
          },
          Object {
            "pos": 150,
            "val": 37,
          },
          Object {
            "pos": 200,
            "val": 46,
          },
          Object {
            "pos": 250,
            "val": 55,
          },
          Object {
            "pos": 300,
            "val": 64,
          },
          Object {
            "pos": 350,
            "val": 73,
          },
          Object {
            "pos": 400,
            "val": 82,
          },
          Object {
            "pos": 450,
            "val": 91,
          },
          Object {
            "pos": 500,
            "val": 100,
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
