import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';

import {
  IntervalResult,
  NominalGroupByResult,
  ParserSettings,
} from '../../types';

/**
 * Transforms categorized nominal data in chronological order.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformChronologicalCategoricalNominal = (
  {
    result,
  }: {
    query?: Query;
    result: IntervalResult[];
  },
  { dateModifier }: ParserSettings
) => {
  const data: Record<string, any>[] = [];
  const keys: Set<string> = new Set();

  keys.add(KEEN_VALUE);

  result.map((interval) => {
    const {
      timeframe: { start },
      value,
    } = interval as {
      timeframe: { start: string; end: string };
      value: NominalGroupByResult[];
    };

    const record = {
      [KEEN_KEY]: convertDate(start, dateModifier),
    };

    value.forEach(({ result, ...properties }) => {
      data.push({
        ...record,
        ...properties,
        [KEEN_VALUE]: result,
      });

      Object.keys(properties).forEach((propertyName) => keys.add(propertyName));
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
