import { generateHeader } from './generate-header';

describe('generateHeader()', () => {
  const data = { name: 'John', age: 31, city: 'San Antonio' };

  test('generates header with formatted "age" property', () => {
    const header = generateHeader(data);

    expect(header).toMatchInlineSnapshot(`
      Array [
        Object {
          "Header": "name",
          "accessor": "name",
          "align": "left",
        },
        Object {
          "Header": "age",
          "accessor": "age",
          "align": "right",
        },
        Object {
          "Header": "city",
          "accessor": "city",
          "align": "left",
        },
      ]
    `);
  });
});
