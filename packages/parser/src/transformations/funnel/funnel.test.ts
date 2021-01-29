import { transformFunnel } from './funnel';

const funnelAnalysis = {
  steps: [
    {
      with_actors: false,
      actor_property: 'user.uuid',
      timeframe: {
        start: '2019-03-13T00:00:00+00:00',
        end: '2019-08-14T00:00:00+00:00',
      },
      event_collection: 'pageviews',
      optional: false,
      inverted: false,
    },
    {
      with_actors: false,
      actor_property: 'user.uuid',
      timeframe: {
        start: '2019-03-13T00:00:00+00:00',
        end: '2019-08-14T00:00:00+00:00',
      },
      event_collection: 'signups',
      optional: false,
      inverted: false,
    },
    {
      with_actors: false,
      actor_property: 'user.uuid',
      timeframe: {
        start: '2019-03-13T00:00:00+00:00',
        end: '2019-08-14T00:00:00+00:00',
      },
      event_collection: 'purchases',
      optional: false,
      inverted: false,
    },
  ],
  result: [1128, 317, 89],
};

test('transform funnel results', () => {
  const result = transformFunnel(funnelAnalysis);

  expect(result).toMatchInlineSnapshot(`
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
        Object {
          "keen.key": "purchases",
          "keen.value": 89,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
