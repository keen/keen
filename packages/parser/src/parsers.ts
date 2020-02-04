import { createDateFormatter } from './format-date';

import { AnalysisResult, Query, Value } from './types';

const transformValueArray = (values: Value[]) => {
  const keys: Set<string> = new Set();
  const data: Record<string, any> = {};

  values.forEach(({ result, ...properties }) => {
    Object.values(properties).forEach(name => {
      keys.add(name);
      data[name] = result;
    });
  });

  return {
    data,
    keys,
  };
};

export const parseResults = ({
  query,
  result,
}: {
  query: Query;
  result: AnalysisResult;
}) => {
  const keys: Set<string> = new Set();
  const results: any[] = [];
  let formatLabel = null;

  if (typeof result === 'number') {
    return {
      results: [{ name: 'Result', value: result }],
      keys: ['value'],
      formatLabel: undefined,
    };
  }

  if (Array.isArray(result)) {
    const [{ timeframe }] = result;
    formatLabel = createDateFormatter(query, timeframe);

    result.forEach(({ value, timeframe }) => {
      if (value !== null && Array.isArray(value)) {
        const { data, keys: dataSetKeys } = transformValueArray(value);
        results.push({ name: timeframe.start, ...data });
        dataSetKeys.forEach(key => keys.add(key));
      }
    });
  }

  return {
    keys: [...keys],
    formatLabel,
    results,
  };
};

export const parseQuery = ({
  query,
  result,
}: {
  query: Query;
  result: AnalysisResult;
}) => {
  return parseResults({ query, result });
};
