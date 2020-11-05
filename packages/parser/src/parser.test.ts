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
} from './api.fixtures';

describe('@keen.io/parser - parseQuery()', () => {
  it('should create structure for "funnel" analysis', () => {
    const result = parseQuery(funnelAnalysis);

    expect(result).toMatchSnapshot();
  });

  it('should create structure for select_unique analysis', () => {
    const result = parseQuery(selectUnique);

    expect(result).toMatchSnapshot();
  });

  it('should create structure for select_unique analysis and group by single property', () => {
    const result = parseQuery(selectUniqueGroupBy);

    expect(result).toMatchSnapshot();
  });

  it('should create structure for "count" analysis', () => {
    const result = parseQuery(countAnalysis as any);

    expect(result).toEqual({
      keys: [KEEN_VALUE],
      results: [{ [KEEN_KEY]: 'Result', [KEEN_VALUE]: 7436 }],
    });
  });

  it('should create structure for "count" analysis with interval', () => {
    const result = parseQuery(countAnalysisWithInterval);

    expect(result).toMatchSnapshot();
  });

  it('should create structure for "count" analysis with interval and group by two properties', () => {
    const result = parseQuery(countAnalysisDoubleGroupByWithInterval);

    expect(result).toMatchSnapshot();
  });

  it('should create structure for "count" analysis with interval and group by single property', () => {
    const result = parseQuery(countAnalysisGroupByWithInterval);

    expect(result).toMatchSnapshot();
  });

  it('should create structure for "count" analysis grouped by two properties', () => {
    const result = parseQuery(countAnalysisDoubleGroupBy);

    expect(result).toMatchSnapshot();
  });
});
