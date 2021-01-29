import { Query } from '@keen.io/query';

import { parseQuery } from '../parse-query';

test('create structure for "count_unique" and fills empty intervals', () => {
  const countUnique = {
    query: {
      analysis_type: 'count_unique',
      event_collection: 'logins',
      target_property: 'id',
      group_by: ['country'],
      limit: 2,
      interval: 'daily',
      timeframe: 'this_5_days',
      order_by: [{ direction: 'DESC', property_name: 'result' }],
    } as Query,
    result: [
      {
        value: [
          { 'geo.country': 'United States', result: 24 },
          { 'geo.country': 'Japan', result: 14 },
        ],
        timeframe: {
          start: '2020-12-07T00:00:00.000Z',
          end: '2020-12-08T00:00:00.000Z',
        },
      },
      {
        value: [
          { 'geo.country': 'United States', result: 38 },
          { 'geo.country': 'Australia', result: 29 },
        ],
        timeframe: {
          start: '2020-12-08T00:00:00.000Z',
          end: '2020-12-09T00:00:00.000Z',
        },
      },
      {
        value: [
          { 'geo.country': 'United States', result: 42 },
          { 'geo.country': 'Ukraine', result: 29 },
        ],
        timeframe: {
          start: '2020-12-10T00:00:00.000Z',
          end: '2020-12-11T00:00:00.000Z',
        },
      },
    ],
  };

  expect(parseQuery(countUnique)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "Australia": 0,
          "Japan": 14,
          "Ukraine": 0,
          "United States": 24,
          "keen.key": "2020-12-07T00:00:00.000Z",
        },
        Object {
          "Australia": 29,
          "Japan": 0,
          "Ukraine": 0,
          "United States": 38,
          "keen.key": "2020-12-08T00:00:00.000Z",
        },
        Object {
          "Australia": 0,
          "Japan": 0,
          "Ukraine": 29,
          "United States": 42,
          "keen.key": "2020-12-10T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "United States",
        "Japan",
        "Australia",
        "Ukraine",
      ],
    }
  `);
});
