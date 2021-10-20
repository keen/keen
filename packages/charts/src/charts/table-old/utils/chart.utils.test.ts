import {
  generateHeader,
  generateTable,
  generateTableRowData,
  setColumnsOrder,
} from './chart.utils';

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
          "city": Object {
            "formatterType": undefined,
            "value": "(San Antonio)",
          },
          "name": "Logan",
        },
        Object {
          "age": 22,
          "city": Object {
            "formatterType": undefined,
            "value": "(Las Vegas)",
          },
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
          "age": Object {
            "formatterType": "number",
            "value": "36 yo",
          },
          "city": "San Antonio",
          "name": "Logan",
        },
        Object {
          "age": Object {
            "formatterType": "number",
            "value": "27 yo",
          },
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

describe('generateTableRowData()', () => {
  test('generates data for data without formatters applied', () => {
    const data = [
      {
        platform: ['Web', 'Mobile', 'Tablet'],
        referrer: 'google/ads',
        price: 0.5,
        province: 'Liaoning',
        city: 'Shenyang',
        country: 'China',
      },
      {
        platform: 'Mobile',
        referrer: 'google/ads',
        price: 0.5,
        province: 'West Virginia',
        city: 'Parsons',
        country: 'United States',
      },
    ];

    const result = generateTableRowData(data);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "0": Object {
          "alignment": "left",
          "value": Object {
            "city": "Shenyang",
            "country": "China",
            "platform": Array [
              "Web",
              "Mobile",
              "Tablet",
            ],
            "price": 0.5,
            "province": "Liaoning",
            "referrer": "google/ads",
          },
        },
        "1": Object {
          "alignment": "left",
          "value": Object {
            "city": "Parsons",
            "country": "United States",
            "platform": "Mobile",
            "price": 0.5,
            "province": "West Virginia",
            "referrer": "google/ads",
          },
        },
      }
    `);
  });

  test('generates data for data with formatters applied', () => {
    const data = [
      {
        age: {
          formatterType: 'number',
          value: '36 yo',
        },
        city: {
          formatterType: undefined,
          value: '(San Antonio)',
        },
        name: 'Logan',
      },
      {
        age: {
          formatterType: 'number',
          value: '37 yo',
        },
        city: {
          formatterType: undefined,
          value: '(Las Vegas)',
        },
        name: 'Clementine',
      },
    ];

    const result = generateTableRowData(data);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "0": Object {
          "alignment": "left",
          "value": Object {
            "age": Object {
              "formatterType": "number",
              "value": "36 yo",
            },
            "city": Object {
              "formatterType": undefined,
              "value": "(San Antonio)",
            },
            "name": "Logan",
          },
        },
        "1": Object {
          "alignment": "left",
          "value": Object {
            "age": Object {
              "formatterType": "number",
              "value": "37 yo",
            },
            "city": Object {
              "formatterType": undefined,
              "value": "(Las Vegas)",
            },
            "name": "Clementine",
          },
        },
      }
    `);
  });
});
