import { getPrecisionForInterval } from '@keen.io/charts-utils';
import { Query } from '@keen.io/query';

import { extractGroupBySettings } from './extract-group-by';

import { ParserSettings } from './types';

export const createParserSettings = (query?: Query): ParserSettings => {
  let parserSettings: ParserSettings = {
    mergePropertiesOrder: null,
    fillEmptyIntervalsKeys: false,
    intervalPrecision: null,
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
        intervalPrecision: getPrecisionForInterval(interval),
      };
    }
  }

  return parserSettings;
};
