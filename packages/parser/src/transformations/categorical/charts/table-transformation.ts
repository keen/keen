import { Analysis } from '@keen.io/query';
import { fillWithEmptyKeys } from '../../../utils';

import { GroupByResult } from '../../../types';

/**
 * Categorical transformation dedicated for table chart
 *
 * @param result - categorical results
 * @return transformed results
 *
 */
export const tableChartTransformation = (
  result: GroupByResult[],
  analysisType?: Analysis,
  eventCollection?: string
) => {
  const keys: Set<string> = new Set();

  const formattedResult =
    analysisType && eventCollection
      ? result.map((record) => {
          const { result, ...rest } = record;
          return result
            ? {
                ...rest,
                [`${analysisType}.${eventCollection}`]: result,
              }
            : record;
        })
      : result;

  formattedResult.forEach((record) =>
    Object.keys(record).forEach((keyName) => keys.add(keyName))
  );

  return {
    data: fillWithEmptyKeys([...keys], formattedResult, ''),
    keys: [...keys],
  };
};
