import { sortData } from './data.utils';

describe('sortData()', () => {
  const data = [
    { name: 'John', age: 31 },
    { name: 'Clementine', age: 22 },
    { name: 'Andrew', age: 26 },
  ];

  test('sort data series ascending by name', () => {
    const result = sortData(data, { property: 'name', sort: 'ascending' });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 26,
          "name": "Andrew",
        },
        Object {
          "age": 22,
          "name": "Clementine",
        },
        Object {
          "age": 31,
          "name": "John",
        },
      ]
    `);
  });

  test('sort data series descending by age', () => {
    const result = sortData(data, { property: 'age', sort: 'descending' });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 31,
          "name": "John",
        },
        Object {
          "age": 26,
          "name": "Andrew",
        },
        Object {
          "age": 22,
          "name": "Clementine",
        },
      ]
    `);
  });
});
