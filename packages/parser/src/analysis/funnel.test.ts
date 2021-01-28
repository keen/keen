import { Step } from '@keen.io/query';

import { parseQuery } from '../parse-query';

test('creates structure for "funnel" analysis', () => {
  const funnelAnalysis = {
    steps: [
      {
        actor_property: 'id',
        timeframe: 'last_14_days',
        event_collection: 'pageviews',
      },
      {
        actor_property: 'id',
        timeframe: 'last_14_days',
        event_collection: 'signups',
      },
    ] as Step[],
    result: [1128, 317],
  };

  expect(parseQuery(funnelAnalysis)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "pageviews",
          "keen.value": 1128,
        },
        Object {
          "keen.key": "signups",
          "keen.value": 317,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
