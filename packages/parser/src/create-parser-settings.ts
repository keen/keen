import { Query, Step, extractGroupBySettings } from '@keen.io/query';

import { setTransformationType } from './utils';

import { ParserSettings, DateModifier } from './types';

/**
 * Creates parser settings based on query structure
 *
 * @param parserInput - Parser input properties
 * @return parser settings
 *
 */
export const createParserSettings = ({
  query,
  steps,
  dateModifier,
}: {
  dateModifier: DateModifier;
  query?: Query;
  steps?: Step[];
}): ParserSettings => {
  let parserSettings: ParserSettings = {
    mergePropertiesOrder: null,
    fillEmptyIntervalsKeys: false,
    dateModifier: null,
    transformation: setTransformationType(query, steps),
  };

  if (query) {
    const { group_by: groupBy, interval, order_by: orderBy, limit } = query;
    if (groupBy) {
      parserSettings = {
        ...parserSettings,
        mergePropertiesOrder: extractGroupBySettings(groupBy),
      };
    }

    if (interval && groupBy && orderBy && limit) {
      parserSettings = {
        ...parserSettings,
        fillEmptyIntervalsKeys: true,
      };
    }
  }

  if (dateModifier) {
    parserSettings = {
      ...parserSettings,
      dateModifier,
    };
  }

  return parserSettings;
};
