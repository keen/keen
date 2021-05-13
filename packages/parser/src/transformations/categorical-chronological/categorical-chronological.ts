import { Query } from '@keen.io/query';

import { defaultTransformation } from './default-transformation';
import { tableChartTransformation } from './charts';

import { IntervalResult, ParserSettings } from '../../types';

/**
 * Transforms categorical data with chronological order.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformCategoricalChronological = (
  {
    query,
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  {
    mergePropertiesOrder,
    fillEmptyIntervalsKeys,
    dateModifier,
  }: ParserSettings,
  visualization?: string
) => {
  const enableTableFormatter =
    query?.analysis_type &&
    query?.event_collection &&
    visualization === 'table';

  return enableTableFormatter
    ? tableChartTransformation(
        { query, result },
        { fillEmptyIntervalsKeys, dateModifier }
      )
    : defaultTransformation(result, {
        mergePropertiesOrder,
        fillEmptyIntervalsKeys,
        dateModifier,
      });
};
