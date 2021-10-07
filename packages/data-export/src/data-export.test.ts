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

test('creates raw data structure for extraction analysis', () => {
  const query: Query = {
    analysis_type: 'extraction',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    property_names: ['ip_address', 'platform'],
  };

  const keys = ['ip_address', 'platform'];
  const data = [
    { ip_address: '54.254.222.167', platform: 'Mobile' },
    { ip_address: '54.254.140.167', platform: 'Desktop' },
  ];

  expect(DataExport.exportRawData({ keys, data, query }))
    .toMatchInlineSnapshot(`
    Array [
      Array [
        "ip_address",
        "platform",
      ],
      Array [
        "54.254.222.167",
        "Mobile",
      ],
      Array [
        "54.254.140.167",
        "Desktop",
      ],
    ]
  `);
});

test('creates raw data structure from collection of simple objects', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['city', 'country'],
  };

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

  expect(DataExport.exportRawData({ keys, data, query }))
    .toMatchInlineSnapshot(`
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
