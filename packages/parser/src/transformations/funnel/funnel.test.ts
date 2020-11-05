import { transformFunnel } from './funnel';

import { funnelAnalysis } from '../../api.fixtures';

test('transform funnel results', () => {
  const result = transformFunnel(funnelAnalysis);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "keys": Array [
        "keen.value",
      ],
      "results": Array [
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
    }
  `);
});
