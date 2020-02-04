/* eslint-disable @typescript-eslint/camelcase */

export const simpleFixture = {
  query: {
    analysis_type: 'count',
    event_collection: 'mobile_purchases',
    timeframe: {
      start: '2019-03-20T00:00:00.000-00:00',
      end: '2019-03-26T00:00:00.000-00:00',
    },
    timezone: 3600,
  },
  result: 945,
};

export const fixture = {
  query: {
    analysis_type: 'count',
    event_collection: 'mobile_purchases',
    timeframe: {
      start: '2019-03-20T00:00:00.000-00:00',
      end: '2019-03-26T00:00:00.000-00:00',
    },
    group_by: ['product.name'],
    interval: 'daily',
    timezone: 3600,
  },
  result: [
    {
      value: [
        { 'product.name': 'apps', result: 53 },
        { 'product.name': 'books', result: 47 },
        { 'product.name': 'games', result: 24 },
        { 'product.name': 'sounds', result: 76 },
      ],
      timeframe: {
        start: '2019-03-20T00:00:00.000Z',
        end: '2019-03-21T00:00:00.000Z',
      },
    },
    {
      value: [
        { 'product.name': 'apps', result: 32 },
        { 'product.name': 'books', result: 24 },
        { 'product.name': 'games', result: 56 },
        { 'product.name': 'sounds', result: 32 },
      ],
      timeframe: {
        start: '2019-03-21T00:00:00.000Z',
        end: '2019-03-22T00:00:00.000Z',
      },
    },
    {
      value: [
        { 'product.name': 'apps', result: 27 },
        { 'product.name': 'books', result: 32 },
        { 'product.name': 'games', result: 18 },
        { 'product.name': 'sounds', result: 33 },
      ],
      timeframe: {
        start: '2019-03-22T00:00:00.000Z',
        end: '2019-03-23T00:00:00.000Z',
      },
    },
    {
      value: [
        { 'product.name': 'apps', result: 68 },
        { 'product.name': 'books', result: 56 },
        { 'product.name': 'games', result: 65 },
        { 'product.name': 'sounds', result: 59 },
      ],
      timeframe: {
        start: '2019-03-23T00:00:00.000Z',
        end: '2019-03-24T00:00:00.000Z',
      },
    },
    {
      value: [
        { 'product.name': 'apps', result: 38 },
        { 'product.name': 'books', result: 48 },
        { 'product.name': 'games', result: 50 },
        { 'product.name': 'sounds', result: 26 },
      ],
      timeframe: {
        start: '2019-03-24T00:00:00.000Z',
        end: '2019-03-25T00:00:00.000Z',
      },
    },
    {
      value: [
        { 'product.name': 'apps', result: 34 },
        { 'product.name': 'books', result: 15 },
        { 'product.name': 'games', result: 18 },
        { 'product.name': 'sounds', result: 14 },
      ],
      timeframe: {
        start: '2019-03-25T00:00:00.000Z',
        end: '2019-03-26T00:00:00.000Z',
      },
    },
  ],
};
