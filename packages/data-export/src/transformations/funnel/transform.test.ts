import { Query } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { transform } from './transform';

const data = [
  {
    'keen.key': 'pageviews',
    'keen.value': 1000,
  },
  {
    'keen.key': 'signups',
    'keen.value': 500,
  },
  {
    'keen.key': 'purchases',
    'keen.value': 100,
  },
];

const query = {
  analysis_type: 'funnel',
} as Query;

test('transforms data structure for CSV export', () => {
  expect(transform({ query, chartSettings: { data, labelSelector: KEEN_KEY } }))
    .toMatchInlineSnapshot(`
    Array [
      Array [
        "step",
        "value",
        "percentage value",
      ],
      Array [
        "pageviews",
        1000,
        "100%",
      ],
      Array [
        "signups",
        500,
        "50%",
      ],
      Array [
        "purchases",
        100,
        "20%",
      ],
    ]
  `);
});

test('transforms data structure for CSV export with steps labels', () => {
  const stepLabels = ['Visitors', 'Created Accounts'];

  expect(
    transform({
      query,
      chartSettings: { data, labelSelector: KEEN_KEY, stepLabels },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "step",
        "value",
        "percentage value",
      ],
      Array [
        "Visitors",
        1000,
        "100%",
      ],
      Array [
        "Created Accounts",
        500,
        "50%",
      ],
      Array [
        "purchases",
        100,
        "20%",
      ],
    ]
  `);
});

test('transforms data structure for CSV export with value formatter', () => {
  const formatValues = '${number} users';

  expect(
    transform({
      query,
      chartSettings: { data, labelSelector: KEEN_KEY, formatValues },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "step",
        "value",
        "percentage value",
      ],
      Array [
        "pageviews",
        "1,000 users",
        "100%",
      ],
      Array [
        "signups",
        "500 users",
        "50%",
      ],
      Array [
        "purchases",
        "100 users",
        "20%",
      ],
    ]
  `);
});
