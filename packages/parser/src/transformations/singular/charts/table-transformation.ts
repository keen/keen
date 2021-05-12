import { Query } from '@keen.io/query';

import { KEEN_TABLE_VALUE, KEEN_TABLE_ANALYSIS } from '../../../constants';

/**
 * Singular transformation dedicated for table chart
 *
 * @param query - query settings
 * @param value - result value
 * @return transformed results
 *
 */

export const tableChartTransformation = (
  query: Pick<Query, 'analysis_type' | 'event_collection'>,
  value: number
) => {
  const { analysis_type, event_collection } = query;
  return {
    data: [
      {
        [KEEN_TABLE_ANALYSIS]: `${analysis_type}.${event_collection}`,
        [KEEN_TABLE_VALUE]: value,
      },
    ],
    keys: [KEEN_TABLE_VALUE],
  };
};
