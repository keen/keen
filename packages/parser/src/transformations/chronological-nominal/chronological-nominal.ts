import { Query } from '@keen.io/query';
import { convertDate } from '@keen.io/time-utils';

import { KEEN_KEY, KEEN_VALUE } from '../../constants';

import { IntervalResult, ParserSettings } from '../../types';

/**
 * Transforms nominal data in chronological order.
 *
 * @param parserInput - Parser input properties
 * @return transformed results
 *
 */
export const transformChronologicalNominal = (
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
      value: string[] | number[];
    };
    data.push({
      [KEEN_KEY]: convertDate(start, dateModifier),
      [KEEN_VALUE]: value,
    });
  });

  return {
    data,
    keys: [...keys],
  };
};
