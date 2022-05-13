import { Analysis, Query } from '@keen.io/query';
import { parseQuery } from './parse-query';

const originalError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

test('creates structure for "null" results', () => {
  const query: Query = {
    analysis_type: 'count',
    timeframe: '',
    event_collection: '',
  };

  const result = null;

  expect(parseQuery({ query, result })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "Result",
          "keen.value": 0,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('returns empty results for non-classified data', () => {
  const query: Query = {
    analysis_type: 'multi-analysis' as Analysis,
    timeframe: '',
    event_collection: '',
  };

  expect(parseQuery({ query, result: [] })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "Result",
          "keen.value": Array [],
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
