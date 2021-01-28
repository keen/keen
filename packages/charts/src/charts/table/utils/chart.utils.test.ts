import { generateHeader, generateTable, setColumnsOrder } from './chart.utils';

describe('generateHeader()', () => {
  const data = { name: 'John', age: 31, city: 'San antonio' };

  test('generates header with formatted "age" property', () => {
    const format = { age: () => `User Age` };
    const header = generateHeader(data, format);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "key": "name",
          "value": "name",
        },
        Object {
          "key": "age",
          "value": "User Age",
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
    { name: 'Logan', age: 31, city: 'San antonio' },
    { name: 'Clementine', age: 22, city: 'Las Vegas' },
  ];

  test('generates table and applies format function to all values', () => {
    const format = (element: string | number) => `(${element})`;
    const header = generateTable(data, format);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": "(31)",
          "city": "(San antonio)",
          "name": "(Logan)",
        },
        Object {
          "age": "(22)",
          "city": "(Las Vegas)",
          "name": "(Clementine)",
        },
      ]
    `);
  });

  test('generates table and applies format function for "city" property', () => {
    const format = { city: (element: string) => `Viva ${element}` };
    const header = generateTable(data, format);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 31,
          "city": "Viva San antonio",
          "name": "Logan",
        },
        Object {
          "age": 22,
          "city": "Viva Las Vegas",
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
