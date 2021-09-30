import { Query } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { transform } from './transform';

test('transforms data structure with single group by', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['coutry'],
  };

  const data = [
    {
      'keen.key': 'USA',
      'keen.value': 100,
    },
    {
      'keen.key': 'Poland',
      'keen.value': 200,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: {
        geoKey: '@geo-key',
        labelSelector: KEEN_KEY,
        data,
        tooltipSettings: {
          formatValue: '${number}$',
        },
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "coutry",
        "value",
      ],
      Array [
        "USA",
        "100$",
      ],
      Array [
        "Poland",
        "200$",
      ],
    ]
  `);
});

test('transforms multi dimensional data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['coutry', 'platform'],
  };

  const data = [
    {
      'keen.elements': { Mobile: 1, Web: 6 },
      'keen.key': 'Algeria',
      'keen.value': 7,
    },
    {
      'keen.elements': { Mobile: 10, Web: 20 },
      'keen.key': 'Ukraine',
      'keen.value': 30,
    },
  ];
  expect(
    transform({
      query,
      chartSettings: {
        geoKey: '@geo-key',
        labelSelector: KEEN_KEY,
        data,
        tooltipSettings: {
          formatValue: '${number}$',
        },
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "coutry",
        "platform",
        "value",
      ],
      Array [
        "Algeria",
        "Mobile",
        "1$",
      ],
      Array [
        "Algeria",
        "Web",
        "6$",
      ],
      Array [
        "Ukraine",
        "Mobile",
        "10$",
      ],
      Array [
        "Ukraine",
        "Web",
        "20$",
      ],
    ]
  `);
});
