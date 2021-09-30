import { Query } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { transform } from './transform';

test('transforms "categorical" data to CSV export structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['platform', 'user.gender'],
  };

  const keys = ['female', 'male', 'other'];
  const data = [
    {
      female: 1646,
      'keen.key': 'Mobile',
      male: 2332,
      other: 624,
    },
    {
      female: 100,
      'keen.key': 'Desktop',
      male: 200,
      other: 300,
    },
  ];

  expect(
    transform({ query, chartSettings: { data, keys, labelSelector: KEEN_KEY } })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "platform",
        "user.gender",
        "value",
      ],
      Array [
        "Mobile",
        "female",
        1646,
      ],
      Array [
        "Mobile",
        "male",
        2332,
      ],
      Array [
        "Mobile",
        "other",
        624,
      ],
      Array [
        "Desktop",
        "female",
        100,
      ],
      Array [
        "Desktop",
        "male",
        200,
      ],
      Array [
        "Desktop",
        "other",
        300,
      ],
    ]
  `);
});

test('transforms "categorical" data with formatter to CSV export structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['platform', 'user.gender'],
  };

  const keys = ['female', 'male'];
  const data = [
    {
      female: 1646,
      'keen.key': 'Mobile',
      male: 2332,
    },
    {
      female: 100,
      'keen.key': 'Desktop',
      male: 200,
    },
  ];

  const tooltipSettings = {
    formatValue: '${number} users',
  };

  expect(
    transform({
      query,
      chartSettings: { data, keys, tooltipSettings, labelSelector: KEEN_KEY },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "platform",
        "user.gender",
        "value",
      ],
      Array [
        "Mobile",
        "female",
        "1,646 users",
      ],
      Array [
        "Mobile",
        "male",
        "2,332 users",
      ],
      Array [
        "Desktop",
        "female",
        "100 users",
      ],
      Array [
        "Desktop",
        "male",
        "200 users",
      ],
    ]
  `);
});

test('transforms "chronological" data with categories to CSV export structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['platform', 'user.gender'],
    interval: 'yearly',
  };

  const keys = [
    'Mobile | female',
    'Mobile | male',
    'Mobile | other',
    'Web | female',
    'Web | male',
    'Web | other',
  ];
  const data = [
    {
      'Mobile | female': 1646,
      'Mobile | male': 2332,
      'Mobile | other': 624,
      'Web | female': 363,
      'Web | male': 529,
      'Web | other': 103,
      'keen.key': '2019-01-01T00:00:00.000Z',
    },
  ];

  expect(
    transform({ query, chartSettings: { data, keys, labelSelector: KEEN_KEY } })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "platform_user.gender",
        "value",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Mobile | female",
        1646,
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Mobile | male",
        2332,
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Mobile | other",
        624,
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Web | female",
        363,
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Web | male",
        529,
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Web | other",
        103,
      ],
    ]
  `);
});

test('transforms "chronological" data to CSV export structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'yearly',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.value': 1646,
      'keen.key': '2019-01-01T00:00:00.000Z',
    },
    {
      'keen.value': 100,
      'keen.key': '2020-01-01T00:00:00.000Z',
    },
  ];

  expect(
    transform({ query, chartSettings: { data, keys, labelSelector: KEEN_KEY } })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "value",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        1646,
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        100,
      ],
    ]
  `);
});
