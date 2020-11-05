/* eslint-disable @typescript-eslint/naming-convention */
import { IntervalResult, Step } from './types';

export const selectUnique = {
  query: {
    analysis_type: 'select_unique',
    event_collection: 'mmr_change',
    target_property: 'department',
    timezone: 'UTC',
    timeframe: 'this_14_days',
  },
  result: ['Marketing', 'IT', null],
};

export const selectUniqueGroupBy = {
  query: {
    analysis_type: 'select_unique',
    event_collection: 'pageviews',
    target_property: 'user.id',
    group_by: ['user.countryCode'],
    timezone: 'UTC',
    timeframe: 'this_14_days',
  },
  result: [
    {
      'user.countryCode': 'AL',
      result: ['e55a71d6-f5b7-48b0-9c9b-d2d7a944113f'],
    },
    {
      'user.countryCode': 'CD',
      result: [
        '53942361-cf2b-47f1-abfc-c0c665ada812',
        'f70f377a-5a16-470f-924c-6d9afa3f30eb',
      ],
    },
  ],
};

export const funnelAnalysis = {
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
  ] as Step[],
  result: [1128, 317, 89],
};

export const countAnalysis = {
  query: {
    analysis_type: 'count',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2019-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    timezone: 3600,
  },
  result: 7436,
};

export const countAnalysisWithInterval = {
  query: {
    analysis_type: 'count',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2019-11-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    interval: 'monthly',
    timezone: 3600,
  },
  result: [
    {
      value: 436,
      timeframe: {
        start: '2019-11-01T00:00:00.000Z',
        end: '2019-12-01T00:00:00.000Z',
      },
    },
    {
      value: 333,
      timeframe: {
        start: '2019-12-01T00:00:00.000Z',
        end: '2020-01-01T00:00:00.000Z',
      },
    },
    {
      value: 2991,
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-02-01T00:00:00.000Z',
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

export const countAnalysisDoubleGroupByWithInterval = {
  query: {
    analysis_type: 'count',
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
        { author: 'George R. R. Martin', result: 719, name: 'Game of Thrones' },
        { author: 'J.K. Rowling', result: 112, name: 'Harry Potter' },
        { author: 'Stephen King', result: 2059, name: 'It' },
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

export const countAnalysisGroupByWithInterval = {
  query: {
    analysis_type: 'count',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    group_by: ['name'],
    timezone: 3600,
  },
  result: [
    { name: 'Game of Thrones', result: 730 },
    { name: 'Harry Potter', result: 113 },
    { name: 'It', result: 2104 },
    { name: 'Love, Anger, Madness', result: 97 },
    { name: 'The Shining', result: 6 },
  ],
};

export const countAnalysisDoubleGroupBy = {
  query: {
    analysis_type: 'count',
    event_collection: 'book_purchase',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    group_by: ['author', 'name'],
    timezone: 3600,
  },
  result: [
    { result: 97, name: 'Love, Anger, Madness', author: 'Edwidge Danticat' },
    { result: 730, name: 'Game of Thrones', author: 'George R. R. Martin' },
    { result: 113, name: 'Harry Potter', author: 'J.K. Rowling' },
    { result: 2104, name: 'It', author: 'Stephen King' },
    { result: 6, name: 'The Shining', author: 'Stephen King' },
  ],
};

export const intervalResultFixture: IntervalResult = {
  timeframe: {
    start: '20219-01-10T07:26:20.133Z',
    end: '2020-02-13T07:26:20.133Z',
  },
  value: [
    {
      'geo_information.continent': 'Africa',
      result: 1,
    },
    {
      result: 3,
      'geo_information.city': 'Cracow',
    },
    {
      result: 12,
      'geo_information.city': 'Daegu',
    },
  ],
};

export const extractionResultFixture = {
  query: {
    analysis_type: 'extraction',
    event_collection: 'user_action',
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    timezone: 3600,
  },
  result: {
    userData: {
      id: 1,
      firstName: 'John',
      lastName: 'Evans',
      email: 'John@Evans.com',
    },
    geo: {
      province: 'Lesser Poland',
      city: 'Krakow',
      country: 'Poland',
      coordinates: [19.9789, 50.0591],
    },
    tech: {
      device: {
        type: 'desktop',
        family: 'other',
      },
    },
    lastLoginDate: 1576851939,
  },
};
