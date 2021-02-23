import { Query } from '@keen.io/query';

import { transformCategorical } from './categorical';

import { ParserSettings } from '../../types';

test('transform categorical results', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'book_purchase',
    timeframe: 'this_14_days',
    group_by: ['name', 'author'],
  };

  const result = [
    { result: 97, name: 'Love, Anger, Madness', author: 'Edwidge Danticat' },
    { result: 730, name: 'Game of Thrones', author: 'George R. R. Martin' },
    { result: 6, name: 'The Shining', author: 'Stephen King' },
  ];

  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: ['author', 'name'],
    transformation: 'categorical',
  };

  expect(transformCategorical({ query, result }, parserSettings))
    .toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "Edwidge Danticat | Love, Anger, Madness",
          "keen.value": 97,
        },
        Object {
          "keen.key": "George R. R. Martin | Game of Thrones",
          "keen.value": 730,
        },
        Object {
          "keen.key": "Stephen King | The Shining",
          "keen.value": 6,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
