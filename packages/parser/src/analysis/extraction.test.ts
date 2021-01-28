import { Query } from '@keen.io/query';

import { parseQuery } from '../parse-query';

test('creates structure for "extraction" analysis', () => {
  const extractionAnalysis = {
    query: {
      analysis_type: 'extraction',
      event_collection: 'user_action',
      timeframe: 'last_14_days',
    } as Query,
    result: [
      { keen: { id: '@event/01' }, user: { name: 'John' } },
      { keen: { id: '@event/02' }, product: { category: 'books' } },
    ],
  };

  expect(parseQuery(extractionAnalysis)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.id": "@event/01",
          "product.category": "",
          "user.name": "John",
        },
        Object {
          "keen.id": "@event/02",
          "product.category": "books",
          "user.name": "",
        },
      ],
      "keys": Array [
        "keen.id",
        "user.name",
        "product.category",
      ],
    }
  `);
});
