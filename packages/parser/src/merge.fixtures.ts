/* eslint-disable @typescript-eslint/naming-convention */

export const maximumAnalysisDoubleGroupByWithInterval = {
  query: {
    analysis_type: 'maximum',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    interval: 'monthly',
    group_by: ['author', 'name'],
    timezone: 3600,
  },
  result: [
    {
      value: [
        {
          author: 'Edwidge Danticat',
          result: 95,
          name: 'Love, Anger, Madness',
        },
        { author: 'George R. R. Martin', result: 600, name: 'Game of Thrones' },
        { author: 'J.K. Rowling', result: 120, name: 'Harry Potter' },
        { author: 'Stephen King', result: 1300, name: 'It' },
        { author: 'Stephen King', result: 6, name: 'The Shining' },
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

export const minimumAnalysisDoubleGroupByWithInterval = {
  query: {
    analysis_type: 'minimum',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    interval: 'monthly',
    group_by: ['author', 'name'],
    timezone: 3600,
  },
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
        { author: 'J.K. Rowling', result: 1412, name: 'Harry Potter' },
        { author: 'Stephen King', result: 2059, name: 'It' },
        { author: 'Stephen King', result: 64, name: 'The Shining' },
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
        { author: 'George R. R. Martin', result: 112, name: 'Game of Thrones' },
        { author: 'J.K. Rowling', result: 21, name: 'Harry Potter' },
        { author: 'Stephen King', result: 45, name: 'It' },
        { author: 'Stephen King', result: 30, name: 'The Shining' },
      ],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ],
};
