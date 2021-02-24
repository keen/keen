import { Query } from '@keen.io/query';

import { parseQuery } from '../parse-query';

test('creates structure for simple "count" analysis', () => {
  const countAnalysis = {
    query: {
      analysis_type: 'count',
      event_collection: 'logins',
      timeframe: 'last_14_days',
    } as Query,
    result: 250,
  };

  expect(parseQuery(countAnalysis)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "Result",
          "keen.value": 250,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('creates structure for "count" analysis with interval', () => {
  const countAnalysis = {
    query: {
      analysis_type: 'count',
      event_collection: 'book_purchase',
      timeframe: 'this_2_days',
      interval: 'daily',
      timezone: 3600,
    } as Query,
    result: [
      {
        value: 436,
        timeframe: {
          start: '2019-11-01T00:00:00.000Z',
          end: '2019-12-01T00:00:00.000Z',
        },
      },
      {
        value: 59,
        timeframe: {
          start: '2020-02-01T00:00:00.000Z',
          end: '2020-02-01T16:00:00.000Z',
        },
      },
    ],
  };

  expect(parseQuery(countAnalysis)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2019-11-01T00:00:00.000Z",
          "keen.value": 436,
        },
        Object {
          "keen.key": "2020-02-01T00:00:00.000Z",
          "keen.value": 59,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('creates structure for "count" analysis with multiple group settings and interval', () => {
  const countAnalysis = {
    query: {
      analysis_type: 'count',
      event_collection: 'book_purchase',
      timeframe: 'last_3_months',
      interval: 'monthly',
      group_by: ['author', 'name'],
    } as Query,
    result: [
      {
        value: [
          {
            author: 'Edwidge Danticat',
            result: 95,
            name: 'Love, Anger, Madness',
          },
          {
            author: 'George R. R. Martin',
            result: 719,
            name: 'Game of Thrones',
          },
          { author: 'J.K. Rowling', result: 112, name: 'Harry Potter' },
        ],
        timeframe: {
          start: '2020-01-01T00:00:00.000Z',
          end: '2020-02-01T00:00:00.000Z',
        },
      },
      {
        value: [
          { author: 'J.K. Rowling', result: 1, name: 'Harry Potter' },
          { author: 'Stephen King', result: 45, name: 'It' },
          { author: 'Stephen King', result: 0, name: 'The Shining' },
        ],
        timeframe: {
          start: '2020-02-01T00:00:00.000Z',
          end: '2020-02-01T16:00:00.000Z',
        },
      },
    ],
  };

  expect(parseQuery(countAnalysis)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "Edwidge Danticat | Love, Anger, Madness": 95,
          "George R. R. Martin | Game of Thrones": 719,
          "J.K. Rowling | Harry Potter": 112,
          "keen.key": "2020-01-01T00:00:00.000Z",
        },
        Object {
          "J.K. Rowling | Harry Potter": 1,
          "Stephen King | It": 45,
          "Stephen King | The Shining": 0,
          "keen.key": "2020-02-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "Edwidge Danticat | Love, Anger, Madness",
        "George R. R. Martin | Game of Thrones",
        "J.K. Rowling | Harry Potter",
        "Stephen King | It",
        "Stephen King | The Shining",
      ],
    }
  `);
});

test('creates structure for "count" analysis with multiple group settings', () => {
  const countAnalysis = {
    query: {
      analysis_type: 'count',
      event_collection: 'book_purchase',
      timeframe: 'this_14_days',
      group_by: ['name', 'author'],
    } as Query,
    result: [
      { result: 97, name: 'Love, Anger, Madness', author: 'Edwidge Danticat' },
      { result: 113, name: 'Harry Potter', author: 'J.K. Rowling' },
      { result: 2104, name: 'It', author: 'Stephen King' },
      { result: 6, name: 'The Shining', author: 'Stephen King' },
    ],
  };

  expect(parseQuery(countAnalysis)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "Love, Anger, Madness | Edwidge Danticat",
          "keen.value": 97,
        },
        Object {
          "keen.key": "Harry Potter | J.K. Rowling",
          "keen.value": 113,
        },
        Object {
          "keen.key": "It | Stephen King",
          "keen.value": 2104,
        },
        Object {
          "keen.key": "The Shining | Stephen King",
          "keen.value": 6,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
