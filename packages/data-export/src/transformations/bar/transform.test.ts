import { Query } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { transform } from './transform';

test('transforms data to CSV export structure without query context', () => {
  const keys = ['keen.value'];
  const data = [
    { 'keen.key': 'logins', 'keen.value': 1082 },
    { 'keen.key': 'mrr', 'keen.value': 400 },
  ];

  expect(
    transform({
      query: undefined,
      chartSettings: { data, keys, labelSelector: KEEN_KEY },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "logins",
        1082,
      ],
      Array [
        "mrr",
        400,
      ],
    ]
  `);
});

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

test('transforms "categorical" data with percentage stack to CSV export structure', () => {
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
  ];

  expect(
    transform({
      query,
      chartSettings: {
        data,
        keys,
        labelSelector: KEEN_KEY,
        stackMode: 'percent',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "platform",
        "user.gender",
        "value",
        "percentage value",
      ],
      Array [
        "Mobile",
        "female",
        1646,
        "35.8%",
      ],
      Array [
        "Mobile",
        "male",
        2332,
        "50.7%",
      ],
      Array [
        "Mobile",
        "other",
        624,
        "13.6%",
      ],
    ]
  `);
});

test('transforms "categorical" data with single group by to CSV export structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    group_by: ['platform'],
  };

  const keys = ['Mobile', 'Web'];
  const data = [{ Mobile: 4602, Web: 995, 'keen.key': 'platform' }];

  expect(
    transform({ query, chartSettings: { data, keys, labelSelector: KEEN_KEY } })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "platform",
        "value",
      ],
      Array [
        "Mobile",
        4602,
      ],
      Array [
        "Web",
        995,
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
    transform({
      query,
      chartSettings: {
        data,
        keys,
        labelSelector: KEEN_KEY,
        stackMode: 'percent',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "platform_user.gender",
        "value",
        "percentage value",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Mobile | female",
        1646,
        "29.4%",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Mobile | male",
        2332,
        "41.7%",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Mobile | other",
        624,
        "11.1%",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Web | female",
        363,
        "6.5%",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Web | male",
        529,
        "9.5%",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "Web | other",
        103,
        "1.8%",
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
