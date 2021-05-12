import { Query } from '@keen.io/query';

import { tableChartTransformation } from './charts';
import { defaultTransformation } from './default-transformation';

import { ParserSettings, IntervalResult } from '../../types';

/**
 * Transforms chronological results.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformChronological = (
  {
    query,
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  { dateModifier }: ParserSettings,
  visualization?: string
) => {
  const enableTableFormatter =
    query?.analysis_type &&
    query?.event_collection &&
    visualization === 'table';

  return enableTableFormatter
    ? tableChartTransformation(query, result, dateModifier)
    : defaultTransformation(result, dateModifier);
};
