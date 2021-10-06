import { Query } from '@keen.io/query';

import DataExport from './data-export';

test('creates CSV file strucutre', () => {
  const data = [
    ['keen.key', 'Japan', 'Australia'],
    ['2020-12-07T00:00:00.000Z', 14, 0],
  ];

  expect(DataExport.exportToCSV({ data })).toMatchInlineSnapshot(`
    "keen.key,Japan,Australia
    2020-12-07T00:00:00.000Z,14,0
    "
  `);
});

test('creates CSV file strucutre with "null" values', () => {
  const data = [
    ['keen.key', 'Japan', 'Australia'],
    ['2020-12-07T00:00:00.000Z', 14, null],
  ];

  expect(DataExport.exportToCSV({ data })).toMatchInlineSnapshot(`
    "keen.key,Japan,Australia
    2020-12-07T00:00:00.000Z,14,null
    "
  `);
});

test('creates CSV file strucutre with defined column delimeter', () => {
  const data = [
    ['keen.key', 'Japan', 'Australia'],
    ['2020-12-07T00:00:00.000Z', 14, 0],
  ];

  expect(DataExport.exportToCSV({ data, columnDelimiter: '|' }))
    .toMatchInlineSnapshot(`
    "keen.key|Japan|Australia
    2020-12-07T00:00:00.000Z|14|0
    "
  `);
});

test('creates raw data structure from collection of simple objects', () => {
  const keys = ['Japan', 'Australia'];
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

  expect(DataExport.exportRawData({ keys, data })).toMatchInlineSnapshot(`
    Array [
      Array [
        "keen.key",
        "Japan",
        "Australia",
      ],
      Array [
        "2020-12-07T00:00:00.000Z",
        14,
        0,
      ],
      Array [
        "2020-12-08T00:00:00.000Z",
        0,
        29,
      ],
    ]
  `);
});

test('creates data structure with visualization context', () => {
  const data = [
    { country: 'Poland', city: 'Cracow', result: 20 },
    { country: 'USA', city: 'New York', result: 32 },
    { country: 'Germany', city: 'Berlin', result: 42 },
  ];

  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['city', 'country'],
  };

  expect(
    DataExport.exportVisualizationData({
      widgetType: 'table',
      query,
      chartSettings: { data },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "city",
        "country",
        "result",
      ],
      Array [
        "Cracow",
        "Poland",
        20,
      ],
      Array [
        "New York",
        "USA",
        32,
      ],
      Array [
        "Berlin",
        "Germany",
        42,
      ],
    ]
  `);
});
