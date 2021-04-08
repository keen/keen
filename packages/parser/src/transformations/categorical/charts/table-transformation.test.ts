import { tableChartTransformation } from './table-transformation';

test('transforms data and generates corresponding keys', () => {
  const input = [
    { country: 'Poland', result: 20 },
    { country: 'USA', result: 32 },
    { country: 'Germany', result: 42 },
  ];

  const expectedResult = {
    data: [
      {
        country: 'Poland',
        result: 20,
      },
      {
        country: 'USA',
        result: 32,
      },
      {
        country: 'Germany',
        result: 42,
      },
    ],
    keys: ['country', 'result'],
  };

  expect(tableChartTransformation(input)).toMatchObject(expectedResult);
});

test('transforms data and fill records with missing keys', () => {
  const input = [
    { country: 'Poland', company: 'Keen.io', result: 20 },
    { country: 'USA', result: 32 },
    { country: 'Germany', result: 100 },
  ];

  const expectedResult = {
    data: [
      {
        country: 'Poland',
        company: 'Keen.io',
        result: 20,
      },
      {
        country: 'USA',
        company: '',
        result: 32,
      },
      {
        country: 'Germany',
        company: '',
        result: 100,
      },
    ],
    keys: ['country', 'company', 'result'],
  };

  expect(tableChartTransformation(input)).toMatchObject(expectedResult);
});

test('all keys should be strings', () => {
  const input = [
    { 200: 'Poland', 300: 'Keen.io', 400: 20 },
    { 200: 'USA', 400: 32 },
    { 200: 'Germany', 400: 100 },
  ];

  const keys = tableChartTransformation(input).keys;

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
});
