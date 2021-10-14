import { Query } from '@keen.io/query';

import { transform } from './transform';

test('transforms data structure with respection to columns order', () => {
  const query: Query = {
    analysis_type: 'extraction',
    event_collection: 'purchases',
    timeframe: 'this_14_days',
    property_names: ['keen.id', 'geo_information.city', 'user.age'],
  };

  const data = [
    {
      'keen.id': '5de63660015e540001f3a904',
      'user.age': 32,
      'geo_information.city': 'Singapore',
    },
  ];

  expect(transform({ query, chartSettings: { data } })).toMatchInlineSnapshot(`
    Array [
      Array [
        "keen.id",
        "geo_information.city",
        "user.age",
      ],
      Array [
        "5de63660015e540001f3a904",
        "Singapore",
        32,
      ],
    ]
  `);
});

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
        "count.page_views",
        "time",
      ],
      Array [
        100,
        "2019-01-01T00:00:00.000Z",
      ],
      Array [
        300,
        "2020-01-01T00:00:00.000Z",
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
        "pageviews",
        "interval",
      ],
      Array [
        "100$",
        "2019-01-01T00:00:00.000Z",
      ],
      Array [
        "300$",
        "2020-01-01T00:00:00.000Z",
      ],
    ]
  `);
});
