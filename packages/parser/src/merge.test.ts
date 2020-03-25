import { mergeResults } from './merge';

import { parseMultipleQueries } from './parser';

import {
  minimumAnalysisDoubleGroupByWithInterval,
  maximumAnalysisDoubleGroupByWithInterval,
} from './merge.fixtures';

describe('@keen.io/parser - mergeResults()', () => {
  it('should merge parsed result of two queries', () => {
    const input = [
      minimumAnalysisDoubleGroupByWithInterval,
      maximumAnalysisDoubleGroupByWithInterval,
    ] as any;

    const parsedQueries = parseMultipleQueries(input);
    expect(mergeResults(input, parsedQueries)).toMatchSnapshot();
  });
});
