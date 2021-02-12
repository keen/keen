import { Query } from '@keen.io/query';
import { Widgets } from '@keen.io/widgets';

import { defaultTransformation } from './default-transformation';

import { GroupByResult, ParserSettings } from '../../types';
import { barTransformation } from './charts/bar-transformation';

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
    result,
  }: {
    query?: Query;
    result: GroupByResult[];
  },
  parserSettings: ParserSettings,
  visualization?: Widgets
) => {
  if (visualization === 'bar') {
    return barTransformation(result, parserSettings);
  }
  return defaultTransformation(result, parserSettings);
};
