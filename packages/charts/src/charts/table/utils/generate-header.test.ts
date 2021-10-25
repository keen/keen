import { generateHeader } from './generate-header';

describe('generateHeader()', () => {
  const data = { name: 'John', age: 31, city: 'San Antonio' };

  test('generates header with formatted "age" property', () => {
    const header = generateHeader(data);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "Header": "name",
          "accessor": [Function],
          "align": "left",
        },
        Object {
          "Header": "age",
          "accessor": [Function],
          "align": "left",
        },
        Object {
          "Header": "city",
          "accessor": [Function],
          "align": "left",
        },
      ]
    `);
  });
});
