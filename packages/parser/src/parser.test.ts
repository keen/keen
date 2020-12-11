import { parseQuery } from './parser';

import { KEEN_KEY, KEEN_VALUE } from './constants';

import {
  countAnalysis,
  countAnalysisWithInterval,
  countAnalysisDoubleGroupByWithInterval,
  countAnalysisGroupByWithInterval,
  countAnalysisDoubleGroupBy,
  funnelAnalysis,
  selectUnique,
  selectUniqueGroupBy,
  selectUniqueOrderByLimit,
} from './api.fixtures';

test('creates structure for "funnel" analysis', () => {
  const result = parseQuery(funnelAnalysis);

  expect(result).toMatchSnapshot();
});

test('creates structure for select_unique analysis', () => {
  const result = parseQuery(selectUnique);

  expect(result).toMatchSnapshot();
});

test('creates structure for select_unique analysis and group by single property', () => {
  const result = parseQuery(selectUniqueGroupBy);

  expect(result).toMatchSnapshot();
});

test('creates structure for "count" analysis', () => {
  const result = parseQuery(countAnalysis as any);

  expect(result).toEqual({
    keys: [KEEN_VALUE],
    results: [{ [KEEN_KEY]: 'Result', [KEEN_VALUE]: 7436 }],
  });
});

test('creates structure for "count" analysis with interval', () => {
  const result = parseQuery(countAnalysisWithInterval);

  expect(result).toMatchSnapshot();
});

test('creates structure for "count" analysis with interval and group by two properties', () => {
  const result = parseQuery(countAnalysisDoubleGroupByWithInterval);

  expect(result).toMatchSnapshot();
});

test('creates structure for "count" analysis with interval and group by single property', () => {
  const result = parseQuery(countAnalysisGroupByWithInterval);

  expect(result).toMatchSnapshot();
});

test('creates structure for "count" analysis grouped by two properties', () => {
  const result = parseQuery(countAnalysisDoubleGroupBy);

  expect(result).toMatchSnapshot();
});

test('fills intervals empty keys with values', () => {
  const result = parseQuery(selectUniqueOrderByLimit);

  expect(result).toMatchSnapshot();
});
