import { fillWithEmptyKeys } from '../../../utils';

import { GroupByResult } from '../../../types';

/**
 * Categorical transformation dedicated for table chart
 *
 * @param result - categorical results
 * @return transformed results
 *
 */
export const tableChartTransformation = (result: GroupByResult[]) => {
  const keys: Set<string> = new Set();
  result.forEach((record) =>
    Object.keys(record).forEach((keyName) => keys.add(keyName))
  );

  return {
    data: fillWithEmptyKeys([...keys], result, ''),
    keys: [...keys],
  };
};
