import { Query } from '@keen.io/query';

import { transform } from './transform';

test('transforms normal progress type of data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': 'Result',
      'keen.value': 100,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: {
        valueKey: '',
        keys,
        data,
        formatValue: '${number}$',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "minimal value",
        "target value",
        "value",
      ],
      Array [
        "",
        "",
        "100$",
      ],
    ]
  `);
});

test('transforms percentage progress type of data structure', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    timeframe: 'last_14_days',
  };

  const keys = ['keen.value'];
  const data = [
    {
      'keen.key': 'Result',
      'keen.value': 100,
    },
  ];

  expect(
    transform({
      query,
      chartSettings: {
        valueKey: 'keen.value',
        keys,
        data,
        progressType: 'percent',
        minValue: 0,
        maxValue: 200,
        formatValue: '${number}$',
      },
    })
  ).toMatchInlineSnapshot(`
    Array [
      Array [
        "minimal value",
        "target value",
        "value",
        "percentage value",
      ],
      Array [
        0,
        200,
        "100$",
        "50%",
      ],
    ]
  `);
});
