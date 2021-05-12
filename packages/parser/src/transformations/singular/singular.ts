import { Query } from '@keen.io/query';

import { ParserSettings } from '../../types';

import {
  DEFAULT_NAME,
  KEEN_KEY,
  KEEN_VALUE,
  KEEN_TABLE_VALUE,
  KEEN_TABLE_ANALYSIS,
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
  }

  return {
    data: [{ [KEEN_KEY]: DEFAULT_NAME, [KEEN_VALUE]: value }],
    keys: [KEEN_VALUE],
  };
};
