import { tableChartTransformation } from './table-transformation';
import { IntervalResult } from '../../../types';

test('transform categorical results in chronological order for table', () => {
  const result: IntervalResult[] = [
    {
      value: [
        {
          author: 'Edwidge Danticat',
          result: 95,
          name: 'Love, Anger, Madness',
        },
        { author: 'George R. R. Martin', result: 719, name: 'Game of Thrones' },
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
        { author: 'J.K. Rowling', result: 1, name: 'Harry Potter' },
      ],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ];

  expect(
    tableChartTransformation(
      {
        query: {
          event_collection: 'page_views',
          analysis_type: 'count',
        },
        result,
      },
      {
        fillEmptyIntervalsKeys: false,
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "author": "Edwidge Danticat",
          "count.page_views": 95,
          "interval": "2020-01-01T00:00:00.000Z",
          "name": "Love, Anger, Madness",
        },
        Object {
          "author": "George R. R. Martin",
          "count.page_views": 719,
          "interval": "2020-01-01T00:00:00.000Z",
          "name": "Game of Thrones",
        },
        Object {
          "author": "Edwidge Danticat",
          "count.page_views": 2,
          "interval": "2020-02-01T00:00:00.000Z",
          "name": "Love, Anger, Madness",
        },
        Object {
          "author": "George R. R. Martin",
          "count.page_views": 11,
          "interval": "2020-02-01T00:00:00.000Z",
          "name": "Game of Thrones",
        },
        Object {
          "author": "J.K. Rowling",
          "count.page_views": 1,
          "interval": "2020-02-01T00:00:00.000Z",
          "name": "Harry Potter",
        },
      ],
      "keys": Array [
        "author",
        "name",
      ],
    }
  `);
});
