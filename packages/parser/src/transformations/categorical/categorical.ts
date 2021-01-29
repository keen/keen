import { Query } from '@keen.io/query';

import { defaultTransformation } from './default-transformation';

import { GroupByResult, ParserSettings } from '../../types';

/**
 * Transforms categorical data.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformCategorical = (
  {
    result,
  }: {
    query?: Query;
    result: GroupByResult[];
  },
  parserSettings: ParserSettings
) => defaultTransformation(result, parserSettings);
