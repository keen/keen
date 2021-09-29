import { Query } from '@keen.io/query';
import { ScaleSettings } from '@keen.io/charts-utils';
import { KEEN_KEY } from '@keen.io/parser';

import { transform } from './transform';

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
    transform({ query, chartSettings: { keys, data, labelSelector: KEEN_KEY } })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "value",
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

test('transforms "chronological" data structure with value formatter', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
  };

  const yScaleSettings: ScaleSettings = {
    type: 'linear',
    formatLabel: '${number}$',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': '2019-01-01T00:00:00.000Z',
      'keen.value': 50,
    },
    {
      'keen.key': '2020-01-01T00:00:00.000Z',
      'keen.value': 100,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: { keys, data, labelSelector: KEEN_KEY, yScaleSettings },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "value",
      ],
      Array [
        "2019-01-01T00:00:00.000Z",
        "50$",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "100$",
      ],
    ]
  `);
});

test('transforms "categorical" data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
    group_by: ['author', 'book'],
  };

  const data = [
    {
      'Edwidge Danticat | Love, Anger, Madness': 95,
      'George R. R. Martin | Game of Thrones': 719,
      'keen.key': '2020-01-01T00:00:00.000Z',
    },
    {
      'Edwidge Danticat | Love, Anger, Madness': 2,
      'George R. R. Martin | Game of Thrones': 11,
      'J.K. Rowling | Harry Potter': 1,
      'keen.key': '2020-02-01T00:00:00.000Z',
    },
  ];

  const keys = [
    'Edwidge Danticat | Love, Anger, Madness',
    'George R. R. Martin | Game of Thrones',
    'J.K. Rowling | Harry Potter',
  ];

  expect(
    transform({ query, chartSettings: { keys, data, labelSelector: KEEN_KEY } })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "author_book",
        "value",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "Edwidge Danticat | Love, Anger, Madness",
        95,
        "0%",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "George R. R. Martin | Game of Thrones",
        719,
        "0%",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "J.K. Rowling | Harry Potter",
        0,
        "0%",
      ],
      Array [
        "2020-02-01T00:00:00.000Z",
        "Edwidge Danticat | Love, Anger, Madness",
        2,
        "0%",
      ],
      Array [
        "2020-02-01T00:00:00.000Z",
        "George R. R. Martin | Game of Thrones",
        11,
        "0%",
      ],
      Array [
        "2020-02-01T00:00:00.000Z",
        "J.K. Rowling | Harry Potter",
        1,
        "0%",
      ],
    ]
  `);
});

test('transforms "categorical" data structure with value formatter', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
    group_by: ['author', 'book'],
  };

  const data = [
    {
      'Edwidge Danticat | Love, Anger, Madness': 95,
      'George R. R. Martin | Game of Thrones': 719,
      'keen.key': '2020-01-01T00:00:00.000Z',
    },
  ];

  const keys = [
    'Edwidge Danticat | Love, Anger, Madness',
    'George R. R. Martin | Game of Thrones',
    'J.K. Rowling | Harry Potter',
  ];

  const yScaleSettings: ScaleSettings = {
    type: 'linear',
    formatLabel: '${number} books',
  };

  expect(
    transform({
      query,
      chartSettings: { keys, data, labelSelector: KEEN_KEY, yScaleSettings },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "author_book",
        "value",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "Edwidge Danticat | Love, Anger, Madness",
        "95 books",
        "0%",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "George R. R. Martin | Game of Thrones",
        "719 books",
        "0%",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "J.K. Rowling | Harry Potter",
        0,
        "0%",
      ],
    ]
  `);
});

test('includes column with percentage value in data stack', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
    interval: 'daily',
    group_by: ['author', 'book'],
  };

  const data = [
    {
      'Edwidge Danticat | Love, Anger, Madness': 150,
      'George R. R. Martin | Game of Thrones': 50,
      'keen.key': '2020-01-01T00:00:00.000Z',
    },
  ];

  const keys = [
    'Edwidge Danticat | Love, Anger, Madness',
    'George R. R. Martin | Game of Thrones',
    'J.K. Rowling | Harry Potter',
  ];

  expect(
    transform({
      query,
      chartSettings: {
        keys,
        data,
        labelSelector: KEEN_KEY,
        stackMode: 'percent',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "interval",
        "author_book",
        "value",
        "percentage value",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "Edwidge Danticat | Love, Anger, Madness",
        150,
        "75%",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "George R. R. Martin | Game of Thrones",
        50,
        "25%",
      ],
      Array [
        "2020-01-01T00:00:00.000Z",
        "J.K. Rowling | Harry Potter",
        0,
        "0%",
      ],
    ]
  `);
});
