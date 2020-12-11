import { extractGroupBySettings } from './extract-group-by';

import { Query, ParserSettings } from './types';

export const createParserSettings = (query?: Query): ParserSettings => {
  let parserSettings: ParserSettings = {
    mergePropertiesOrder: null,
    fillEmptyIntervalsKeys: false,
    interval: null,
  };

  if (query) {
    const { group_by: groupBy, interval, order_by: orderBy, limit } = query;
    if (groupBy) {
      parserSettings = {
        ...parserSettings,
        mergePropertiesOrder: extractGroupBySettings(groupBy),
      };
    }

    if (interval && orderBy && limit) {
      parserSettings = {
        ...parserSettings,
        fillEmptyIntervalsKeys: true,
      };
    }

    if (interval) {
      parserSettings = {
        ...parserSettings,
        interval,
      };
    }
  }

  return parserSettings;
};
