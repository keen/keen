import {
  transformIntervalsFromArray,
  transformAtomicResult,
  transformFromNumber,
} from './utils/transform.utils';

import { AnalysisResult, IntervalResult, AtomicResult, Query } from './types';

import { DEFAULT_VALUE_KEY } from './constants';

export const parseQuery = ({
  result,
}: {
  query: Query;
  result: AnalysisResult;
}) => {
  const keys: Set<string> = new Set();
  const results: Record<string, any>[] = [];

  if (typeof result === 'number') {
    return transformFromNumber(result);
  }

  Array.isArray(result) &&
    result.forEach((partialResult: IntervalResult | AtomicResult) => {
      if ('value' in partialResult && 'timeframe' in partialResult) {
        const { value, timeframe } = partialResult as IntervalResult;

        if (Array.isArray(value)) {
          const { data, keys: dataSetKeys } = transformIntervalsFromArray(
            value
          );
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
      }

      if ('result' in partialResult) {
        const { result, ...properties } = transformAtomicResult(partialResult);
        keys.add(DEFAULT_VALUE_KEY);

        Object.values(properties).forEach(property => {
          results.push({ name: property, value: result });
        });
      }
    });

  return {
    keys: [...keys],
    results,
  };
};
