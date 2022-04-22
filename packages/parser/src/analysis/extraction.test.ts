import { Query } from '@keen.io/query';

import DataParser from '../DataParser';

const createDataParser = (query: Query) => {
  const {
    mergePropertiesOrder,
    fillEmptyIntervalsKeys,
    transformation,
  } = DataParser.createSettingsFromQuery({ query });

  const dataParser = new DataParser(
    transformation,
    null,
    null,
    fillEmptyIntervalsKeys,
    mergePropertiesOrder
  );

  return dataParser;
};

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

  const { query } = extractionAnalysis;
  const dataParser = createDataParser(query);

  expect(dataParser.parseQueryResults(extractionAnalysis))
    .toMatchInlineSnapshot(`
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

test('creates structure for "extraction" analysis with empty events', () => {
  const extractionAnalysis = {
    query: {
      analysis_type: 'extraction',
      event_collection: 'user_action',
      timeframe: 'last_14_days',
    } as Query,
    result: [{}, {}],
  };

  const { query } = extractionAnalysis;
  const dataParser = createDataParser(query);

  expect(dataParser.parseQueryResults(extractionAnalysis))
    .toMatchInlineSnapshot(`
    Object {
      "data": Array [],
      "keys": Array [],
    }
  `);
});
