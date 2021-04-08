/* eslint-disable @typescript-eslint/naming-convention */

export const analysisConfig = {
  projectId: '5011efa95f546f2ce2000000',
  readKey:
    '33b04e89d04877532b89d14f207fde1972c6f2e8d53462bfabbe2f7bd7614388df87856d509357298a0e1ad8bbd2ad0e90e375a6dcfb2ccb68350580041b2a0f771d643b10ca27bbc775117e7c89b52aa9d324470d3769f95bcb4e16a18fe344',
};

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
