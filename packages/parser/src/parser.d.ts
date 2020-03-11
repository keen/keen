import { AnalysisResult, Step, Query } from './types';
export declare const parseQuery: ({
  result,
  steps,
}: {
  query?: Query;
  steps?: Step[];
  result: AnalysisResult;
}) => {
  keys: string[];
  results: Record<string, any>[];
};
