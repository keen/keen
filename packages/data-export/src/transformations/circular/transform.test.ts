import { Query } from '@keen.io/query';

import { transform } from './transform';

const keys = ['keen.value'];
const query: Query = {
  analysis_type: 'count',
  event_collection: 'purchases',
  timeframe: 'last_14_days',
  group_by: ['author', 'book'],
};

const data = [
  {
    'keen.key': 'Edwidge Danticat | Love, Anger, Madness',
    'keen.value': 97,
  },
  {
    'keen.key': 'George R. R. Martin | Game of Thrones',
    'keen.value': 730,
  },
  {
    'keen.key': 'Stephen King | The Shining',
    'keen.value': 6,
  },
];

test('transforms data structure for CSV export', () => {
  expect(transform({ query, chartSettings: { data, keys } }))
    .toMatchInlineSnapshot(`
    Array [
      Array [
        "author_book",
        "value",
        "percentage value",
      ],
      Array [
        "Edwidge Danticat | Love, Anger, Madness",
        97,
        "11.6%",
      ],
      Array [
        "George R. R. Martin | Game of Thrones",
        730,
        "87.6%",
      ],
      Array [
        "Stephen King | The Shining",
        6,
        "0.7%",
      ],
    ]
  `);
});

test('applies data formatting', () => {
  expect(
    transform({
      query,
      chartSettings: {
        data,
        keys,
        tooltipSettings: {
          formatValue: '${string} books',
        },
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "author_book",
        "value",
        "percentage value",
      ],
      Array [
        "Edwidge Danticat | Love, Anger, Madness",
        "97 books",
        "11.6%",
      ],
      Array [
        "George R. R. Martin | Game of Thrones",
        "730 books",
        "87.6%",
      ],
      Array [
        "Stephen King | The Shining",
        "6 books",
        "0.7%",
      ],
    ]
  `);
});
