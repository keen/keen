import { sortData } from './sort-data';

describe('sortData()', () => {
  const data = [
    { name: 'John', age: 31 },
    { name: 'Clementine', age: 22 },
    { name: 'Andrew', age: 26 },
    { name: 'Al', age: 1 },
    { name: 'Bobby', age: 12 },
    { name: 'Ben', age: 2 },
  ];

  test('sort data series ascending by name', () => {
    const result = sortData(
      data,
      { property: 'name', sort: 'ascending' },
      null
    );

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 1,
          "name": "Al",
        },
        Object {
          "age": 26,
          "name": "Andrew",
        },
        Object {
          "age": 2,
          "name": "Ben",
        },
        Object {
          "age": 12,
          "name": "Bobby",
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

  test('sort data series descending by age when "number" formatter applied', () => {
    const result = sortData(
      data,
      { property: 'age', sort: 'descending' },
      { age: '${number}' }
    );

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
        Object {
          "age": 12,
          "name": "Bobby",
        },
        Object {
          "age": 2,
          "name": "Ben",
        },
        Object {
          "age": 1,
          "name": "Al",
        },
      ]
    `);
  });

  test('sort data series ascending by age when "string" formatter applied', () => {
    const result = sortData(
      data,
      { property: 'age', sort: 'ascending' },
      { age: '${string}' }
    );

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 1,
          "name": "Al",
        },
        Object {
          "age": 12,
          "name": "Bobby",
        },
        Object {
          "age": 2,
          "name": "Ben",
        },
        Object {
          "age": 22,
          "name": "Clementine",
        },
        Object {
          "age": 26,
          "name": "Andrew",
        },
        Object {
          "age": 31,
          "name": "John",
        },
      ]
    `);
  });
});
