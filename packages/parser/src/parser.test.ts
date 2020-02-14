import { parseQuery } from './parser';

import {
  countAnalysis,
  countAnalysisWithInterval,
  countAnalysisDoubleGroupByWithInterval,
  countAnalysisGroupByWithInterval,
  countAnalysisDoubleGroupBy,
} from './api.fixtures';

describe('@keen.io/parser - parseQuery()', () => {
  it('should create structure for "count" analysis', () => {
    const result = parseQuery(countAnalysis);

    expect(result).toEqual({
      keys: ['value'],
      results: [{ name: 'Result', value: 7436 }],
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
