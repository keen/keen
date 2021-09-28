import { Query } from '@keen.io/query';

import { transform } from './transform';

test('transforms data structure for simple analysis with group by', () => {
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

  expect(transform({ query, chartSettings: { data } })).toMatchInlineSnapshot(`
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

test('transforms data structure with columns rename and analysis with interval', () => {
  const data = [
    {
      'count.page_views': 100,
      interval: '2019-01-01T00:00:00.000Z',
    },
    {
      'count.page_views': 300,
      interval: '2020-01-01T00:00:00.000Z',
    },
  ];

  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
  };

  const columnsNamesMapping = {
    interval: 'time',
  };

  expect(transform({ query, chartSettings: { data, columnsNamesMapping } }))
    .toMatchInlineSnapshot(`
    Array [
      Array [
        "time",
        "count.page_views",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        100,
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        300,
      ],
    ]
  `);
});

test('transforms data structure with columns formatters and analysis with interval', () => {
  const data = [
    {
      'count.page_views': 100,
      interval: '2019-01-01T00:00:00.000Z',
    },
    {
      'count.page_views': 300,
      interval: '2020-01-01T00:00:00.000Z',
    },
  ];

  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
  };

  const formatValue = {
    'count.page_views': '${number}$',
  };

  const columnsNamesMapping = {
    'count.page_views': 'pageviews',
  };

  expect(
    transform({
      query,
      chartSettings: { data, columnsNamesMapping, formatValue },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "pageviews",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "100$",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "300$",
      ],
    ]
  `);
});
