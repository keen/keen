import { generateHeader } from './generate-header';

describe('generateHeader()', () => {
  const data = { name: 'John', age: 31, city: 'San Antonio' };

  test('generates header with formatted "age" property', () => {
    const header = generateHeader(data);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "Cell": [Function],
          "Header": [Function],
          "id": "selection",
          "type": "row-selection",
        },
        Object {
          "Cell": [Function],
          "Header": [Function],
          "accessor": [Function],
          "align": "left",
          "id": "name",
          "type": "value",
        },
        Object {
          "Cell": [Function],
          "Header": [Function],
          "accessor": [Function],
          "align": "left",
          "id": "age",
          "type": "value",
        },
        Object {
          "Cell": [Function],
          "Header": [Function],
          "accessor": [Function],
          "align": "left",
          "id": "city",
          "type": "value",
        },
      ]
    `);
  });
});
