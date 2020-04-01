import { firstCapital, hexRgb, sortData } from './table.utils';

describe('<TableChart />', () => {
  describe('firstCapital()', () => {
    it('should return John', () => {
      const result = firstCapital('john');
      expect(result).toEqual('John');
    });
    it('should return Smith', () => {
      const result = firstCapital('smith');
      expect(result).toEqual('Smith');
    });
    it('should return Cracow', () => {
      const result = firstCapital('cracow');
      expect(result).toEqual('Cracow');
    });
  });
  describe('hexRgb()', () => {
    it('should return rgb(133, 176, 199)', () => {
      const result = hexRgb('#85b0c7', 1);
      expect(result).toEqual('rgb(133, 176, 199)');
    });
    it('should return rgba(255, 77, 77, 0.8)', () => {
      const result = hexRgb('#ff4d4d', 0.8);
      expect(result).toEqual('rgba(255, 77, 77, 0.8)');
    });
    it('should return rgba(77, 255, 88, 0.3)', () => {
      const result = hexRgb('#4dff58', 0.3);
      expect(result).toEqual('rgba(77, 255, 88, 0.3)');
    });
  });
  describe('sortData()', () => {
    const data = [
      { name: 'Krzys', age: 31 },
      { name: 'Aga', age: 22 },
      { name: 'Bartek', age: 26 },
    ];
    it('should sort data asc by ', () => {
      const result = sortData(data, { property: 'name', sort: 'asc' });
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "age": 22,
            "name": "Aga",
          },
          Object {
            "age": 26,
            "name": "Bartek",
          },
          Object {
            "age": 31,
            "name": "Krzys",
          },
        ]
      `);
    });
    it('should sort data desc by ', () => {
      const result = sortData(data, { property: 'age', sort: 'desc' });
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "age": 31,
            "name": "Krzys",
          },
          Object {
            "age": 26,
            "name": "Bartek",
          },
          Object {
            "age": 22,
            "name": "Aga",
          },
        ]
      `);
    });
  });
});
