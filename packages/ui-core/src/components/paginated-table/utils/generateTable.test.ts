import { generateTable } from './generateTable';

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
          "age": Object {
            "formatterType": undefined,
            "value": 31,
          },
          "city": Object {
            "formatterType": undefined,
            "value": "(San Antonio)",
          },
          "name": Object {
            "formatterType": undefined,
            "value": "Logan",
          },
        },
        Object {
          "age": Object {
            "formatterType": undefined,
            "value": 22,
          },
          "city": Object {
            "formatterType": undefined,
            "value": "(Las Vegas)",
          },
          "name": Object {
            "formatterType": undefined,
            "value": "Clementine",
          },
        },
      ]
    `);
  });

  test('generates table and applies formatter for "age" property', () => {
    const format = { age: '${number; 0; add; 5} yo' };
    const header = generateTable(data, format);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": Object {
            "formatterType": "number",
            "value": "36 yo",
          },
          "city": Object {
            "formatterType": undefined,
            "value": "San Antonio",
          },
          "name": Object {
            "formatterType": undefined,
            "value": "Logan",
          },
        },
        Object {
          "age": Object {
            "formatterType": "number",
            "value": "27 yo",
          },
          "city": Object {
            "formatterType": undefined,
            "value": "Las Vegas",
          },
          "name": Object {
            "formatterType": undefined,
            "value": "Clementine",
          },
        },
      ]
    `);
  });
});
