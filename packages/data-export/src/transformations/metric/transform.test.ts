import { Query } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { transform } from './transform';

test('transforms simple data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': '2019-01-01T00:00:00.000Z',
      'keen.value': 100,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: {
        keys,
        data,
        labelSelector: KEEN_KEY,
        formatValue: '${number}$',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "count.purchases",
      ],
      Array [
        "100$",
      ],
    ]
  `);
});

test('transforms "chronological" data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': '2019-01-01T00:00:00.000Z',
      'keen.value': 100,
    },
    {
      'keen.key': '2020-01-01T00:00:00.000Z',
      'keen.value': 300,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: { keys, data, labelSelector: KEEN_KEY, type: 'simple' },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "count.purchases",
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

test('includes difference column for "chronological" data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': '2019-01-01T00:00:00.000Z',
      'keen.value': 200,
    },
    {
      'keen.key': '2020-01-01T00:00:00.000Z',
      'keen.value': 300,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: {
        keys,
        data,
        labelSelector: KEEN_KEY,
        type: 'difference',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "count.purchases",
        "difference",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        200,
        0,
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        300,
        100,
      ],
    ]
  `);
});
