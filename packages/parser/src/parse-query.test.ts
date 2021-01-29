import { parseQuery } from './parse-query';

const originalError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

test('creates structure for "null" results', () => {
  const query: any = {
    analysis_type: 'count',
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
  const query: any = {
    analysis_type: 'multi-analysis',
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
