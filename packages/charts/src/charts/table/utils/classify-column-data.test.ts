import { classifyColumnData } from './classify-column-data';

test('classifies column data type as "string"', () => {
  const records = [
    {
      country: 'China',
    },
    {
      country: 'United States',
    },
    {
      country: null,
    },
  ];

  expect(classifyColumnData('country', records)).toEqual('string');
});

test('classifies column with ISO string date as "datetime"', () => {
  const records = [
    {
      createdAt: '2021-03-02T12:00:00Z',
    },
    {
      createdAt: '2021-03-02T12:00:00Z',
    },
    {
      createdAt: null,
    },
  ];

  expect(classifyColumnData('createdAt', records)).toEqual('datetime');
});

test('classifies column with partial date string pattern as "datetime"', () => {
  const records = [
    {
      createdAt: '2021-03',
    },
    {
      createdAt: '2021-02',
    },
    {
      createdAt: null,
    },
  ];

  expect(classifyColumnData('createdAt', records)).toEqual('datetime');
});

test('classifies column data type as "null"', () => {
  const records = [
    {
      city: null,
    },
    {
      city: null,
    },
  ];

  expect(classifyColumnData('city', records)).toEqual(null);
});

test('classifies column data type as "boolean"', () => {
  const records = [
    {
      active: false,
    },
    {
      active: true,
    },
  ];

  expect(classifyColumnData('active', records)).toEqual('boolean');
});

test('classifies column data type as "number"', () => {
  const records = [
    {
      age: 60,
    },
    {
      age: null,
    },
    {
      age: null,
    },
  ];

  expect(classifyColumnData('age', records)).toEqual('number');
});
