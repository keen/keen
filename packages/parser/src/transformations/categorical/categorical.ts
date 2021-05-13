import { Query } from '@keen.io/query';
import { Widgets } from '@keen.io/widgets';

import { defaultTransformation } from './default-transformation';
import {
  categoricalChartTransformation,
  choroplethChartTransformation,
  tableChartTransformation,
} from './charts';

import { GroupByResult, ParserSettings } from '../../types';

/**
 * Transforms categorical data.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 * @param parserSettings - parser settings
 * @param visualization - visualisation type
 */
export const transformCategorical = (
  {
    query,
    result,
  }: {
    query?: Query;
    result: GroupByResult[];
  },
  parserSettings: ParserSettings,
  visualization?: Widgets
) => {
  if (visualization === 'bar' || visualization === 'heatmap') {
    return categoricalChartTransformation(result, parserSettings);
  }

  if (visualization === 'table') {
    return tableChartTransformation(
      result,
      query?.analysis_type,
      query?.event_collection
    );
  }

  if (
    visualization === 'choropleth' &&
    Array.isArray(query?.group_by) &&
    query.group_by.length > 1
  ) {
    return choroplethChartTransformation(
      result,
      parserSettings,
      query.group_by
    );
  }

  return defaultTransformation(result, parserSettings);
};
