import { createDateFormatter } from './format-date';
import { transformFromArray, transformFromNumber } from './transform.utils';

import { AnalysisResult, Query } from './types';

import { DEFAULT_VALUE_KEY } from './constants';

type Results = { name: string } & Record<string, string | number>;

export const parseQuery = ({
  query,
  result,
}: {
  query: Query;
  result: AnalysisResult;
}) => {
  const keys: Set<string> = new Set();
  const results: Results[] = [];
  let formatLabel = null;

  if (typeof result === 'number') {
    return transformFromNumber(result);
  }

  if (Array.isArray(result)) {
    const [{ timeframe }] = result;
    formatLabel = createDateFormatter(query, timeframe);

    result.forEach(({ value, timeframe }) => {
      if (Array.isArray(value)) {
        const { data, keys: dataSetKeys } = transformFromArray(value);
        results.push({ name: timeframe.start, ...data });
        dataSetKeys.forEach(key => keys.add(key));
      }

      if (typeof value === 'number') {
        keys.add(DEFAULT_VALUE_KEY);
        results.push({
          name: timeframe.start,
          [DEFAULT_VALUE_KEY]: value,
        });
      }
    });
  }

  return {
    keys: [...keys],
    formatLabel,
    results,
  };
};
