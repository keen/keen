import { generateHeader, generateTable, setColumnsOrder } from './chart.utils';

describe('generateHeader()', () => {
  const data = { name: 'John', age: 31, city: 'San Antonio' };

  test('generates header with formatted "age" property', () => {
    const header = generateHeader(data);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "align": "left",
          "key": "name",
        },
        Object {
          "align": "right",
          "key": "age",
        },
        Object {
          "align": "left",
          "key": "city",
        },
      ]
    `);
  });
});

describe('generateTable()', () => {
  const data = [
    { name: 'Logan', age: 31, city: 'San Antonio' },
    { name: 'Clementine', age: 22, city: 'Las Vegas' },
  ];

  test('generates table and applies format function for "city" property', () => {
    const format = { city: (value) => `(${value})` };
    const header = generateTable(data, format);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 31,
          "city": "(San Antonio)",
          "name": "Logan",
        },
        Object {
          "age": 22,
          "city": "(Las Vegas)",
          "name": "Clementine",
        },
      ]
    `);
  });

  test('generates table and applies formattter for "age" property', () => {
    const format = { age: '${number; 0; add; 5} yo' };
    const header = generateTable(data, format);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": "36 yo",
          "city": "San Antonio",
          "name": "Logan",
        },
        Object {
          "age": "27 yo",
          "city": "Las Vegas",
          "name": "Clementine",
        },
      ]
    `);
  });
});

describe('setColumnsOrder()', () => {
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

  test('set columns order based on provided settings', () => {
    const orderSettings = ['city', 'province', 'country', 'invalid-key-name'];
    const [firstSeries] = setColumnsOrder(orderSettings, data);

    expect(Object.keys(firstSeries)).toMatchInlineSnapshot(`
      Array [
        "city",
        "province",
        "country",
        "price",
      ]
    `);
  });
});
