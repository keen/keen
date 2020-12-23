import {
  sortData,
  generateHeader,
  generateTable,
  setColumnsOrder,
} from './table.utils';

describe('<TableChart />', () => {
  describe('sortData()', () => {
    const data = [
      { name: 'Krzys', age: 31 },
      { name: 'Aga', age: 22 },
      { name: 'Bartek', age: 26 },
    ];
    it('should sort data ascending by name', () => {
      const result = sortData(data, { property: 'name', sort: 'ascending' });
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
    it('should sort data descending by age', () => {
      const result = sortData(data, { property: 'age', sort: 'descending' });
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
  describe('generateHeader()', () => {
    const data = { name: 'Krzys', age: 31, city: 'San antonio' };
    it('should generate header: formatted age property and other properties with first capital letter', () => {
      const format = { age: el => `${el}-a` };
      const header = generateHeader(data, format, true);
      expect(header).toMatchInlineSnapshot(`
        Array [
          Object {
            "key": "name",
            "value": "Name",
          },
          Object {
            "key": "age",
            "value": "age-a",
          },
          Object {
            "key": "city",
            "value": "City",
          },
        ]
      `);
    });
    it('should generate header: formatted age property and other properties lower-cased', () => {
      const format = { age: el => `${el}-a` };
      const header = generateHeader(data, format, false);
      expect(header).toMatchInlineSnapshot(`
        Array [
          Object {
            "key": "name",
            "value": "name",
          },
          Object {
            "key": "age",
            "value": "age-a",
          },
          Object {
            "key": "city",
            "value": "city",
          },
        ]
      `);
    });
  });
  describe('generateTable()', () => {
    const data = [
      { name: 'Krzys', age: 31, city: 'San antonio' },
      { name: 'Aga', age: 22, city: 'Las Vegas' },
      { name: 'Bartek', age: 26, city: 'Houston' },
    ];
    it('should generate header: formatted all values', () => {
      const format = el => `${el}-a`;
      const header = generateTable(data, format);
      expect(header).toMatchInlineSnapshot(`
        Array [
          Object {
            "age": "31-a",
            "city": "San antonio-a",
            "name": "Krzys-a",
          },
          Object {
            "age": "22-a",
            "city": "Las Vegas-a",
            "name": "Aga-a",
          },
          Object {
            "age": "26-a",
            "city": "Houston-a",
            "name": "Bartek-a",
          },
        ]
      `);
    });
    it('should generate header: formatted city values', () => {
      const format = { city: el => `Viva ${el}` };
      const header = generateTable(data, format);
      expect(header).toMatchInlineSnapshot(`
        Array [
          Object {
            "age": 31,
            "city": "Viva San antonio",
            "name": "Krzys",
          },
          Object {
            "age": 22,
            "city": "Viva Las Vegas",
            "name": "Aga",
          },
          Object {
            "age": 26,
            "city": "Viva Houston",
            "name": "Bartek",
          },
        ]
      `);
    });
  });
  describe('setColumnsOrder()', () => {
    it('should set columns order for data', () => {
      const data = [
        {
          price: 0.5,
          province: 'Liaoning',
          city: 'Shenyang',
          country: 'China',
        },
        {
          price: 0.5,
          province: 'West Virginia',
          city: 'Parsons',
          country: 'United States',
        },
      ];
      const order = ['city', 'province', 'country', 'invalid-key-name'];
      const formattedData = setColumnsOrder(order, data);

      expect(Object.keys(formattedData[0])).toMatchInlineSnapshot(`
        Array [
          "city",
          "province",
          "country",
          "price",
        ]
      `);
    });
  });
});
