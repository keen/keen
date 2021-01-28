/* eslint-disable @typescript-eslint/naming-convention */
import { Query } from '@keen.io/query';

import { mergeParsedResults } from './merge';
import { parseQueries } from './parse-query';

import { ParserInput } from './types';

export const maximumAnalysis = {
  query: {
    analysis_type: 'maximum',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
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
        { author: 'George R. R. Martin', result: 600, name: 'Game of Thrones' },
      ],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-02-01T00:00:00.000Z',
      },
    },
    {
      value: [
        { author: 'Edwidge Danticat', result: 2, name: 'Love, Anger, Madness' },
        { author: 'George R. R. Martin', result: 11, name: 'Game of Thrones' },
      ],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ],
};

export const minimumAnalysis = {
  query: {
    analysis_type: 'minimum',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
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
          result: 7419,
          name: 'Game of Thrones',
        },
      ],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-02-01T00:00:00.000Z',
      },
    },
    {
      value: [
        {
          author: 'Edwidge Danticat',
          result: 42,
          name: 'Love, Anger, Madness',
        },
      ],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ],
};

test('should merge parsed result of two queries', () => {
  const input: ParserInput[] = [maximumAnalysis, minimumAnalysis];

  const parsedQueries = parseQueries(input);
  expect(mergeParsedResults(input, parsedQueries)).toMatchInlineSnapshot(`
    Object {
      "keys": Array [
        "0.book_purchase.maximum.Edwidge Danticat Love, Anger, Madness",
        "0.book_purchase.maximum.George R. R. Martin Game of Thrones",
        "1.book_purchase.minimum.Edwidge Danticat Love, Anger, Madness",
        "1.book_purchase.minimum.George R. R. Martin Game of Thrones",
      ],
      "results": Array [
        Object {
          "0.book_purchase.maximum.Edwidge Danticat Love, Anger, Madness": 95,
          "0.book_purchase.maximum.George R. R. Martin Game of Thrones": 600,
          "1.book_purchase.minimum.Edwidge Danticat Love, Anger, Madness": 95,
          "1.book_purchase.minimum.George R. R. Martin Game of Thrones": 7419,
          "keen.key": "2020-01-01T00:00:00.000Z",
        },
        Object {
          "0.book_purchase.maximum.Edwidge Danticat Love, Anger, Madness": 2,
          "0.book_purchase.maximum.George R. R. Martin Game of Thrones": 11,
          "1.book_purchase.minimum.Edwidge Danticat Love, Anger, Madness": 42,
          "1.book_purchase.minimum.George R. R. Martin Game of Thrones": undefined,
          "keen.key": "2020-02-01T00:00:00.000Z",
        },
      ],
    }
  `);
});
