import { Query } from '@keen.io/query';

import { tableChartTransformation } from './charts';
import { ParserSettings } from '../../types';

import {
  DEFAULT_NAME,
  KEEN_KEY,
  KEEN_VALUE,
  KEEN_TABLE_ANALYSIS,
  KEEN_TABLE_VALUE,
} from '../../constants';

/**
 * Transforms singular data.
 *
 * @param parserInput - Parser input properties
 * @return transformed singular results
 *
 */
export const transformSingular = (
  {
    query,
    result,
  }: {
    query?: Query;
    result: number;
  },
  _settings?: ParserSettings,
  visualization?: string
) => {
  const value = result === null ? 0 : result;

  if (
    query?.analysis_type &&
    query?.event_collection &&
    visualization === 'table'
  ) {
    return tableChartTransformation(
      query,
      value,
      KEEN_TABLE_ANALYSIS,
      KEEN_TABLE_VALUE
    );
  }

  return {
    data: [{ [KEEN_KEY]: DEFAULT_NAME, [KEEN_VALUE]: value }],
    keys: [KEEN_VALUE],
  };
};
