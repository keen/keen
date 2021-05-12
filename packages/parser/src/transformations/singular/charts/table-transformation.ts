import { Query } from '@keen.io/query';

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
  value: number,
  analysisLabel: string,
  valueLabel: string
) => {
  const { analysis_type, event_collection } = query;
  return {
    data: [
      {
        [analysisLabel]: `${analysis_type}.${event_collection}`,
        [valueLabel]: value,
      },
    ],
    keys: [valueLabel],
  };
};
