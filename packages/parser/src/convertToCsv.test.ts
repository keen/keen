import { convertToCSV } from './convertToCsv';
import { parseQuery } from './parser';
import {
  countAnalysis,
  countAnalysisWithInterval,
  countAnalysisDoubleGroupByWithInterval,
  countAnalysisGroupByWithInterval,
  countAnalysisDoubleGroupBy,
  funnelAnalysis,
  selectUnique,
} from './api.fixtures';

it('should convert query results to csv format', () => {
  [
    countAnalysis,
    countAnalysisWithInterval,
    countAnalysisDoubleGroupByWithInterval,
    countAnalysisGroupByWithInterval,
    countAnalysisDoubleGroupBy,
    funnelAnalysis,
    selectUnique,
  ].forEach(({ result, steps }) => {
    const parsedQuery = parseQuery({ result, steps });
    const { results } = parsedQuery;
    expect(convertToCSV({ data: results })).toMatchSnapshot();
  });
});
