import { exportToCSV } from './export-to-csv';

test('creates CSV structure from collection of simple objects', () => {
  const data = [
    {
      Australia: 0,
      Japan: 14,
      'keen.key': '2020-12-07T00:00:00.000Z',
    },
    {
      Australia: 29,
      Japan: 0,
      'keen.key': '2020-12-08T00:00:00.000Z',
    },
  ];

  expect(exportToCSV({ data })).toMatchInlineSnapshot(`
    "Australia,Japan,keen.key
    0,14,2020-12-07T00:00:00.000Z
    29,0,2020-12-08T00:00:00.000Z
    "
  `);
});

test('creates CSV structure with respected rows limit', () => {
  const data = [
    {
      Australia: 0,
      Japan: 14,
      'keen.key': '2020-12-07T00:00:00.000Z',
    },
    {
      Australia: 29,
      Japan: 0,
      'keen.key': '2020-12-08T00:00:00.000Z',
    },
  ];

  expect(exportToCSV({ data, rowsLimit: 1 })).toMatchInlineSnapshot(`
    "Australia,Japan,keen.key
    0,14,2020-12-07T00:00:00.000Z
    "
  `);
});

// @TODO : Fix this transform with ,
test('creates CSV structure from "object" with nested collections', () => {
  const data = [
    {
      'keen.key': '2019-01-01T00:00:00.000Z',
      'keen.value': [],
    },
    {
      'keen.key': '2020-01-01T00:00:00.000Z',
      'keen.value': ['Dr.', 'Miss', 'Mr.'],
    },
  ];

  expect(exportToCSV({ data })).toMatchInlineSnapshot(`
    "keen.key,keen.value
    2019-01-01T00:00:00.000Z,\\"\\"
    2020-01-01T00:00:00.000Z,\\"Dr., Miss, Mr.\\"
    "
  `);
});

test('allows to specify column delimeter', () => {
  const data = [
    {
      Canada: 100,
      Japan: 14,
    },
    {
      Canada: 29,
      Japan: 0,
    },
  ];

  expect(exportToCSV({ data, columnDelimiter: '|' })).toMatchInlineSnapshot(`
    "Canada|Japan
    100|14
    29|0
    "
  `);
});
