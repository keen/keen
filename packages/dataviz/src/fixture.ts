/* eslint-disable @typescript-eslint/naming-convention */

export const analysisConfig = {
  projectId: '5e429d77c9e77c0001a35cf1',
  readKey:
    '86900A71F1825A2C3F07C639B00B37A57CDCCBB446BBA7D207CF107D466AA0EC9212C08DA6E377995FFBC6E56AD0AB073D74C8B1BB366BD8D9BE802133561CAC55F6E96A845D6939A5DB7D08D2A49C668EAC7AFE4AAEA4BE7BD1572A655DCA8A',
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
